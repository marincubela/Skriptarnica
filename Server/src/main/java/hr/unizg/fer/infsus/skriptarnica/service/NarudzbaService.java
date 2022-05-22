package hr.unizg.fer.infsus.skriptarnica.service;

import hr.unizg.fer.infsus.skriptarnica.model.Narudzba;
import hr.unizg.fer.infsus.skriptarnica.repository.NarudzbaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NarudzbaService implements INarudzbaService {

    @Autowired
    private NarudzbaRepository repository;

    @Override
    public List<Narudzba> findAll() {
        return (List<Narudzba>) repository.findAll();
    }

    @Override
    public Narudzba find(Long Id) {
        return repository.findById(Id).orElse(null);
    }

    @Override
    public Narudzba save(Narudzba narudzba) {
        return repository.save(narudzba);
    }

    @Override
    public Narudzba update(Long Id, Narudzba narudzba) {
        return repository.save(narudzba);
    }

    @Override
    public void deleteById(Long Id) {
        repository.deleteById(Id);
    }
}
