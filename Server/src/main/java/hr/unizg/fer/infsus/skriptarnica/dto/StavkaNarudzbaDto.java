package hr.unizg.fer.infsus.skriptarnica.dto;

import hr.unizg.fer.infsus.skriptarnica.model.Proizvod;
import hr.unizg.fer.infsus.skriptarnica.model.Usluga;

public class StavkaNarudzbaDto {

    private Long narudzbaid;
    private Long rbrstavka;
    private Long ponudaid;
    private int kolicina;
    private double jedcijena;
    private Proizvod proizvod;
    private Usluga usluga;

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

    public Proizvod getProizvod() {
        return proizvod;
    }

    public void setProizvod(Proizvod proizvod) {
        this.proizvod = proizvod;
    }

    public Usluga getUsluga() {
        return usluga;
    }

    public void setUsluga(Usluga usluga) {
        this.usluga = usluga;
    }
}
