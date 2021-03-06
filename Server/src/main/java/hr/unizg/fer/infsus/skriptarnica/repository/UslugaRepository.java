package hr.unizg.fer.infsus.skriptarnica.repository;

import hr.unizg.fer.infsus.skriptarnica.model.Usluga;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface UslugaRepository extends CrudRepository<Usluga, Long> {
    Iterable<Usluga> findUslugasByPonudaidIn(Collection<Long> ponudaid);
}
