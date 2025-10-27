import { SearchCity } from '@widgets/SearchCity';
import { WeatherInCity } from '@widgets/WeatherInCity';

export function App() {
  return (
    <div className="flex flex-col items-center justify-center">
      <SearchCity />
      <WeatherInCity />
    </div>
  );
}
export default App;
