# HivePulse — Final Dokümantasyon

**Tamamlanma:** 2026-06-18  
**Fabrika Dal:** cursor/autonomous-company-principles-7fe5

## Özet

HivePulse, ticari arıcılık operasyonları için üretim kalitesinde MVP'dir. Backend (NestJS + Prisma + PostgreSQL) ve frontend (Next.js + Tailwind + shadcn/ui) tamamlanmış, yerel testler geçmiştir.

## Teslimat Yolu

Cloud agent kısıtlamaları nedeniyle kod `project-artifacts/hivepulse/` altında fabrika deposuna teslim edildi. GitHub Actions `provision-new-project.yml` workflow'u MVP kodunu org reposuna kopyalar.

## Teknik Stack

- Backend port: 4020
- Frontend port: 3020
- API prefix: /api
- Health: GET /api/health

## Modüller

Apiary, Hives, Harvests, Inspections, Treatments, HoneyVarieties, Dashboard, Auth, Health

## Kararlar

1. **Tasarım:** Sol ikon rayı + organik amber paleti (BrewTrack'ten görsel olarak ayrıştırıldı)
2. **Tenant modeli:** Apiary → User (multi-tenant apiaryId ile izolasyon)
3. **Deploy:** Template provision scriptleri + CI içinde `npm run provision`
4. **Seed:** Idempotent upsert, demo@goldenmeadowapiary.com

## Sonraki Adım

PR merge → queue push → GitHub Actions repo oluşturma + Railway/Vercel sağlama → public URL doğrulama
