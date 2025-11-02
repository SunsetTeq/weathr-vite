import { formatDay } from '@utils/formatDate';
import { getIconByWeatherCode } from '@utils/getIconByWeatherCode';

type ElProps = {
  date?: string;
  tMax?: number;
  tMin?: number;
  code?: number;
};

interface CardProps {
  data: ElProps;
}

export const Card = ({ data }: CardProps) => {
  return (
    <div className="bg-base-200 flex min-w-[100px] flex-1 flex-col items-center justify-center gap-4 rounded-[20px] p-4">
      <p className="text-paragraph-style text-primary-content">
        {formatDay(data.date ?? '')}
      </p>
      <img
        src={getIconByWeatherCode(data.code)}
        alt=""
        width={50}
        height={50}
      />
      <p className="text-paragraph-style flex w-full">
        <span className="text-primary-content flex-1">
          {String(Math.round(Number(data.tMax))) + '°'}
        </span>
        <span>{String(Math.round(Number(data.tMin))) + '°'}</span>
      </p>
    </div>
  );
};
