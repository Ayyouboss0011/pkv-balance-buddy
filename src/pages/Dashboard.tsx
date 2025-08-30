import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { mockStats, monthlyData } from "@/data/mockData";
import { 
  Euro, 
  FileText, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--warning))'];

const pieData = [
  { name: 'PKV', value: mockStats.pkvAmount, color: 'hsl(var(--primary))' },
  { name: 'Beihilfe', value: mockStats.beihilfeAmount, color: 'hsl(var(--success))' },
  { name: 'Offen', value: mockStats.pendingAmount, color: 'hsl(var(--warning))' }
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Überblick über Ihre Arztrechnungen und Erstattungen
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Gesamtausgaben"
          value={mockStats.totalAmount}
          description="Alle Rechnungen"
          icon={<Euro className="h-4 w-4" />}
          variant="primary"
          trend={{
            value: mockStats.monthlyTrend,
            label: "vs. letzter Monat"
          }}
        />
        
        <StatCard
          title="Bereits erstattet"
          value={mockStats.paidAmount}
          description="PKV + Beihilfe"
          icon={<CheckCircle className="h-4 w-4" />}
          variant="success"
        />
        
        <StatCard
          title="Noch offen"
          value={mockStats.pendingAmount}
          description={`${mockStats.openInvoices} Rechnungen`}
          icon={<Clock className="h-4 w-4" />}
          variant="warning"
        />
        
        <StatCard
          title="Anzahl Rechnungen"
          value={mockStats.totalInvoices}
          description="Gesamt erfasst"
          icon={<FileText className="h-4 w-4" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Trend Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Monatliche Ausgaben
            </CardTitle>
            <CardDescription>
              Entwicklung der Gesundheitskosten über die letzten Monate
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
                    formatter={(value) => [`${value}€`, '']}
                  />
                  <Bar 
                    dataKey="ausgaben" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                    name="Ausgaben"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart for Payment Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Erstattungsverteilung
            </CardTitle>
            <CardDescription>
              Aufschlüsselung nach PKV, Beihilfe und offenen Beträgen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => [`${Number(value).toFixed(2)}€`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legend */}
            <div className="flex justify-center space-x-6 mt-4">
              {pieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {entry.name}: {entry.value.toFixed(2)}€
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}