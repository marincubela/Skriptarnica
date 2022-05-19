package hr.unizg.fer.infsus.skriptarnica.service;

import hr.unizg.fer.infsus.skriptarnica.model.Proizvod;
import hr.unizg.fer.infsus.skriptarnica.repository.ProizvodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class ProizvodService implements IProizvodService {

    @Autowired
    private ProizvodRepository repository;

    @Override
    public List<Proizvod> findAll() {
        return (List<Proizvod>) repository.findAll();
    }

    @Override
    public Proizvod find(Long Id) {
        return repository.findById(Id).orElse(null);
    }

    @Override
    public List<Proizvod> findProizvodsByPonudaidIn(Collection<Long> ponudaids) {
        return (List<Proizvod>) repository.findProizvodsByPonudaidIn(ponudaids);
    }

    @Override
    public Proizvod save(Proizvod proizvod) {
        return repository.save(proizvod);
    }

    @Override
    public Proizvod update(Long Id, Proizvod proizvod) {
        return repository.save(proizvod);
    }

    @Override
    public void deleteById(Long Id) {
        repository.deleteById(Id);
    }
}
