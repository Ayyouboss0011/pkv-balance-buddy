export interface Invoice {
  id: string;
  belegnummer: string;
  rechnungsdatum: string;
  ausgestelltVon: string;
  preis: number;
  beglichenAm?: string;
  pkvAntragVon?: string;
  beihilfeAntragVon?: string;
  pkvZahlungVon?: string;
  beihilfeZahlungVon?: string;
  status: "offen" | "teilweise_beglichen" | "vollständig_beglichen";
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceFormData {
  belegnummer: string;
  rechnungsdatum: string;
  ausgestelltVon: string;
  preis: number;
  beglichenAm?: string;
  pkvAntragVon?: string;
  beihilfeAntragVon?: string;
  pkvZahlungVon?: string;
  beihilfeZahlungVon?: string;
}

export interface InvoiceStats {
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  pkvAmount: number;
  beihilfeAmount: number;
  totalInvoices: number;
  openInvoices: number;
  monthlyTrend: number;
}