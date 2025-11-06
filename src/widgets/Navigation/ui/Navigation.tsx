import Logo from '@assets/icons/logo.svg?react';
import { UnitsButton } from './UnitsButton';

export const Navigation = () => {
  return (
    <div className="flex flex-col justify-center gap-8 pb-6 md:p-0">
      <div className="flex min-w-0">
        <div className="flex flex-1 items-center">
          <Logo className="h-[27px] w-[132px] md:h-10 md:w-[197px]" />
        </div>

        <UnitsButton />
      </div>

      <h1 className="text-heading1 flex justify-center text-center md:text-start">
        How's the sky looking today?
      </h1>
    </div>
  );
};
