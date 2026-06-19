'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Hexagon,
  LayoutDashboard,
  ClipboardCheck,
  Droplets,
  FlaskConical,
  Flower2,
  Sun,
  Moon,
  LogOut,
  Settings,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/dashboard', label: 'Panel', icon: LayoutDashboard },
  { href: '/hives', label: 'Kovanlar', icon: Hexagon },
  { href: '/harvests', label: 'Hasatlar', icon: Droplets },
  { href: '/inspections', label: 'Kontroller', icon: ClipboardCheck },
  { href: '/treatments', label: 'Tedaviler', icon: FlaskConical },
  { href: '/honey-varieties', label: 'Bal Çeşitleri', icon: Flower2 },
  { href: '/settings', label: 'Ayarlar', icon: Settings },
];

export function IconRailNav() {
  const pathname = usePathname();
  const { apiary, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-[4.5rem] flex-col border-r border-border bg-secondary text-secondary-foreground lg:w-56">
      <div className="flex h-16 items-center justify-center border-b border-border/60 px-3 lg:justify-start lg:px-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber text-primary-foreground shadow-sm">
            <Hexagon className="h-5 w-5" />
          </div>
          <div className="hidden lg:block">
            <p className="font-display text-sm font-semibold leading-tight text-wax">HivePulse</p>
            <p className="truncate text-xs text-wax/60">{apiary?.name}</p>
          </div>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-2" aria-label="Ana menü">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-amber text-primary-foreground shadow-sm'
                  : 'text-wax/70 hover:bg-wax/10 hover:text-wax',
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="hidden lg:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border/60 p-2">
        {user && (
          <p className="mb-2 hidden truncate px-3 text-xs text-wax/60 lg:block">
            {user.firstName} {user.lastName}
          </p>
        )}
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="justify-start text-wax/70 hover:bg-wax/10 hover:text-wax"
            aria-label="Tema değiştir"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <span className="hidden lg:inline">Tema</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="justify-start text-wax/70 hover:bg-destructive/20 hover:text-destructive-foreground"
            aria-label="Çıkış yap"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden lg:inline">Çıkış</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
