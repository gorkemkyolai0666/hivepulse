# Deployment

**Proje:** HivePulse  
**Son Güncelleme:** 2026-06-18  
**Durum:** MVP hazır — GitHub Actions sağlama bekliyor

## Demo Hesabı

| Alan | Değer |
|------|-------|
| E-posta | demo@goldenmeadowapiary.com |
| Şifre | demo123456 |

## Ortam Değişkenleri

### Backend (Railway)

```
DATABASE_URL=
JWT_SECRET=
FRONTEND_URL=
PORT=4020
```

### Frontend (Vercel)

```
NEXT_PUBLIC_API_URL=
```

## Sağlama Adımları

1. Fabrika PR merge → `projects/project-queue/hivepulse.json` push
2. GitHub Actions `Provision New Project` workflow tetiklenir
3. `project-artifacts/hivepulse/` → `gorkemkyolai0666/hivepulse` repo
4. CI: `npm run provision` (Railway + Vercel)
5. Smoke test: health, login, dashboard, CRUD

## Public URL'ler

| Servis | URL | Durum |
|--------|-----|-------|
| Frontend (Vercel) | CI sonrası güncellenecek | Bekliyor |
| Backend (Railway) | CI sonrası güncellenecek | Bekliyor |
| Health | `{BACKEND}/api/health` | MVP doğrulandı (yerel) |

## Yerel Geliştirme

```bash
# Backend
cd backend && npm ci
export DATABASE_URL=postgresql://hivepulse:hivepulse123@localhost:5432/hivepulse
npx prisma migrate deploy && npx prisma db seed
npm run start:dev

# Frontend
cd frontend && npm ci
export NEXT_PUBLIC_API_URL=http://localhost:4020/api
npm run dev
```

## Doğrulama (Yerel — 2026-06-18)

- GET /api/health → 200
- Demo login → 200
- Integration tests → 14/14 geçti
- Frontend build → başarılı
