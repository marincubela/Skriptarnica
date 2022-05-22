package hr.unizg.fer.infsus.skriptarnica.model;


import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

@Entity
@Table(name = "djelatnik")
public class Djelatnik {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long osobaid;

    private String ime;
    private String prezime;
    private String email;
    private String lozinka;
    private Date zaposlenod;
    private Date zaposlendo;
    private String jelivoditelj;

    public Long getOsobaid() {
        return osobaid;
    }

    public void setOsobaid(Long osobaid) {
        this.osobaid = osobaid;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLozinka() {
        return lozinka;
    }

    public void setLozinka(String lozinka) {
        this.lozinka = lozinka;
    }

    public Date getZaposlenod() {
        return zaposlenod;
    }

    public void setZaposlenod(Date zaposlenod) {
        this.zaposlenod = zaposlenod;
    }

    public Date getZaposlendo() {
        return zaposlendo;
    }

    public void setZaposlendo(Date zaposlendo) {
        this.zaposlendo = zaposlendo;
    }

    public String getJelivoditelj() {
        return jelivoditelj;
    }

    public void setJelivoditelj(String jelivoditelj) {
        this.jelivoditelj = jelivoditelj;
    }

    @Override
    public String toString() {
        return "Djelatnik{" +
                "osobaid=" + osobaid +
                ", ime='" + ime + '\'' +
                ", prezime='" + prezime + '\'' +
                ", email='" + email + '\'' +
                ", lozinka='" + lozinka + '\'' +
                ", zaposlenod=" + zaposlenod +
                ", zaposlendo=" + zaposlendo +
                ", jelivoditelj='" + jelivoditelj + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Djelatnik djelatnik = (Djelatnik) o;
        return Objects.equals(osobaid, djelatnik.osobaid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(osobaid);
    }
}
