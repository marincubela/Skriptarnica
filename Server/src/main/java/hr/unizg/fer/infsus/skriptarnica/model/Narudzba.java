package hr.unizg.fer.infsus.skriptarnica.model;

import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "Narudzba")
public class Narudzba {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long narudzbaid;

    private String status;

    private Date datumnarucen = new Date();
    private Date datumspreman = null;
    private Date datumizvrsen = null;
    private String emailkupac;
    private Long jedinstvenikod = System.currentTimeMillis();
    private Long osobaid;

    public Narudzba(String status, String emailkupac, Long osobaid) {
        this.status = status;
        this.emailkupac = emailkupac;
        this.osobaid = osobaid;
    }

    public Narudzba() {
    }

    public Long getNarudzbaid() {
        return narudzbaid;
    }

    public void setNarudzbaid(Long narudzbaid) {
        this.narudzbaid = narudzbaid;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDatumnarucen() {
        return datumnarucen;
    }

    public void setDatumnarucen(Date datumnarucen) {
        this.datumnarucen = datumnarucen;
    }

    public Date getDatumspreman() {
        return datumspreman;
    }

    public void setDatumspreman(Date datumspreman) {
        this.datumspreman = datumspreman;
    }

    public Date getDatumizvrsen() {
        return datumizvrsen;
    }

    public void setDatumizvrsen(Date datumizvrsen) {
        this.datumizvrsen = datumizvrsen;
    }

    public String getEmailkupac() {
        return emailkupac;
    }

    public void setEmailkupac(String emailkupac) {
        this.emailkupac = emailkupac;
    }

    public Long getJedinstvenikod() {
        return jedinstvenikod;
    }

    public void setJedinstvenikod(Long jedinstvenikod) {
        this.jedinstvenikod = jedinstvenikod;
    }

    public Long getOsobaid() {
        return osobaid;
    }

    public void setOsobaid(Long osobaid) {
        this.osobaid = osobaid;
    }

    @Override
    public String toString() {
        return "Narudzba{" +
                "narudzbaid=" + narudzbaid +
                ", status='" + status + '\'' +
                ", datumnarucen=" + datumnarucen +
                ", datumspreman=" + datumspreman +
                ", datumizvrsen=" + datumizvrsen +
                ", emailkupac='" + emailkupac + '\'' +
                ", jedinstvenikod=" + jedinstvenikod +
                ", osobaid=" + osobaid +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Narudzba narudzba = (Narudzba) o;
        return narudzbaid.equals(narudzba.narudzbaid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(narudzbaid);
    }
}
