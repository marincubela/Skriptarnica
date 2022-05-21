package hr.unizg.fer.infsus.skriptarnica.service;

import hr.unizg.fer.infsus.skriptarnica.model.StavkaNarudzba;
import hr.unizg.fer.infsus.skriptarnica.model.StavkaNarudzbaId;
import hr.unizg.fer.infsus.skriptarnica.repository.StavkaNarudzbaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StavkaNarudzbaService implements IStavkaNarudzbaService {

    @Autowired
    private StavkaNarudzbaRepository repository;

    @Override
    public List<StavkaNarudzba> findAll() {
        return (List<StavkaNarudzba>) repository.findAll();
    }

    @Override
    public StavkaNarudzba find(StavkaNarudzbaId Id) {
        return repository.findById(Id).orElse(null);
    }

    @Override
    public List<StavkaNarudzba> findByNarudzbaId(Long NarudzbaId) {
        return repository.findAllByNarudzbaid(NarudzbaId);
    }

    @Override
    public StavkaNarudzba save(StavkaNarudzba stavkaNarudzba) {
        return repository.save(stavkaNarudzba);
    }

    @Override
    public StavkaNarudzba update(StavkaNarudzbaId Id, StavkaNarudzba stavkaNarudzba) {
        return repository.save(stavkaNarudzba);
    }

    @Override
    public long deleteStavkaNarudzbaByNarudzbaidAndRbrstavka(Long narudzbaid, Long rbrstavka) {
        return repository.deleteStavkaNarudzbaByNarudzbaidAndRbrstavka(narudzbaid, rbrstavka);
    }
}
