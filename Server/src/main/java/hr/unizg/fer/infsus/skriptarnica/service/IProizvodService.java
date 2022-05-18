package hr.unizg.fer.infsus.skriptarnica.service;

import hr.unizg.fer.infsus.skriptarnica.model.Proizvod;

import java.util.List;

public interface IProizvodService {

    List<Proizvod> findAll();

    Proizvod find(Long Id);

    Proizvod save(Proizvod djelatnik);

    Proizvod update(Long Id, Proizvod djelatnik);

    void deleteById(Long Id);
}
