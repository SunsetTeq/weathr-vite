import { SearchCity } from '@widgets/SearchCity';
import { WeatherCurrentDay } from '@ui/WeatherCurrentDay';

export function App() {
  return (
    <div className="flex flex-col items-center justify-center">
      <SearchCity />
      <WeatherCurrentDay />
    </div>
  );
}
export default App;
