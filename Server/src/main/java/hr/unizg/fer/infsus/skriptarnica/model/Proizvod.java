package hr.unizg.fer.infsus.skriptarnica.model;

import javax.persistence.*;

@Entity
@Table(name = "proizvod")
public class Proizvod extends Ponuda{
    private int kolicinadostupno;
    private int kolicinakriticno;
    private String kategorija;

    public int getKolicinadostupno() {
        return kolicinadostupno;
    }

    public void setKolicinadostupno(int kolicinadostupno) {
        this.kolicinadostupno = kolicinadostupno;
    }

    public int getKolicinakriticno() {
        return kolicinakriticno;
    }

    public void setKolicinakriticno(int kolicinakriticno) {
        this.kolicinakriticno = kolicinakriticno;
    }

    public String getKategorija() {
        return kategorija;
    }

    public void setKategorija(String kategorija) {
        this.kategorija = kategorija;
    }

    @Override
    public String toString() {
        return super.toString() + " + Proizvod" +
                "kolicinadostupno=" + kolicinadostupno +
                ", kolicinakriticno=" + kolicinakriticno +
                ", kategorija='" + kategorija + '\'' +
                '}';
    }
}
