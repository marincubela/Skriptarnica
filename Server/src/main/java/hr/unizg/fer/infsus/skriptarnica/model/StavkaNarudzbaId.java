package hr.unizg.fer.infsus.skriptarnica.model;

import java.io.Serializable;
import java.util.Objects;

public class StavkaNarudzbaId implements Serializable {
    private Long narudzbaid;
    private Long rbrstavka;

    public StavkaNarudzbaId() {
    }

    public StavkaNarudzbaId(Long narudzbaid, Long rbrstavka) {
        this.narudzbaid = narudzbaid;
        this.rbrstavka = rbrstavka;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StavkaNarudzbaId that = (StavkaNarudzbaId) o;
        return narudzbaid.equals(that.narudzbaid) && rbrstavka.equals(that.rbrstavka);
    }

    @Override
    public int hashCode() {
        return Objects.hash(narudzbaid, rbrstavka);
    }
}
