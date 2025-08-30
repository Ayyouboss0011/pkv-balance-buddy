import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { CalendarIcon, Save, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { InvoiceFormData } from "@/types/invoice";

const formSchema = z.object({
  belegnummer: z.string().min(1, "Belegnummer ist erforderlich"),
  rechnungsdatum: z.date({
    required_error: "Rechnungsdatum ist erforderlich",
  }),
  ausgestelltVon: z.string().min(1, "Aussteller ist erforderlich"),
  preis: z.number().min(0.01, "Preis muss größer als 0 sein"),
  beglichenAm: z.date().optional(),
  pkvAntragVon: z.date().optional(),
  beihilfeAntragVon: z.date().optional(),
  pkvZahlungVon: z.date().optional(),
  beihilfeZahlungVon: z.date().optional(),
});

export default function NewInvoice() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      belegnummer: "",
      ausgestelltVon: "",
      preis: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Simulate API call - hier würde später die Supabase Integration stehen
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Neue Rechnung:", values);
      
      toast({
        title: "Rechnung gespeichert",
        description: "Die Rechnung wurde erfolgreich erstellt.",
      });
      
      navigate("/invoices");
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Die Rechnung konnte nicht gespeichert werden.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const DatePickerField = ({ 
    field, 
    label, 
    description 
  }: { 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: any;
    label: string;
    description?: string;
  }) => (
    <FormItem className="flex flex-col">
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              className={cn(
                "w-full pl-3 text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value ? (
                format(field.value, "PPP", { locale: de })
              ) : (
                <span>Datum auswählen</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Neue Rechnung</h1>
          <p className="text-muted-foreground">
            Erfassen Sie eine neue Arztrechnung für Ihre PKV-Abrechnung
          </p>
        </div>
      </div>

      {/* Form */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Rechnungsdetails</CardTitle>
          <CardDescription>
            Geben Sie alle relevanten Informationen zu Ihrer Arztrechnung ein
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Belegnummer */}
                <FormField
                  control={form.control}
                  name="belegnummer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Belegnummer *</FormLabel>
                      <FormControl>
                        <Input placeholder="z.B. RG-2024-001" {...field} />
                      </FormControl>
                      <FormDescription>
                        Eindeutige Nummer der Rechnung
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Rechnungsdatum */}
                <FormField
                  control={form.control}
                  name="rechnungsdatum"
                  render={({ field }) => (
                    <DatePickerField 
                      field={field} 
                      label="Rechnungsdatum *"
                      description="Datum der Rechnungsstellung"
                    />
                  )}
                />

                {/* Ausgestellt von */}
                <FormField
                  control={form.control}
                  name="ausgestelltVon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ausgestellt von *</FormLabel>
                      <FormControl>
                        <Input placeholder="z.B. Dr. med. Schmidt" {...field} />
                      </FormControl>
                      <FormDescription>
                        Name des Arztes oder der Praxis
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Preis */}
                <FormField
                  control={form.control}
                  name="preis"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rechnungsbetrag (€) *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          min="0"
                          placeholder="0.00"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormDescription>
                        Gesamtbetrag der Rechnung
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Optionale Daten */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Optionale Angaben</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="beglichenAm"
                    render={({ field }) => (
                      <DatePickerField 
                        field={field} 
                        label="Beglichen am"
                        description="Wann haben Sie die Rechnung bezahlt?"
                      />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pkvAntragVon"
                    render={({ field }) => (
                      <DatePickerField 
                        field={field} 
                        label="PKV-Antrag vom"
                        description="Antrag bei der PKV gestellt"
                      />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="beihilfeAntragVon"
                    render={({ field }) => (
                      <DatePickerField 
                        field={field} 
                        label="Beihilfe-Antrag vom"
                        description="Antrag bei der Beihilfe gestellt"
                      />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pkvZahlungVon"
                    render={({ field }) => (
                      <DatePickerField 
                        field={field} 
                        label="PKV-Zahlung vom"
                        description="Erstattung durch PKV erhalten"
                      />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="beihilfeZahlungVon"
                    render={({ field }) => (
                      <DatePickerField 
                        field={field} 
                        label="Beihilfe-Zahlung vom"
                        description="Erstattung durch Beihilfe erhalten"
                      />
                    )}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Abbrechen
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {isSubmitting ? "Speichern..." : "Rechnung speichern"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}