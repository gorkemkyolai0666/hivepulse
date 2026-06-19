import Link from 'next/link';
import { Beer, Droplets, Package, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Droplets,
    title: 'Musluk Yönetimi',
    description: 'Bar ve teras musluklarınızı tek panelden takip edin, kullanım oranlarını görün.',
  },
  {
    icon: Package,
    title: 'Fıçı Envanteri',
    description: 'Dolu, muslukta ve boş fıçıları gerçek zamanlı envanter takibiyle yönetin.',
  },
  {
    icon: Sparkles,
    title: 'Hat Temizliği',
    description: 'Musluk hatlarının temizlik programını planlayın ve gecikmeleri önleyin.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-secondary text-secondary-foreground art-deco-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-copper text-primary-foreground">
              <Beer className="h-5 w-5" />
            </div>
            <span className="font-display text-xl font-semibold text-foam">BrewTrack</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="text-foam/80 hover:bg-foam/10 hover:text-foam">
              <Link href="/login">Giriş Yap</Link>
            </Button>
            <Button asChild className="bg-copper text-primary-foreground hover:bg-copper/90">
              <Link href="/register">Ücretsiz Başla</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-border bg-gradient-to-br from-foam via-background to-muted/30">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-copper">
                El Yapımı Bira Üretim Yönetimi
              </p>
              <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
                Biranızı musluktan fıçıya kadar yönetin
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Musluk atamaları, fıçı envanteri, hat temizliği ve bira stili fiyatlandırmasını tek
                platformda yönetin. Endüstriyel Art Deco tasarımıyla üretim operasyonlarınızı kontrol
                altında tutun.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild className="bg-copper hover:bg-copper/90">
                  <Link href="/register">
                    14 Gün Ücretsiz Dene
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/login">Panele Giriş</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-2xl font-semibold">Özellikler</h2>
          <div className="brewery-divider mt-4 mb-10" />
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="brewery-card p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-copper/10 text-copper">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-6xl px-6 py-12 text-center">
            <h2 className="font-display text-2xl font-semibold">Birahanenizi dijitalleştirin</h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              BrewTrack ile musluklarınızı, fıçı envanterinizi ve hat temizliği programınızı kolayca yönetin.
            </p>
            <Button className="mt-6 bg-copper hover:bg-copper/90" size="lg" asChild>
              <Link href="/register">Hemen Başlayın</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} BrewTrack — El Yapımı Bira Üretim Yönetim Platformu
      </footer>
    </div>
  );
}
