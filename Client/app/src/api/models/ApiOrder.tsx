export enum Status {
  ACCEPTED = "Zaprimljeno",
  IN_PROGRESS = "U tijeku",
  CANCELED = "Otkazano",
}

export type ApiOrder = {
  narudzbaid: Number;
  status: Status;
  datumnarucen: Date;
  datumspreman: Date | null;
  datumizvrsen: Date | null;
  emailkupac: String;
  jedinstvenikod: Number;
  osobaid: Number;
};
