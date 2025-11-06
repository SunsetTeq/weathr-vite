import { useAppSelector } from '@slices/handlers/useAppSelector';
import { getIconByWeatherCode } from '@utils/getIconByWeatherCode';

export const MainCard = ({
  date,
  temp,
  code,
}: {
  date: string;
  temp: string;
  code?: number;
}) => {
  const selectedCity = useAppSelector((state) => state.settings.selectedCity);

  return (
    <div
      className={`flex h-[286px] flex-col items-center justify-center gap-8 rounded-[20px] bg-[url(@assets/img/bg-today-small.svg)] bg-cover bg-no-repeat px-6 text-center text-white sm:bg-[url(@assets/img/bg-today-large.svg)] md:flex-row md:gap-0 md:text-left lg:min-w-[800px]`}
    >
      <div className="flex flex-col justify-center gap-2 md:flex-1">
        <p className="text-heading2-style">
          <span>{selectedCity?.name}</span>,{' '}
          <span>{selectedCity?.country}</span>
        </p>
        <p className="text-paragraph-style">{date}</p>
      </div>
      <div className="flex items-center gap-6">
        <img src={getIconByWeatherCode(code)} alt="" width={90} height={90} />
        <p className="font-dmsans text-8xl font-medium italic">{temp}°</p>
      </div>
    </div>
  );
};
