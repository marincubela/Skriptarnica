package hr.unizg.fer.infsus.skriptarnica.service;

import hr.unizg.fer.infsus.skriptarnica.model.Usluga;

import java.util.Collection;
import java.util.List;

public interface IUslugaService {

    List<Usluga> findAll();

    Usluga find(Long Id);

    List<Usluga> findUslugasByPonudaidIn(Collection<Long> ponudaids);

    Usluga save(Usluga djelatnik);

    Usluga update(Long Id, Usluga djelatnik);

    void deleteById(Long Id);
}
