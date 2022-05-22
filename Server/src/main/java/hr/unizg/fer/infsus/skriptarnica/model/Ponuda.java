package hr.unizg.fer.infsus.skriptarnica.model;


import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "ponuda")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Ponuda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ponudaid;

    private String naziv;
    private double jedcijena;

    public Long getPonudaid() {
        return ponudaid;
    }

    public void setPonudaid(Long ponudaid) {
        this.ponudaid = ponudaid;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public double getJedcijena() {
        return jedcijena;
    }

    public void setJedcijena(double jedcijena) {
        this.jedcijena = jedcijena;
    }

    @Override
    public String toString() {
        return "Ponuda{" +
                "ponudaid=" + ponudaid +
                ", naziv='" + naziv + '\'' +
                ", jedcijena=" + jedcijena +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Ponuda ponuda = (Ponuda) o;
        return ponudaid.equals(ponuda.ponudaid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ponudaid);
    }
}
