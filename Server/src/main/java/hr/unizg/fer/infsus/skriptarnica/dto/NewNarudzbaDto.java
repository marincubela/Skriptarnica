package hr.unizg.fer.infsus.skriptarnica.dto;

import hr.unizg.fer.infsus.skriptarnica.model.Narudzba;
import hr.unizg.fer.infsus.skriptarnica.model.StavkaNarudzba;

import java.util.List;

public class NewNarudzbaDto {
    private final String status;
    private final String emailkupac;
    private final Long osobaid;

    private final List<StavkaNarudzba> stavkaNarudzbas;

    public NewNarudzbaDto(String status, String emailkupac, Long osobaid, List<StavkaNarudzba> stavkaNarudzbas) {
        this.status = status;
        this.emailkupac = emailkupac;
        this.osobaid = osobaid;
        this.stavkaNarudzbas = stavkaNarudzbas;
    }

    public Narudzba toNarudzba() {
        return new Narudzba(this.status, this.emailkupac, this.osobaid);
    }

    public List<StavkaNarudzba> getStavkaNarudzbas() {
        return stavkaNarudzbas;
    }

    @Override
    public String toString() {
        return "NewNarudzbaDto{" +
                "status='" + status + '\'' +
                ", emailkupac='" + emailkupac + '\'' +
                ", osobaid=" + osobaid +
                ", stavkas= " + stavkaNarudzbas.toString() +
                '}';
    }
}
