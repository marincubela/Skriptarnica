package hr.unizg.fer.infsus.skriptarnica.service;

import hr.unizg.fer.infsus.skriptarnica.model.Narudzba;

import java.util.List;

public interface INarudzbaService {

    List<Narudzba> findAll();

    Narudzba find(Long Id);

    Narudzba save(Narudzba narudzba);

    Narudzba update(Long Id, Narudzba narudzba);

    void deleteById(Long Id);
}
