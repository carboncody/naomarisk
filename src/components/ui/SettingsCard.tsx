export function SettingsCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-Zinc-300 ml-2 w-full rounded-2xl border p-4 shadow-md duration-300 hover:shadow-xl">
      {children}
    </div>
  );
}
