import { formatHour } from '@utils/formatDate';
import { getIconByWeatherCode } from '@utils/getIconByWeatherCode';

type ElProps = {
  date?: string;
  temp?: number;
  code?: number;
};

interface CardProps {
  data: ElProps;
}

export const Card = ({ data }: CardProps) => {
  return (
    <div className="bg-neutral flex w-full flex-1 items-center justify-center gap-4 rounded-[20px] p-4">
      <img
        src={getIconByWeatherCode(data.code)}
        alt=""
        width={35}
        height={35}
      />
      <p className="text-paragraph-style text-primary-content flex-1">
        {formatHour(data.date ?? '')}
      </p>
      <span className="text-paragraph-style text-primary-content">
        {String(Math.round(Number(data.temp))) + '°'}
      </span>
    </div>
  );
};
