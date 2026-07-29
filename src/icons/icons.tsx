/* The icon grammar (canvas F): 16px grid, 1.5 stroke, square caps, miter
   joins, fill none. Every icon is a component on these rules — no icon
   font, no external set. */

function Svg({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className={className}
      width={16}
      height={16}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      {children}
    </svg>
  );
}

export function SearchIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <circle cx="6.75" cy="6.75" r="4.25" />
      <path d="M9.9 9.9 L14 14" />
    </Svg>
  );
}

export function DotsIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <circle cx="3" cy="8" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="8" cy="8" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="13" cy="8" r="1.1" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function CloseIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M3.5 3.5 L12.5 12.5 M12.5 3.5 L3.5 12.5" />
    </Svg>
  );
}
