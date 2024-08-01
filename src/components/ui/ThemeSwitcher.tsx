'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Switch } from './switch';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem('theme') === 'dark') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [setTheme]);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <Switch
        id="airplane-mode"
        // checked={theme === 'dark'}
        onCheckedChange={() => {
          console.log('theme', theme);
          setTheme(theme === 'light' ? 'dark' : 'light');
          localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
        }}
      />
    </div>
  );
}
