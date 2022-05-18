package hr.unizg.fer.infsus.skriptarnica.controller;

import hr.unizg.fer.infsus.skriptarnica.model.Narudzba;
import hr.unizg.fer.infsus.skriptarnica.service.INarudzbaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/narudzba")
@CrossOrigin(origins = "http://localhost:3000")
public class NarudzbaController {
    @Autowired
    private INarudzbaService narudzbaService;

    @GetMapping("/all")
    public List<Narudzba> findNarudzbas() {
        return narudzbaService.findAll();
    }

    @PostMapping("/")
    Narudzba newNarudzba(@RequestBody Narudzba newNarudzba) {
        return narudzbaService.save(newNarudzba);
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

    @DeleteMapping("/{Id}")
    void deleteNarudzba(@PathVariable Long Id) {
        narudzbaService.deleteById(Id);
    }
}
