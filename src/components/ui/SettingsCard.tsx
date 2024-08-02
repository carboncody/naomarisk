export function SettingsCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-Zinc-300 ml-2 w-full rounded-2xl border bg-zinc-200 p-4 shadow-md duration-300 hover:shadow-xl dark:bg-zinc-700">
      {children}
    </div>
  );
}
