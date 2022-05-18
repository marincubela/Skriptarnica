package hr.unizg.fer.infsus.skriptarnica.controller;

import hr.unizg.fer.infsus.skriptarnica.model.Ponuda;
import hr.unizg.fer.infsus.skriptarnica.model.Usluga;
import hr.unizg.fer.infsus.skriptarnica.service.IUslugaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usluga")
@CrossOrigin(origins = "http://localhost:3000")
public class UslugaController {
    @Autowired
    private IUslugaService uslugaService;

    @GetMapping("/all")
    public List<Usluga> findAllUsluga() {
        return uslugaService.findAll();
    }

    @PostMapping("/")
    Usluga newUsluga(@RequestBody Usluga newUsluga) {
        return uslugaService.save(newUsluga);
    }

    @GetMapping("/{Id}")
    public ResponseEntity<Ponuda> read(@PathVariable String Id) {
        Usluga foundUsluga = uslugaService.find(Long.parseLong(Id));
        if (foundUsluga == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(foundUsluga);
        }
    }

    @PutMapping("/{Id}")
    public ResponseEntity<Usluga> update(@RequestBody Usluga usluga, @PathVariable Long Id) {
        Usluga updatedUsluga = uslugaService.find(Id);
        if (updatedUsluga == null) {
            return ResponseEntity.notFound().build();
        } else {
            usluga.setPonudaid(Id);
            var n = uslugaService.save(usluga);
            return ResponseEntity.ok(n);
        }
    }

    @DeleteMapping("/{Id}")
    void deleteUsluga(@PathVariable Long Id) {
        uslugaService.deleteById(Id);
    }
}
