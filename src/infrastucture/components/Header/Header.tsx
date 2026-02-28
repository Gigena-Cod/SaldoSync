
import ProfilePopover from '../ProfilePopover/ProfilePopover';

export default function Header() {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-2"></div>

      <div className="flex items-center gap-4">
      

        {/* Profile Popover */}
        <ProfilePopover />
      </div>
    </header>
  );
}
