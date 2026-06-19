import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(date));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `%${value}`;
}

export function formatWeightKg(value: number): string {
  return `${value.toFixed(1)} kg`;
}

const HIVE_STATUS: Record<string, string> = {
  active: 'Aktif',
  queenless: 'Anasız',
  swarm_risk: 'Oğul Riski',
  wintering: 'Kışlama',
  inactive: 'Pasif',
};

export function formatHiveStatus(status: string): string {
  return HIVE_STATUS[status] || status;
}

const HARVEST_STATUS: Record<string, string> = {
  planned: 'Planlandı',
  extracted: 'Süzüldü',
  stored: 'Depoda',
  sold: 'Satıldı',
};

export function formatHarvestStatus(status: string): string {
  return HARVEST_STATUS[status] || status;
}

const INSPECTION_STATUS: Record<string, string> = {
  scheduled: 'Planlandı',
  completed: 'Tamamlandı',
  follow_up: 'Takip Gerekli',
  cancelled: 'İptal',
};

export function formatInspectionStatus(status: string): string {
  return INSPECTION_STATUS[status] || status;
}

const TREATMENT_STATUS: Record<string, string> = {
  scheduled: 'Planlandı',
  in_progress: 'Devam Ediyor',
  completed: 'Tamamlandı',
  overdue: 'Gecikmiş',
};

export function formatTreatmentStatus(status: string): string {
  return TREATMENT_STATUS[status] || status;
}

const BROOD_PATTERN: Record<string, string> = {
  excellent: 'Mükemmel',
  good: 'İyi',
  fair: 'Orta',
  poor: 'Zayıf',
};

export function formatBroodPattern(value: string): string {
  return BROOD_PATTERN[value] || value;
}

const TEMPERAMENT: Record<string, string> = {
  calm: 'Sakin',
  moderate: 'Orta',
  aggressive: 'Agresif',
};

export function formatTemperament(value: string): string {
  return TEMPERAMENT[value] || value;
}

const HONEY_VARIETY_STATUS: Record<string, string> = {
  active: 'Aktif',
  seasonal: 'Mevsimlik',
  discontinued: 'Durduruldu',
};

export function formatHoneyVarietyStatus(status: string): string {
  return HONEY_VARIETY_STATUS[status] || status;
}
