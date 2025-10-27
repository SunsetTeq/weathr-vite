import { useAppSelector } from '@slices/handlers/useAppSelector';

export const MainCard = ({ date, temp }: { date: string; temp: string }) => {
  const selectedCity = useAppSelector((state) => state.settings.selectedCity);

  return (
    <div className="flex text-white">
      <div className="flex flex-1 flex-col gap-2">
        <p className="text-3xl">
          <span>{selectedCity?.name}</span>,{' '}
          <span>{selectedCity?.country}</span>
        </p>
        <p>{date}</p>
      </div>
      <div className="flex gap-2">
        <p className="text-6xl">{temp}</p>
      </div>
    </div>
  );
};
