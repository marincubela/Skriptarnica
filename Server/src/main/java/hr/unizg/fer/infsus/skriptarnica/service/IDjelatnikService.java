package hr.unizg.fer.infsus.skriptarnica.service;

import hr.unizg.fer.infsus.skriptarnica.model.Djelatnik;

import java.util.List;

public interface IDjelatnikService {

    List<Djelatnik> findAll();

    Djelatnik find(Long Id);

    Djelatnik save(Djelatnik djelatnik);

    Djelatnik update(Long Id, Djelatnik djelatnik);

    void deleteById(Long Id);
}
