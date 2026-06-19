'use client';

import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { LoadingSpinner, ErrorState, EmptyState } from '@/components/states';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import { formatHarvestStatus, formatWeightKg } from '@/lib/utils';

interface Harvest {
  id: string;
  batchName: string;
  floralSource?: string;
  weightKg: number;
  status: string;
  harvestedAt?: string;
  hive?: { number: string; location: string };
}

export default function HarvestsPage() {
  const { token } = useAuth();
  const [harvests, setHarvests] = useState<Harvest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token) return;
    api.harvests
      .list(token)
      .then((data) => setHarvests((data as { data: Harvest[] }).data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl">Bal Hasatları</h1>
          <p className="text-muted-foreground">Hasat partileri ve depolama durumu</p>
        </div>
        {loading && <LoadingSpinner />}
        {error && <ErrorState onRetry={() => window.location.reload()} />}
        {!loading && !error && harvests.length === 0 && <EmptyState title="Hasat kaydı yok" description="Henüz bal hasadı eklenmemiş." />}
        {!loading && !error && harvests.length > 0 && (
          <Card className="hive-card">
            <CardContent className="pt-6">
              <table className="hive-table">
                <thead>
                  <tr>
                    <th>Parti</th>
                    <th>Çiçek Kaynağı</th>
                    <th>Ağırlık</th>
                    <th>Kovan</th>
                    <th>Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {harvests.map((harvest) => (
                    <tr key={harvest.id}>
                      <td className="font-medium">{harvest.batchName}</td>
                      <td>{harvest.floralSource || '—'}</td>
                      <td>{formatWeightKg(harvest.weightKg)}</td>
                      <td>{harvest.hive?.number || '—'}</td>
                      <td><Badge variant="secondary">{formatHarvestStatus(harvest.status)}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
