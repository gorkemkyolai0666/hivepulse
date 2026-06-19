# CampLedger Mimari

## Genel Bakış

CampLedger, kamp alanı operatörleri için full-stack B2B SaaS platformudur.

```
┌─────────────┐     HTTPS      ┌─────────────┐
│   Vercel    │ ────────────── │   Railway   │
│  (Frontend) │                │  (Backend)  │
│  Next.js    │ ◄── REST API ──│   NestJS    │
└─────────────┘                └──────┬──────┘
                                      │
                               ┌──────▼──────┐
                               │  PostgreSQL │
                               │  (Railway)  │
                               └─────────────┘
```

## Teknoloji Yığını

| Katman | Teknoloji |
|--------|-----------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, shadcn/ui |
| Backend | NestJS, Prisma ORM, JWT Auth |
| Veritabanı | PostgreSQL 16 |
| CI/CD | GitHub Actions |
| Hosting | Vercel (frontend), Railway (backend + DB) |

## Backend Modülleri

- `auth` — JWT tabanlı kimlik doğrulama
- `campground` — Kamp alanı profili
- `campsites` — Kamp yeri envanteri CRUD
- `guests` — Misafir profilleri CRUD
- `reservations` — Rezervasyon yönetimi
- `maintenance` — Bakım görevleri
- `seasonal-rates` — Sezonluk fiyatlandırma
- `dashboard` — İstatistikler ve özet
- `health` — Sağlık kontrolü

## Veri Modeli

```
Campground 1──N User
Campground 1──N Campsite
Campground 1──N Guest
Campground 1──N Reservation
Campground 1──N MaintenanceTask
Campground 1──N SeasonalRate

Campsite 1──N Reservation
Guest 1──N Reservation
```

## Güvenlik

- JWT Bearer token kimlik doğrulama
- bcrypt şifre hashleme (12 rounds)
- CORS: FRONTEND_URL ortam değişkeni
- Kamp alanı bazlı veri izolasyonu (campgroundId)

## Portlar

| Servis | Geliştirme | Production |
|--------|------------|------------|
| Frontend | 3006 | Vercel |
| Backend | 4006 | Railway |
| PostgreSQL | 5438 | Railway |
