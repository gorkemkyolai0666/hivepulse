# CampLedger Veritabanı

## PostgreSQL 16

## Tablolar

| Tablo | Açıklama |
|-------|----------|
| campgrounds | Kamp alanı profilleri |
| users | Kullanıcı hesapları (JWT auth) |
| campsites | Kamp yeri envanteri |
| guests | Misafir profilleri |
| reservations | Rezervasyonlar |
| maintenance_tasks | Bakım görevleri |
| seasonal_rates | Sezonluk fiyatlandırma |

## Enum'lar

- `UserRole`: owner, manager, ranger
- `CampsiteStatus`: available, occupied, reserved, maintenance
- `CampsiteType`: tent, rv_full, rv_partial, cabin
- `VehicleType`: tent, rv, trailer, van, car
- `GuestStatus`: active, inactive, seasonal
- `ReservationStatus`: active, checked_out, pending, cancelled
- `MaintenanceStatus`: scheduled, in_progress, completed, overdue
- `MaintenanceCategory`: site, electrical, plumbing, grounds, safety, other
- `SeasonName`: spring, summer, fall, winter
- `SeasonalRateStatus`: active, upcoming, expired

## Migration

```bash
cd backend
npx prisma migrate deploy
npx prisma db seed
```

## Demo Verisi

- Kamp Alanı: Pine Valley Campground, Moab, UT
- E-posta: demo@pinevalleycamp.com
- Şifre: demo123456
- 6 kamp yeri, 3 misafir, 2 aktif rezervasyon
