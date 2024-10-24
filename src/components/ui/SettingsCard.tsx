export function SettingsCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="ml-2 w-full rounded-2xl border p-4  shadow-md duration-300 hover:shadow-xl dark:border-transparent dark:bg-zinc-800">
      {children}
    </div>
  );
}
