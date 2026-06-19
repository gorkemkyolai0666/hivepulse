'use client';

import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { LoadingSpinner, ErrorState, EmptyState } from '@/components/states';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import { formatCurrency, formatHoneyVarietyStatus } from '@/lib/utils';

interface HoneyVariety {
  id: string;
  title: string;
  varietyCategory: string;
  pricePerKg: number;
  moisturePercent?: number;
  status: string;
}

export default function HoneyVarietiesPage() {
  const { token } = useAuth();
  const [varieties, setVarieties] = useState<HoneyVariety[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token) return;
    api.honeyVarieties
      .list(token)
      .then((data) => setVarieties((data as { data: HoneyVariety[] }).data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl">Bal Çeşitleri</h1>
          <p className="text-muted-foreground">Ürün kataloğu ve kg fiyatlandırması</p>
        </div>
        {loading && <LoadingSpinner />}
        {error && <ErrorState onRetry={() => window.location.reload()} />}
        {!loading && !error && varieties.length === 0 && <EmptyState title="Bal çeşidi yok" description="Henüz ürün tanımı eklenmemiş." />}
        {!loading && !error && varieties.length > 0 && (
          <Card className="hive-card">
            <CardContent className="pt-6">
              <table className="hive-table">
                <thead>
                  <tr>
                    <th>Ürün</th>
                    <th>Kategori</th>
                    <th>Fiyat/kg</th>
                    <th>Nem %</th>
                    <th>Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {varieties.map((variety) => (
                    <tr key={variety.id}>
                      <td className="font-medium">{variety.title}</td>
                      <td>{variety.varietyCategory}</td>
                      <td>{formatCurrency(variety.pricePerKg)}</td>
                      <td>{variety.moisturePercent ?? '—'}</td>
                      <td><Badge variant="secondary">{formatHoneyVarietyStatus(variety.status)}</Badge></td>
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
