package hr.unizg.fer.infsus.skriptarnica.service;

import hr.unizg.fer.infsus.skriptarnica.model.Usluga;
import hr.unizg.fer.infsus.skriptarnica.repository.UslugaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class UslugaService implements IUslugaService {

    @Autowired
    private UslugaRepository repository;

    @Override
    public List<Usluga> findAll() {
        return (List<Usluga>) repository.findAll();
    }

    @Override
    public Usluga find(Long Id) {
        return repository.findById(Id).orElse(null);
    }

    @Override
    public List<Usluga> findUslugasByPonudaidIn(Collection<Long> ponudaids) {
        return (List<Usluga>) repository.findUslugasByPonudaidIn(ponudaids);
    }

    @Override
    public Usluga save(Usluga usluga) {
        return repository.save(usluga);
    }

    @Override
    public Usluga update(Long Id, Usluga usluga) {
        return repository.save(usluga);
    }

    @Override
    public void deleteById(Long Id) {
        repository.deleteById(Id);
    }
}
