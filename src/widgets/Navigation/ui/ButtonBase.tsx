import type { ReactNode } from 'react';
import IconCheck from '@assets/icons/icon-checkmark.svg?react';

export const OptionButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) => {
  const base =
    'btn btn-base-200 shadow-none flex w-full items-center justify-between rounded-[10px] px-3 py-2 text-paragraph-style transition';
  const activeCls = 'bg-base-300 text-primary';
  const idleCls = 'hover:bg-base-300';

  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={active}
      className={`${base} ${active ? activeCls : idleCls}`}
      onClick={onClick}
    >
      <span className="text-primary-content text-paragraph-style">
        {children}
      </span>
      <span className={`${active ? 'opacity-100' : 'opacity-0'}`}>
        <IconCheck />
      </span>
    </button>
  );
};
