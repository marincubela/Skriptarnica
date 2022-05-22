package hr.unizg.fer.infsus.skriptarnica.controller;

import hr.unizg.fer.infsus.skriptarnica.model.Djelatnik;
import hr.unizg.fer.infsus.skriptarnica.service.IDjelatnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/djelatnik")
@CrossOrigin(origins = "http://localhost:3000")
public class DjelatnikController {
    @Autowired
    private IDjelatnikService djelatnikService;

    @GetMapping("/all")
    public List<Djelatnik> findAllDjelatnik() {
        return djelatnikService.findAll();
    }

    @PostMapping("/")
    Djelatnik newDjelatnik(@RequestBody Djelatnik newDjelatnik) {
        return djelatnikService.save(newDjelatnik);
    }

    @GetMapping("/{Id}")
    public ResponseEntity<Djelatnik> read(@PathVariable String Id) {
        Djelatnik foundDjelatnik = djelatnikService.find(Long.parseLong(Id));
        if (foundDjelatnik == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(foundDjelatnik);
        }
    }

    @PutMapping("/{Id}")
    public ResponseEntity<Djelatnik> update(@RequestBody Djelatnik djelatnik, @PathVariable Long Id) {
        Djelatnik updatedDjelatnik = djelatnikService.find(Id);
        if (updatedDjelatnik == null) {
            return ResponseEntity.notFound().build();
        } else {
            djelatnik.setOsobaid(Id);
            var n = djelatnikService.save(djelatnik);
            return ResponseEntity.ok(n);
        }
    }

    @DeleteMapping("/{Id}")
    void deleteDjelatnik(@PathVariable Long Id) {
        djelatnikService.deleteById(Id);
    }
}
