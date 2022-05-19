package hr.unizg.fer.infsus.skriptarnica.controller;

import hr.unizg.fer.infsus.skriptarnica.model.Ponuda;
import hr.unizg.fer.infsus.skriptarnica.model.StavkaNarudzba;
import hr.unizg.fer.infsus.skriptarnica.model.StavkaNarudzbaId;
import hr.unizg.fer.infsus.skriptarnica.model.dto.StavkaN;
import hr.unizg.fer.infsus.skriptarnica.service.IProizvodService;
import hr.unizg.fer.infsus.skriptarnica.service.IStavkaNarudzbaService;
import hr.unizg.fer.infsus.skriptarnica.service.IUslugaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/stavka_narudzba")
@CrossOrigin(origins = "http://localhost:3000")
public class StavkaNarudzbaController {
    @Autowired
    private IStavkaNarudzbaService stavkaNarudzbaService;

    @Autowired
    private IProizvodService proizvodService;

    @Autowired
    private IUslugaService uslugaService;

    @GetMapping("/{NarudzbaId}")
    public List<StavkaN> findAllByNarudzbaId(@PathVariable String NarudzbaId) {
        List<StavkaN> result = new ArrayList<>();

        var narudzbe = stavkaNarudzbaService.findByNarudzbaId(Long.parseLong(NarudzbaId));

        for (var nar : narudzbe) {
            StavkaN stavka = new StavkaN();
            stavka.setNarudzbaid(nar.getNarudzbaid());
            stavka.setRbrstavka(nar.getRbrstavka());
            stavka.setPonudaid(nar.getPonudaid());
            stavka.setJedcijena(nar.getJedcijena());
            stavka.setKolicina(nar.getKolicina());

            var proizvod = proizvodService.find(stavka.getPonudaid());
            var usluga = uslugaService.find(stavka.getPonudaid());

            stavka.setProizvod(proizvod);
            stavka.setUsluga(usluga);

            result.add(stavka);
        }

        return result;
    }

    @GetMapping("/all")
    public List<StavkaNarudzba> findAllStavkaNarudzba() {
        return stavkaNarudzbaService.findAll();
    }

    @PostMapping("/addStavka")
    StavkaNarudzba addStavka(@RequestBody StavkaNarudzba newStavkaNarudzba) {
        return stavkaNarudzbaService.save(newStavkaNarudzba);
    }

    @PutMapping("/updateStavkas")
    public List<StavkaNarudzba> update(@RequestBody List<StavkaNarudzba> list) {
        List<StavkaNarudzba> result = new ArrayList<>();

        for (StavkaNarudzba sn : list) {
            StavkaNarudzba updatedStavkaNarudzba = stavkaNarudzbaService.find(new StavkaNarudzbaId(sn.getNarudzbaid(), sn.getRbrstavka()));
            if (updatedStavkaNarudzba != null) {
                var n = stavkaNarudzbaService.save(sn);
                result.add(n);
            }
        }

        return result;
    }

    @DeleteMapping("/deleteStavka")
    public void deleteProizvod(@RequestBody StavkaNarudzbaId Id) {
        stavkaNarudzbaService.deleteById(Id);
    }
}
