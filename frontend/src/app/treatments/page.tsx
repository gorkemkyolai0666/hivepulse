'use client';

import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { LoadingSpinner, ErrorState, EmptyState } from '@/components/states';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import { formatDate, formatTreatmentStatus } from '@/lib/utils';

interface Treatment {
  id: string;
  title: string;
  category: string;
  location?: string;
  scheduledAt: string;
  status: string;
}

export default function TreatmentsPage() {
  const { token } = useAuth();
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token) return;
    api.treatments
      .list(token)
      .then((data) => setTreatments((data as { data: Treatment[] }).data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl">Tedaviler</h1>
          <p className="text-muted-foreground">Varroa, besleme ve bakım planları</p>
        </div>
        {loading && <LoadingSpinner />}
        {error && <ErrorState onRetry={() => window.location.reload()} />}
        {!loading && !error && treatments.length === 0 && <EmptyState title="Tedavi planı yok" description="Henüz tedavi kaydı eklenmemiş." />}
        {!loading && !error && treatments.length > 0 && (
          <Card className="hive-card">
            <CardContent className="pt-6">
              <table className="hive-table">
                <thead>
                  <tr>
                    <th>Başlık</th>
                    <th>Kategori</th>
                    <th>Konum</th>
                    <th>Tarih</th>
                    <th>Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {treatments.map((treatment) => (
                    <tr key={treatment.id}>
                      <td className="font-medium">{treatment.title}</td>
                      <td>{treatment.category}</td>
                      <td>{treatment.location || '—'}</td>
                      <td>{formatDate(treatment.scheduledAt)}</td>
                      <td><Badge variant="secondary">{formatTreatmentStatus(treatment.status)}</Badge></td>
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
