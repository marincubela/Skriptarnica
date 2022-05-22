export type ApiEmployee = {
  osobaid: number;
  ime: string;
  prezime: string;
  email: string;
  lozinka: string | null;
  zaposlenod: Date | null;
  zaposlendo: Date | null;
  jelivoditelj: string;
};
