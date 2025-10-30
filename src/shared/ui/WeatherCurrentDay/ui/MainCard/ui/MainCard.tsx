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
      className={`flex h-[286px] min-w-[800px] rounded-[20px] bg-[url(@assets/img/bg-today-large.svg)] bg-contain bg-no-repeat px-6 text-white`}
    >
      <div className="flex flex-1 flex-col justify-center gap-2">
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
