'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

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
    <div
      onClick={() => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
      }}
      className="cursor-pointer"
    >
      {theme === 'light' ? (
        <FaMoon className="text-2xl text-gray-800" />
      ) : (
        <FaSun className="text-2xl text-yellow-500" />
      )}
    </div>
  );
}
