'use client';

import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { LoadingSpinner, ErrorState } from '@/components/states';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';

interface ApiaryProfile {
  name: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  totalHives: number;
  timezone: string;
}

export default function SettingsPage() {
  const { token } = useAuth();
  const [apiary, setApiary] = useState<ApiaryProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const load = () => {
    if (!token) return;
    setLoading(true);
    api.apiary
      .get(token)
      .then((data) => setApiary(data as ApiaryProfile))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [token]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !apiary) return;
    setSaving(true);
    setSuccess(false);
    try {
      await api.apiary.update(token, apiary as unknown as Record<string, unknown>);
      setSuccess(true);
    } catch {
      setError(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="font-display text-3xl">Ayarlar</h1>
          <p className="text-muted-foreground">Arılık profil bilgileri</p>
        </div>

        {loading && <LoadingSpinner />}
        {error && <ErrorState onRetry={load} />}
        {apiary && !loading && (
          <Card className="hive-card border-none shadow-md">
            <CardHeader>
              <CardTitle className="font-display">Arılık Profili</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                {success && (
                  <div className="rounded-lg bg-success/10 p-3 text-sm text-success">Ayarlar kaydedildi.</div>
                )}
                <div className="space-y-2">
                  <Label>Arılık Adı</Label>
                  <Input value={apiary.name} onChange={(e) => setApiary({ ...apiary, name: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Telefon</Label>
                  <Input value={apiary.phone || ''} onChange={(e) => setApiary({ ...apiary, phone: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Adres</Label>
                  <Input value={apiary.address || ''} onChange={(e) => setApiary({ ...apiary, address: e.target.value })} />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Şehir</Label>
                    <Input value={apiary.city || ''} onChange={(e) => setApiary({ ...apiary, city: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Bölge</Label>
                    <Input value={apiary.state || ''} onChange={(e) => setApiary({ ...apiary, state: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Posta Kodu</Label>
                    <Input value={apiary.zipCode || ''} onChange={(e) => setApiary({ ...apiary, zipCode: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Toplam Kovan Kapasitesi</Label>
                  <Input
                    type="number"
                    value={apiary.totalHives}
                    onChange={(e) => setApiary({ ...apiary, totalHives: parseInt(e.target.value, 10) })}
                  />
                </div>
                <Button type="submit" disabled={saving} className="bg-amber hover:bg-amber/90">
                  {saving ? 'Kaydediliyor...' : 'Kaydet'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
