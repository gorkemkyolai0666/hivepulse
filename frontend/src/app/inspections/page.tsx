'use client';

import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { LoadingSpinner, ErrorState, EmptyState } from '@/components/states';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import { formatDate, formatInspectionStatus, formatBroodPattern } from '@/lib/utils';

interface Inspection {
  id: string;
  inspectedAt: string;
  status: string;
  broodPattern: string;
  temperament: string;
  hive?: { number: string; location: string };
}

export default function InspectionsPage() {
  const { token } = useAuth();
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token) return;
    api.inspections
      .list(token)
      .then((data) => setInspections((data as { data: Inspection[] }).data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl">Kovan Kontrolleri</h1>
          <p className="text-muted-foreground">Periyodik kontrol kayıtları ve takip listesi</p>
        </div>
        {loading && <LoadingSpinner />}
        {error && <ErrorState onRetry={() => window.location.reload()} />}
        {!loading && !error && inspections.length === 0 && <EmptyState title="Kontrol kaydı yok" description="Henüz kovan kontrolü eklenmemiş." />}
        {!loading && !error && inspections.length > 0 && (
          <Card className="hive-card">
            <CardContent className="pt-6">
              <table className="hive-table">
                <thead>
                  <tr>
                    <th>Kovan</th>
                    <th>Tarih</th>
                    <th>Yavru Deseni</th>
                    <th>Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {inspections.map((inspection) => (
                    <tr key={inspection.id}>
                      <td className="font-medium">{inspection.hive?.number} ({inspection.hive?.location})</td>
                      <td>{formatDate(inspection.inspectedAt)}</td>
                      <td>{formatBroodPattern(inspection.broodPattern)}</td>
                      <td><Badge variant="secondary">{formatInspectionStatus(inspection.status)}</Badge></td>
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
