# HivePulse Tasarım Sistemi

**Yön:** Organik Veri Yoğun  
**Son Güncelleme:** 2026-06-18

## Renk Paleti

| Token | Açık Mod | Koyu Mod | Kullanım |
|-------|----------|----------|----------|
| amber | hsl(42 88% 48%) | hsl(42 85% 52%) | Birincil CTA, aktif nav |
| forest | hsl(88 35% 18%) | hsl(88 22% 16%) | Sidebar, başlık arka planı |
| wax | hsl(42 55% 96%) | hsl(42 55% 94%) | Metin vurgusu, arka plan |
| pollen | hsl(32 90% 52%) | hsl(32 85% 50%) | Uyarı, mevsimlik vurgu |
| accent | hsl(152 35% 34%) | hsl(152 35% 38%) | Başarı, doğa vurgusu |

## Tipografi

- **Display:** Fraunces — sayfa başlıkları, marka
- **Body:** Source Sans 3 — tablolar, formlar, navigasyon

## Spacing Scale

4px taban: 4, 8, 12, 16, 24, 32, 48, 64

## Border Radius

- sm: 6px — badge, input
- md: 8px — kart, buton
- lg: 10px — sidebar ikon kutusu

## Navigasyon

Sol sabit ikon rayı (4.5rem mobil, 14rem desktop). Üst sekme navigasyonu kullanılmaz.

## Bileşen Dili

- `.hive-card` — hafif amber radial gradient
- `.hive-table` — yoğun veri tabloları, uppercase header
- `.hive-divider` — amber gradient ayırıcı

## Erişilebilirlik

WCAG AA kontrast, focus ring amber, tüm interaktif öğelerde aria-label.
