'use client';

import { useEffect, useState } from 'react';
import { Hexagon, Droplets, ClipboardCheck, FlaskConical, TrendingUp } from 'lucide-react';
import { AppLayout } from '@/components/app-layout';
import { StatCard } from '@/components/stat-card';
import { LoadingSpinner, ErrorState } from '@/components/states';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import {
  formatDate,
  formatPercent,
  formatWeightKg,
  formatInspectionStatus,
  formatBroodPattern,
} from '@/lib/utils';

interface DashboardStats {
  totalHives: number;
  activeHives: number;
  inactiveHives: number;
  hiveActivityRate: number;
  totalHarvests: number;
  completedInspections: number;
  followUpInspections: number;
  pendingTreatments: number;
  upcomingHoneyVarieties: number;
  harvestValue: number;
  recentInspections: Array<{
    id: string;
    inspectedAt: string;
    status: string;
    broodPattern: string;
    hive?: { number: string; location: string };
  }>;
  locations: Array<{ location: string; hiveCount: number }>;
  monthlyTrend: Array<{ month: string; inspections: number; honeyStores: number }>;
}

export default function DashboardPage() {
  const { token } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadStats = () => {
    if (!token) return;
    setLoading(true);
    setError(false);
    api.dashboard
      .stats(token)
      .then((data) => setStats(data as DashboardStats))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadStats();
  }, [token]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Arılık Paneli</h1>
          <p className="text-muted-foreground">Kovan sağlığı, hasat ve tedavi operasyon özeti</p>
          <div className="hive-divider mt-4" />
        </div>

        {loading && <LoadingSpinner />}
        {error && <ErrorState onRetry={loadStats} />}
        {stats && !loading && (
          <>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Kovan Aktivitesi"
                value={formatPercent(stats.hiveActivityRate)}
                description={`${stats.activeHives}/${stats.totalHives} kovan aktif`}
                icon={<Hexagon className="h-4 w-4" />}
              />
              <StatCard
                title="Bal Hasatları"
                value={stats.totalHarvests}
                description={`Toplam ağırlık: ${formatWeightKg(stats.harvestValue)}`}
                icon={<Droplets className="h-4 w-4" />}
              />
              <StatCard
                title="Kontrol & Tedavi"
                value={stats.followUpInspections}
                description={`${stats.pendingTreatments} bekleyen tedavi`}
                icon={<FlaskConical className="h-4 w-4" />}
              />
              <StatCard
                title="Tamamlanan Kontroller"
                value={stats.completedInspections}
                description={`${stats.upcomingHoneyVarieties} mevsimlik bal çeşidi`}
                icon={<ClipboardCheck className="h-4 w-4" />}
              />
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="hive-card border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display text-xl">
                    <ClipboardCheck className="h-4 w-4 text-amber" />
                    Son Kovan Kontrolleri
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {stats.recentInspections.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Henüz kontrol kaydı yok.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="hive-table">
                        <thead>
                          <tr>
                            <th>Kovan</th>
                            <th>Tarih</th>
                            <th>Yavru</th>
                            <th>Durum</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stats.recentInspections.map((inspection) => (
                            <tr key={inspection.id}>
                              <td className="font-medium">
                                {inspection.hive?.number}
                                <span className="ml-1 text-muted-foreground">({inspection.hive?.location})</span>
                              </td>
                              <td>{formatDate(inspection.inspectedAt)}</td>
                              <td>{formatBroodPattern(inspection.broodPattern)}</td>
                              <td>
                                <Badge variant="secondary">{formatInspectionStatus(inspection.status)}</Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="hive-card border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display text-xl">
                    <Hexagon className="h-4 w-4 text-accent" />
                    Kovan Konumları
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {stats.locations.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Henüz kovan tanımlanmamış.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="hive-table">
                        <thead>
                          <tr>
                            <th>Konum</th>
                            <th>Kovan Sayısı</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stats.locations.map((loc) => (
                            <tr key={loc.location}>
                              <td className="font-medium">{loc.location}</td>
                              <td>
                                <Badge variant="secondary">{loc.hiveCount} kovan</Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="hive-card border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-xl">
                  <TrendingUp className="h-4 w-4 text-amber" />
                  Aylık Kontrol Trendi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="hive-table">
                    <thead>
                      <tr>
                        <th>Ay</th>
                        <th>Kontrol</th>
                        <th>Bal Deposu (toplam)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.monthlyTrend.map((row) => (
                        <tr key={row.month}>
                          <td className="font-medium">{row.month}</td>
                          <td>{row.inspections}</td>
                          <td>{formatWeightKg(row.honeyStores)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AppLayout>
  );
}
