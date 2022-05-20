package hr.unizg.fer.infsus.skriptarnica.repository;

import hr.unizg.fer.infsus.skriptarnica.model.StavkaNarudzba;
import hr.unizg.fer.infsus.skriptarnica.model.StavkaNarudzbaId;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StavkaNarudzbaRepository extends CrudRepository<StavkaNarudzba, StavkaNarudzbaId> {
    List<StavkaNarudzba> findAllByNarudzbaid(Long NarudzbaId);

    long deleteStavkaNarudzbaByNarudzbaidAndRbrstavka(Long narudzbaid, Long rbrstavka);
}
