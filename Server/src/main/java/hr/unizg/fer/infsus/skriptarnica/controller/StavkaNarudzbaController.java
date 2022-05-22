package hr.unizg.fer.infsus.skriptarnica.controller;

import hr.unizg.fer.infsus.skriptarnica.mapper.StavkaNarudzbaMapper;
import hr.unizg.fer.infsus.skriptarnica.model.StavkaNarudzba;
import hr.unizg.fer.infsus.skriptarnica.model.StavkaNarudzbaId;
import hr.unizg.fer.infsus.skriptarnica.dto.StavkaNarudzbaDto;
import hr.unizg.fer.infsus.skriptarnica.service.IProizvodService;
import hr.unizg.fer.infsus.skriptarnica.service.IStavkaNarudzbaService;
import hr.unizg.fer.infsus.skriptarnica.service.IUslugaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
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

    private StavkaNarudzbaMapper stavkaNarudzbaMapper = new StavkaNarudzbaMapper();

    @GetMapping("/{NarudzbaId}")
    public List<StavkaNarudzbaDto> findAllByNarudzbaId(@PathVariable String NarudzbaId) {
        List<StavkaNarudzbaDto> result = new ArrayList<>();

        var stavke = stavkaNarudzbaService.findByNarudzbaId(Long.parseLong(NarudzbaId));

        for (var stavka : stavke) {
            var proizvod = proizvodService.find(stavka.getPonudaid());
            var usluga = uslugaService.find(stavka.getPonudaid());
            result.add(stavkaNarudzbaMapper.mapEntitiesToDto(stavka, proizvod, usluga));
        }

        return result;
    }

    @GetMapping("/all")
    public List<StavkaNarudzba> findAllStavkaNarudzba() {
        return stavkaNarudzbaService.findAll();
    }

    @PostMapping("/add")
    StavkaNarudzba addStavka(@RequestBody StavkaNarudzba newStavkaNarudzba) {
        System.out.println("STAVKA");
        System.out.println(newStavkaNarudzba);
        return stavkaNarudzbaService.save(newStavkaNarudzba);
    }

    @PutMapping("/")
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

    @DeleteMapping("/")
    @Transactional
    public long deleteProizvod(@RequestBody StavkaNarudzbaId Id) {
        return stavkaNarudzbaService.deleteStavkaNarudzbaByNarudzbaidAndRbrstavka(Id.getNarudzbaid(), Id.getRbrstavka());
    }
}
