package hr.unizg.fer.infsus.skriptarnica.repository;

import hr.unizg.fer.infsus.skriptarnica.model.Proizvod;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface ProizvodRepository extends CrudRepository<Proizvod, Long> {
    Iterable<Proizvod> findProizvodsByPonudaidIn(Collection<Long> ponudaid);
}
