# CampLedger API

Base URL: `{NEXT_PUBLIC_API_URL}` (ör. `http://localhost:4006/api`)

## Kimlik Doğrulama

Tüm endpoint'ler (health hariç) `Authorization: Bearer <token>` gerektirir.

### POST /auth/register
Yeni kamp alanı ve kullanıcı kaydı.

### POST /auth/login
Giriş yap, JWT token al.

### GET /auth/me
Mevcut kullanıcı ve kamp alanı bilgisi.

## Sağlık

### GET /health
Sağlık kontrolü (auth gerekmez).

## Kamp Alanı

### GET /campground
Kamp alanı profili.

### PATCH /campground
Kamp alanı profilini güncelle.

## Kamp Yerleri

### GET /campsites
Tüm kamp yerlerini listele.

### POST /campsites
Yeni kamp yeri oluştur.

### GET /campsites/:id
Kamp yeri detayı.

### PATCH /campsites/:id
Kamp yeri güncelle.

### DELETE /campsites/:id
Kamp yeri sil.

## Misafirler

### GET /guests
Tüm misafirleri listele.

### POST /guests
Yeni misafir oluştur.

### GET /guests/:id
Misafir detayı.

### PATCH /guests/:id
Misafir güncelle.

### DELETE /guests/:id
Misafir sil.

## Rezervasyonlar

### GET /reservations
Tüm rezervasyonları listele.

### GET /reservations/checking-out
Çıkış yaklaşan rezervasyonlar.

### POST /reservations
Yeni rezervasyon oluştur.

### PATCH /reservations/:id
Rezervasyon güncelle.

### DELETE /reservations/:id
Rezervasyon sil.

## Bakım Görevleri

### GET /maintenance
Tüm bakım görevlerini listele.

### POST /maintenance
Yeni bakım görevi oluştur.

### PATCH /maintenance/:id
Bakım görevi güncelle.

### DELETE /maintenance/:id
Bakım görevi sil.

## Sezon Fiyatları

### GET /seasonal-rates
Tüm sezon fiyatlarını listele.

### POST /seasonal-rates
Yeni sezon fiyatı oluştur.

### PATCH /seasonal-rates/:id
Sezon fiyatı güncelle.

### DELETE /seasonal-rates/:id
Sezon fiyatı sil.

## Dashboard

### GET /dashboard/stats
Kamp alanı istatistikleri (doluluk, gelir, döngü dağılımı).
