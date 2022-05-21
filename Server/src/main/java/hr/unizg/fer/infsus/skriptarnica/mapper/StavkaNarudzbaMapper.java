package hr.unizg.fer.infsus.skriptarnica.mapper;

import hr.unizg.fer.infsus.skriptarnica.dto.StavkaNarudzbaDto;
import hr.unizg.fer.infsus.skriptarnica.model.Proizvod;
import hr.unizg.fer.infsus.skriptarnica.model.StavkaNarudzba;
import hr.unizg.fer.infsus.skriptarnica.model.Usluga;

public class StavkaNarudzbaMapper {
    public StavkaNarudzbaDto mapEntitiesToDto(StavkaNarudzba stavkaNarudzba, Proizvod proizvod, Usluga usluga) {
        StavkaNarudzbaDto stavkaNarudzbaDto = new StavkaNarudzbaDto();
        stavkaNarudzbaDto.setNarudzbaid(stavkaNarudzba.getNarudzbaid());
        stavkaNarudzbaDto.setRbrstavka(stavkaNarudzba.getRbrstavka());
        stavkaNarudzbaDto.setPonudaid(stavkaNarudzba.getPonudaid());
        stavkaNarudzbaDto.setJedcijena(stavkaNarudzba.getJedcijena());
        stavkaNarudzbaDto.setKolicina(stavkaNarudzba.getKolicina());
        stavkaNarudzbaDto.setProizvod(proizvod);
        stavkaNarudzbaDto.setUsluga(usluga);

        return stavkaNarudzbaDto;
    }
}
