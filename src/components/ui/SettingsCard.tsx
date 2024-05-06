export function SettingsCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="ml-2 w-full rounded-2xl border border-gray-300 p-4 shadow-md duration-300 hover:shadow-xl">
      {children}
    </div>
  );
}
