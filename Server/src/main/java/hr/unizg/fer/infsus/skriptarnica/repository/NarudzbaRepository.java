package hr.unizg.fer.infsus.skriptarnica.repository;

import hr.unizg.fer.infsus.skriptarnica.model.Narudzba;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NarudzbaRepository extends CrudRepository<Narudzba, Long> {
}
