import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockInvoices } from "@/data/mockData";
import { Invoice } from "@/types/invoice";
import { 
  Search, 
  Plus, 
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const statusColors = {
  "offen": "bg-warning/10 text-warning border-warning/20",
  "teilweise_beglichen": "bg-primary/10 text-primary border-primary/20", 
  "vollständig_beglichen": "bg-success/10 text-success border-success/20"
};

const statusLabels = {
  "offen": "Offen",
  "teilweise_beglichen": "Teilweise beglichen",
  "vollständig_beglichen": "Vollständig beglichen"
};

export default function Invoices() {
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>(mockInvoices);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = invoices.filter(invoice => 
      invoice.belegnummer.toLowerCase().includes(term.toLowerCase()) ||
      invoice.ausgestelltVon.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredInvoices(filtered);
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("de-DE", {
      style: "currency", 
      currency: "EUR"
    });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return format(new Date(dateString), "dd.MM.yyyy", { locale: de });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alle Rechnungen</h1>
          <p className="text-muted-foreground">
            Verwalten Sie Ihre Arztrechnungen und verfolgen Sie den Erstattungsstatus
          </p>
        </div>
        <Link to="/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Neue Rechnung
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Suchen & Filtern
          </CardTitle>
          <CardDescription>
            Finden Sie schnell bestimmte Rechnungen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Nach Belegnummer oder Aussteller suchen..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Rechnungsübersicht</CardTitle>
              <CardDescription>
                {filteredInvoices.length} Rechnung{filteredInvoices.length !== 1 ? "en" : ""} gefunden
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Belegnummer</TableHead>
                  <TableHead>Datum</TableHead>
                  <TableHead>Aussteller</TableHead>
                  <TableHead className="text-right">Betrag</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>PKV</TableHead>
                  <TableHead>Beihilfe</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {invoice.belegnummer}
                    </TableCell>
                    <TableCell>
                      {formatDate(invoice.rechnungsdatum)}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {invoice.ausgestelltVon}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(invoice.preis)}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={statusColors[invoice.status]}
                      >
                        {statusLabels[invoice.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {invoice.pkvAntragVon && (
                          <div className="text-muted-foreground">
                            Antrag: {formatDate(invoice.pkvAntragVon)}
                          </div>
                        )}
                        {invoice.pkvZahlungVon && (
                          <div className="text-success font-medium">
                            Zahlung: {formatDate(invoice.pkvZahlungVon)}
                          </div>
                        )}
                        {!invoice.pkvAntragVon && !invoice.pkvZahlungVon && (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {invoice.beihilfeAntragVon && (
                          <div className="text-muted-foreground">
                            Antrag: {formatDate(invoice.beihilfeAntragVon)}
                          </div>
                        )}
                        {invoice.beihilfeZahlungVon && (
                          <div className="text-success font-medium">
                            Zahlung: {formatDate(invoice.beihilfeZahlungVon)}
                          </div>
                        )}
                        {!invoice.beihilfeAntragVon && !invoice.beihilfeZahlungVon && (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            Ansehen
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Edit className="h-4 w-4" />
                            Bearbeiten
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                            <Trash2 className="h-4 w-4" />
                            Löschen
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredInvoices.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Keine Rechnungen gefunden. 
                <Link to="/new" className="text-primary hover:underline ml-1">
                  Erstellen Sie die erste Rechnung
                </Link>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}