interface MobileNavProps {
  isOpen: boolean;
  renderLinks: () => React.ReactNode;
}

export function MobileNav({ isOpen, renderLinks }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden border-b border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-4 flex flex-col gap-2 transition-all duration-200 animate-fade-in z-30 sticky top-16">
      {renderLinks()}
    </div>
  );
}
