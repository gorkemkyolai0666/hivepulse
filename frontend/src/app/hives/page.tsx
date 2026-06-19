'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { AppLayout } from '@/components/app-layout';
import { LoadingSpinner, ErrorState, EmptyState } from '@/components/states';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import { formatHiveStatus } from '@/lib/utils';

interface Hive {
  id: string;
  number: string;
  location: string;
  status: string;
  hiveType?: string;
  queenAgeMonths?: number;
  notes?: string;
}

export default function HivesPage() {
  const { token } = useAuth();
  const [hives, setHives] = useState<Hive[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ number: '', location: '', queenAgeMonths: '', notes: '' });
  const [saving, setSaving] = useState(false);

  const load = () => {
    if (!token) return;
    setLoading(true);
    setError(false);
    api.hives
      .list(token)
      .then((data) => setHives((data as { data: Hive[] }).data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [token]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    try {
      await api.hives.create(token, {
        ...form,
        queenAgeMonths: form.queenAgeMonths ? parseInt(form.queenAgeMonths, 10) : undefined,
      });
      setForm({ number: '', location: '', queenAgeMonths: '', notes: '' });
      setShowForm(false);
      load();
    } catch {
      setError(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl">Kovanlar</h1>
            <p className="text-muted-foreground">Arılık kovan envanteri ve durum takibi</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Yeni Kovan
          </Button>
        </div>

        {showForm && (
          <Card className="hive-card">
            <CardHeader>
              <CardTitle className="font-display">Kovan Ekle</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="number">Kovan No</Label>
                  <Input id="number" value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="location">Konum</Label>
                  <Input id="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="queenAgeMonths">Ana Arı Yaşı (ay)</Label>
                  <Input id="queenAgeMonths" type="number" value={form.queenAgeMonths} onChange={(e) => setForm({ ...form, queenAgeMonths: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="notes">Not</Label>
                  <Input id="notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" disabled={saving}>{saving ? 'Kaydediliyor...' : 'Kaydet'}</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {loading && <LoadingSpinner />}
        {error && <ErrorState onRetry={load} />}
        {!loading && !error && hives.length === 0 && (
          <EmptyState title="Kovan bulunamadı" description="İlk kovanınızı ekleyerek başlayın." />
        )}
        {!loading && !error && hives.length > 0 && (
          <Card className="hive-card">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="hive-table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Konum</th>
                      <th>Tip</th>
                      <th>Ana Yaşı</th>
                      <th>Durum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hives.map((hive) => (
                      <tr key={hive.id}>
                        <td className="font-medium">{hive.number}</td>
                        <td>{hive.location}</td>
                        <td className="text-muted-foreground">{hive.hiveType || 'langstroth'}</td>
                        <td>{hive.queenAgeMonths ? `${hive.queenAgeMonths} ay` : '—'}</td>
                        <td><Badge variant="secondary">{formatHiveStatus(hive.status)}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
