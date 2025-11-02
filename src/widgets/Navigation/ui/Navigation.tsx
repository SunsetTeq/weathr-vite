import Logo from '@assets/icons/logo.svg?react';
import SettingsIcon from '@assets/icons/icon-units.svg?react';
import DropdownIcon from '@assets/icons/icon-dropdown.svg?react';

export const Navigation = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex min-w-0">
        <div className="flex-1">
          <Logo />
        </div>
        <button className="btn btn-base-200 rounded-[10px]">
          <SettingsIcon />
          <span className="text-paragraph-style text-primary-content pl-1">
            Units
          </span>
          <DropdownIcon />
        </button>
      </div>
      <h1 className="text-heading1 flex justify-center">
        How's the sky looking today?
      </h1>
    </div>
  );
};
