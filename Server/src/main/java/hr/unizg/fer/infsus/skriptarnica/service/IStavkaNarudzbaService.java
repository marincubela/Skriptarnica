package hr.unizg.fer.infsus.skriptarnica.service;

import hr.unizg.fer.infsus.skriptarnica.model.StavkaNarudzba;
import hr.unizg.fer.infsus.skriptarnica.model.StavkaNarudzbaId;

import java.util.List;

public interface IStavkaNarudzbaService {

    List<StavkaNarudzba> findAll();

    StavkaNarudzba find(StavkaNarudzbaId Id);

    List<StavkaNarudzba> findByNarudzbaId(Long NarudzbaId);

    StavkaNarudzba save(StavkaNarudzba narudzba);

    StavkaNarudzba update(StavkaNarudzbaId Id, StavkaNarudzba narudzba);

    void deleteById(StavkaNarudzbaId Id);
}
