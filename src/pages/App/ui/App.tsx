import { SearchCity } from '@widgets/SearchCity';
import { WeatherCurrentDay } from '@ui/WeatherCurrentDay';

export function App() {
  return (
    <div className="flex w-full flex-col p-8 xl:px-30">
      <SearchCity />
      <WeatherCurrentDay />
    </div>
  );
}
export default App;
