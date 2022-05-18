package hr.unizg.fer.infsus.skriptarnica.controller;

import hr.unizg.fer.infsus.skriptarnica.model.Ponuda;
import hr.unizg.fer.infsus.skriptarnica.model.Proizvod;
import hr.unizg.fer.infsus.skriptarnica.service.IProizvodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/proizvod")
@CrossOrigin(origins = "http://localhost:3000")
public class ProizvodController {
    @Autowired
    private IProizvodService proizvodService;

    @GetMapping("/all")
    public List<Proizvod> findAllProizvod() {
        return proizvodService.findAll();
    }

    @PostMapping("/")
    Proizvod newProizvod(@RequestBody Proizvod newProizvod) {
        return proizvodService.save(newProizvod);
    }

    @GetMapping("/{Id}")
    public ResponseEntity<Ponuda> read(@PathVariable String Id) {
        Proizvod foundProizvod = proizvodService.find(Long.parseLong(Id));
        if (foundProizvod == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(foundProizvod);
        }
    }

    @PutMapping("/{Id}")
    public ResponseEntity<Proizvod> update(@RequestBody Proizvod proizvod, @PathVariable Long Id) {
        Proizvod updatedProizvod = proizvodService.find(Id);
        if (updatedProizvod == null) {
            return ResponseEntity.notFound().build();
        } else {
            proizvod.setPonudaid(Id);
            var n = proizvodService.save(proizvod);
            return ResponseEntity.ok(n);
        }
    }

    @DeleteMapping("/{Id}")
    void deleteProizvod(@PathVariable Long Id) {
        proizvodService.deleteById(Id);
    }
}
