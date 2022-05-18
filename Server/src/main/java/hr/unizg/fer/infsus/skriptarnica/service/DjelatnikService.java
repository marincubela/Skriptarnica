package hr.unizg.fer.infsus.skriptarnica.service;

import hr.unizg.fer.infsus.skriptarnica.model.Djelatnik;
import hr.unizg.fer.infsus.skriptarnica.repository.DjelatnikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DjelatnikService implements IDjelatnikService {

    @Autowired
    private DjelatnikRepository repository;

    @Override
    public List<Djelatnik> findAll() {
        return (List<Djelatnik>) repository.findAll();
    }

    @Override
    public Djelatnik find(Long Id) {
        return repository.findById(Id).orElse(null);
    }

    @Override
    public Djelatnik save(Djelatnik djelatnik) {
        return repository.save(djelatnik);
    }

    @Override
    public Djelatnik update(Long Id, Djelatnik djelatnik) {
        return repository.save(djelatnik);
    }

    @Override
    public void deleteById(Long Id) {
        repository.deleteById(Id);
    }
}
