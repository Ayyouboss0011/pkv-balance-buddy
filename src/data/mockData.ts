import { Invoice, InvoiceStats } from "@/types/invoice";

export const mockInvoices: Invoice[] = [
  {
    id: "1", 
    belegnummer: "RG-2024-001",
    rechnungsdatum: "2024-01-15",
    ausgestelltVon: "Dr. med. Schmidt",
    preis: 125.50,
    beglichenAm: "2024-01-16",
    pkvAntragVon: "2024-01-17",
    beihilfeAntragVon: "2024-01-17",
    pkvZahlungVon: "2024-01-25",
    beihilfeZahlungVon: "2024-02-05",
    status: "vollständig_beglichen",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-02-05T14:30:00Z"
  },
  {
    id: "2",
    belegnummer: "RG-2024-002", 
    rechnungsdatum: "2024-02-10",
    ausgestelltVon: "Zahnarztpraxis Dr. Müller",
    preis: 340.75,
    beglichenAm: "2024-02-11",
    pkvAntragVon: "2024-02-12",
    pkvZahlungVon: "2024-02-20",
    status: "teilweise_beglichen",
    createdAt: "2024-02-10T09:15:00Z",
    updatedAt: "2024-02-20T11:45:00Z"
  },
  {
    id: "3",
    belegnummer: "RG-2024-003",
    rechnungsdatum: "2024-02-20",
    ausgestelltVon: "Radiologie Zentrum",
    preis: 85.20,
    beglichenAm: "2024-02-21",
    pkvAntragVon: "2024-02-22",
    status: "offen",
    createdAt: "2024-02-20T16:20:00Z",
    updatedAt: "2024-02-22T08:10:00Z"
  },
  {
    id: "4",
    belegnummer: "RG-2024-004",
    rechnungsdatum: "2024-03-05",
    ausgestelltVon: "Physiotherapie Weber",
    preis: 95.00,
    beglichenAm: "2024-03-05",
    status: "offen",
    createdAt: "2024-03-05T13:45:00Z",
    updatedAt: "2024-03-05T13:45:00Z"
  },
  {
    id: "5",
    belegnummer: "RG-2024-005",
    rechnungsdatum: "2024-03-12",
    ausgestelltVon: "Apotheke am Markt",
    preis: 42.30,
    beglichenAm: "2024-03-12",
    pkvAntragVon: "2024-03-13",
    beihilfeAntragVon: "2024-03-13",
    pkvZahlungVon: "2024-03-18",
    beihilfeZahlungVon: "2024-03-25",
    status: "vollständig_beglichen",
    createdAt: "2024-03-12T11:30:00Z",
    updatedAt: "2024-03-25T16:20:00Z"
  }
];

export const mockStats: InvoiceStats = {
  totalAmount: 688.75,
  paidAmount: 508.55,
  pendingAmount: 180.20,
  pkvAmount: 383.25,
  beihilfeAmount: 125.30,
  totalInvoices: 5,
  openInvoices: 2,
  monthlyTrend: 12.5
};

export const monthlyData = [
  { month: "Jan", ausgaben: 125.50, pkv: 75.33, beihilfe: 50.17 },
  { month: "Feb", ausgaben: 425.95, pkv: 255.57, beihilfe: 85.19 },
  { month: "Mar", ausgaben: 137.30, pkv: 82.38, beihilfe: 27.46 }
];