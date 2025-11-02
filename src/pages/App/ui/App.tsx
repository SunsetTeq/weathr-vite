import { SearchCity } from '@widgets/SearchCity';
import { WeatherCurrentDay } from '@ui/WeatherCurrentDay';

export function App() {
  return (
    <div className="flex w-full flex-col gap-2 pb-5">
      <SearchCity />
      <WeatherCurrentDay />
    </div>
  );
}
export default App;
