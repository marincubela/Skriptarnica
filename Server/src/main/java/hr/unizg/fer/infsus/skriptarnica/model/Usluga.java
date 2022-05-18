package hr.unizg.fer.infsus.skriptarnica.model;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "usluga")
public class Usluga extends Ponuda{
    private String dostupnost;
    private int vrijemetrajanja;

    public String getDostupnost() {
        return dostupnost;
    }

    public void setDostupnost(String dostupnost) {
        this.dostupnost = dostupnost;
    }

    public int getVrijemetrajanja() {
        return vrijemetrajanja;
    }

    public void setVrijemetrajanja(int vrijemetrajanja) {
        this.vrijemetrajanja = vrijemetrajanja;
    }

    @Override
    public String toString() {
        return super.toString() + " Usluga{" +
                "dostupnost='" + dostupnost + '\'' +
                ", vrijemetrajanja=" + vrijemetrajanja +
                '}';
    }
}
