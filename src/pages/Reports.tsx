import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { mockStats, monthlyData } from "@/data/mockData";
import { 
  FileBarChart, 
  Calendar,
  TrendingUp,
  PieChart as PieChartIcon,
  Download
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import { Button } from "@/components/ui/button";

const yearlyData = [
  { month: "Jan", gesamt: 125.50, pkv: 75.33, beihilfe: 50.17, eigenanteil: 0 },
  { month: "Feb", gesamt: 425.95, pkv: 255.57, beihilfe: 85.19, eigenanteil: 85.19 },
  { month: "Mar", gesamt: 137.30, pkv: 82.38, beihilfe: 27.46, eigenanteil: 27.46 },
  { month: "Apr", gesamt: 89.50, pkv: 53.70, beihilfe: 17.90, eigenanteil: 17.90 },
  { month: "Mai", gesamt: 267.80, pkv: 160.68, beihilfe: 53.56, eigenanteil: 53.56 },
  { month: "Jun", gesamt: 195.25, pkv: 117.15, beihilfe: 39.05, eigenanteil: 39.05 }
];

export default function Reports() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Berichte & Analysen</h1>
          <p className="text-muted-foreground mt-2">
            Detaillierte Auswertungen Ihrer Gesundheitskosten für {currentYear}
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          PDF Export
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Durchschnitt/Monat"
          value={mockStats.totalAmount / 3}
          description="Ø monatliche Ausgaben"
          icon={<Calendar className="h-4 w-4" />}
          variant="primary"
        />
        
        <StatCard
          title="Erstattungsquote"
          value={`${Math.round((mockStats.paidAmount / mockStats.totalAmount) * 100)}%`}
          description="PKV + Beihilfe"
          icon={<TrendingUp className="h-4 w-4" />}
          variant="success"
        />
        
        <StatCard
          title="PKV-Anteil"
          value={`${Math.round((mockStats.pkvAmount / mockStats.totalAmount) * 100)}%`}
          description="Von Gesamtausgaben"
          icon={<PieChartIcon className="h-4 w-4" />}
          variant="primary"
        />
        
        <StatCard
          title="Eigenanteil"
          value={mockStats.totalAmount - mockStats.paidAmount}
          description="Verbleibende Kosten"
          icon={<FileBarChart className="h-4 w-4" />}
          variant="warning"
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Yearly Overview */}
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Jahresübersicht {currentYear}
            </CardTitle>
            <CardDescription>
              Monatliche Entwicklung aller Gesundheitskosten und Erstattungen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="month" 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(value) => `${value}€`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value, name) => [
                      `${Number(value).toFixed(2)}€`, 
                      name === 'gesamt' ? 'Gesamtausgaben' :
                      name === 'pkv' ? 'PKV-Erstattung' :
                      name === 'beihilfe' ? 'Beihilfe-Erstattung' :
                      'Eigenanteil'
                    ]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="gesamt" 
                    stackId="1"
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pkv" 
                    stackId="2"
                    stroke="hsl(var(--success))" 
                    fill="hsl(var(--success))"
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="beihilfe" 
                    stackId="2"
                    stroke="hsl(var(--accent))" 
                    fill="hsl(var(--accent))"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Comparison */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileBarChart className="h-5 w-5 text-primary" />
              Monatlicher Vergleich
            </CardTitle>
            <CardDescription>
              Ausgaben vs. Erstattungen der letzten Monate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="month" 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(value) => `${value}€`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value, name) => [
                      `${Number(value).toFixed(2)}€`, 
                      name === 'ausgaben' ? 'Ausgaben' :
                      name === 'pkv' ? 'PKV' : 'Beihilfe'
                    ]}
                  />
                  <Bar dataKey="ausgaben" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="pkv" fill="hsl(var(--success))" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="beihilfe" fill="hsl(var(--accent))" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Trend Analysis */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Kostentrend
            </CardTitle>
            <CardDescription>
              Entwicklung der Gesundheitskosten über Zeit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="month" 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(value) => `${value}€`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => [`${Number(value).toFixed(2)}€`, 'Gesamtausgaben']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="gesamt" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Section */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Zusammenfassung</CardTitle>
          <CardDescription>
            Wichtige Erkenntnisse aus Ihren PKV-Abrechnungen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
              <h4 className="font-medium text-primary mb-2">Höchste Ausgaben</h4>
              <p className="text-sm text-muted-foreground">
                Februar 2024 mit {Math.max(...yearlyData.map(d => d.gesamt)).toFixed(2)}€
              </p>
            </div>
            <div className="p-4 bg-success/5 rounded-lg border border-success/10">
              <h4 className="font-medium text-success mb-2">Beste Erstattung</h4>
              <p className="text-sm text-muted-foreground">
                {Math.round((mockStats.paidAmount / mockStats.totalAmount) * 100)}% der Kosten erstattet
              </p>
            </div>
            <div className="p-4 bg-warning/5 rounded-lg border border-warning/10">
              <h4 className="font-medium text-warning mb-2">Optimierungspotenzial</h4>
              <p className="text-sm text-muted-foreground">
                {mockStats.openInvoices} Anträge noch ausstehend
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}