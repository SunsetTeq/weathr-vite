import { type Ref } from 'react';

interface Props {
  inputRef: Ref<HTMLInputElement>;
  value: string;
  onChange: (v: string) => void;
  onEnter: () => void;
  onEscape: () => void;
  dropdownOpen: boolean;
  dropdownId: string;
}

export function SearchField({
  inputRef,
  value,
  onChange,
  onEnter,
  onEscape,
  dropdownOpen,
  dropdownId,
}: Props) {
  return (
    <label className="bg-base-200 input flex w-full items-center gap-2 rounded-[10px] border-none">
      {/* icon */}
      <svg
        className="h-[1em] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </g>
      </svg>

      <input
        ref={inputRef}
        type="search"
        className="grow"
        placeholder="Search for a place..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onEnter();
          if (e.key === 'Escape') onEscape();
        }}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={dropdownOpen}
        aria-controls={dropdownId}
      />
    </label>
  );
}
