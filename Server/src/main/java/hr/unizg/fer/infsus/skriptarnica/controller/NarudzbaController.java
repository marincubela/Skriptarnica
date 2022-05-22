package hr.unizg.fer.infsus.skriptarnica.controller;

import hr.unizg.fer.infsus.skriptarnica.dto.NewNarudzbaDto;
import hr.unizg.fer.infsus.skriptarnica.dto.UpdateIdOsobaDto;
import hr.unizg.fer.infsus.skriptarnica.model.Narudzba;
import hr.unizg.fer.infsus.skriptarnica.model.StavkaNarudzba;
import hr.unizg.fer.infsus.skriptarnica.service.INarudzbaService;
import hr.unizg.fer.infsus.skriptarnica.service.IStavkaNarudzbaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.IntStream;

@RestController
@RequestMapping("/narudzba")
@CrossOrigin(origins = "http://localhost:3000")
public class NarudzbaController {
    @Autowired
    private INarudzbaService narudzbaService;

    @Autowired
    private IStavkaNarudzbaService stavkaNarudzbaService;

    @GetMapping("/all")
    public List<Narudzba> findAllNarudzba() {
        return narudzbaService.findAll();
    }

    @PostMapping("/add")
    Narudzba newNarudzba(@RequestBody NewNarudzbaDto newNarudzbaDto) {
        try {
            Narudzba newNarudzba = narudzbaService.save(newNarudzbaDto.toNarudzba());

            long narudzbaId = newNarudzba.getNarudzbaid();
            List<StavkaNarudzba> stavkaNarudzbas = newNarudzbaDto.getStavkaNarudzbas();

            IntStream.range(0, stavkaNarudzbas.size())
                            .forEach(index -> {
                                StavkaNarudzba stavkaNarudzba = stavkaNarudzbas.get(index);
                                stavkaNarudzba.setNarudzbaid(narudzbaId);
                                stavkaNarudzba.setRbrstavka((long) (index + 1));
                                stavkaNarudzbaService.save(stavkaNarudzba);
                            });

            return newNarudzba;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @GetMapping("/{Id}")
    public ResponseEntity<Narudzba> read(@PathVariable String Id) {
        Narudzba foundNarudzba = narudzbaService.find(Long.parseLong(Id));
        if (foundNarudzba == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(foundNarudzba);
        }
    }

    @PutMapping("/{Id}")
    public ResponseEntity<Narudzba> update(@RequestBody Narudzba narudzba, @PathVariable Long Id) {
        Narudzba updatedNarudzba = narudzbaService.find(Id);
        if (updatedNarudzba == null) {
            return ResponseEntity.notFound().build();
        } else {
            narudzba.setNarudzbaid(Id);
            var n = narudzbaService.save(narudzba);
            return ResponseEntity.ok(n);
        }
    }

    @PutMapping("/update-osoba/{Id}")
    public ResponseEntity<Narudzba> updateWorker(@RequestBody UpdateIdOsobaDto updateIdOsobaDto, @PathVariable Long Id) {
        Narudzba updatedNarudzba = narudzbaService.find(Id);
        if (updatedNarudzba == null) {
            return ResponseEntity.notFound().build();
        } else {
            updatedNarudzba.setOsobaid(updateIdOsobaDto.getNoviIdOsoba());
            var n = narudzbaService.save(updatedNarudzba);
            return ResponseEntity.ok(n);
        }
    }


    @DeleteMapping("/{Id}")
    void deleteNarudzba(@PathVariable Long Id) {
        narudzbaService.deleteById(Id);
    }
}

