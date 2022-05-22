package hr.unizg.fer.infsus.skriptarnica.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "stavkanarudzba")
@IdClass(StavkaNarudzbaId.class)
public class StavkaNarudzba {
    @Id
    private Long narudzbaid;

    @Id
    private Long rbrstavka;

    private Long ponudaid;
    private int kolicina;
    private double jedcijena;

    public Long getNarudzbaid() {
        return narudzbaid;
    }

    public void setNarudzbaid(Long narudzbaid) {
        this.narudzbaid = narudzbaid;
    }

    public Long getRbrstavka() {
        return rbrstavka;
    }

    public void setRbrstavka(Long rbrstavka) {
        this.rbrstavka = rbrstavka;
    }

    public Long getPonudaid() {
        return ponudaid;
    }

    public void setPonudaid(Long ponudaid) {
        this.ponudaid = ponudaid;
    }

    public int getKolicina() {
        return kolicina;
    }

    public void setKolicina(int kolicina) {
        this.kolicina = kolicina;
    }

    public double getJedcijena() {
        return jedcijena;
    }

    public void setJedcijena(double jedcijena) {
        this.jedcijena = jedcijena;
    }

    @Override
    public String toString() {
        return "StavkaNarudzba{" +
                "narudzbaid=" + narudzbaid +
                ", rbrstavka=" + rbrstavka +
                ", ponudaid=" + ponudaid +
                ", kolicina=" + kolicina +
                ", jedcijena=" + jedcijena +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StavkaNarudzba that = (StavkaNarudzba) o;
        return narudzbaid.equals(that.narudzbaid) && rbrstavka.equals(that.rbrstavka);
    }

    @Override
    public int hashCode() {
        return Objects.hash(narudzbaid, rbrstavka);
    }
}
