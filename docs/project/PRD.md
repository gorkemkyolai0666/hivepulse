# Ürün Gereksinimleri Dokümanı (PRD)

## Ürün: HivePulse

**Versiyon:** 1.0 MVP  
**Durum:** MVP tamamlandı — repo sağlama bekliyor  
**Son Güncelleme:** 2026-06-18

## Problem

Ticari arıcılar kovan envanterini, periyodik kontrolleri, bal hasatlarını ve varroa tedavilerini Excel ve kağıt formlarla yönetiyor. Mevsimsel operasyonlar dağınık kayıtlarda kayboluyor; oğul riski ve gecikmiş tedaviler geç fark ediliyor.

## Çözüm

HivePulse, ticari arılıklar için kovan, kontrol, hasat, tedavi ve bal çeşidi operasyonlarını tek platformda birleştirir.

## Hedef Kullanıcılar

- **Birincil:** 20–100 kovan kapasiteli ticari arıcılar (Türkiye, Karadeniz/Ege)
- **İkincil:** Arıcılık kooperatifleri ve bal üreticileri
- **Arayüz dili:** Türkçe

## Tasarım Yönü

**Organik Veri Yoğun** — Sol ikon rayı navigasyon, bal amberi (#D4A017) + orman yeşili (#2D5016) paleti, Fraunces + Source Sans 3 tipografi, veri tabloları odaklı kompozisyon.

## Temel Özellikler (MVP)

1. Kovan envanteri (numara, konum, ana yaşı, durum)
2. Kovan kontrolleri (yavru deseni, mizaç, bal deposu)
3. Bal hasat partileri (ağırlık, çiçek kaynağı, durum)
4. Tedavi planları (varroa, besleme, vb.)
5. Bal çeşitleri kataloğu (kg fiyat, nem oranı)
6. Arılık paneli (aktivite oranı, konum dağılımı, trend)

## İş Modeli

B2B SaaS — kovan başına aylık abonelik (₺8–15/kovan/ay)

## Benzersizlik

HarvestGuard (tahıl silosu) ve diğer legacy projelerden farklı: sektör arıcılık, iş akışı mevsimsel kovan operasyonu, değer önerisi bal üretim verimliliği.
