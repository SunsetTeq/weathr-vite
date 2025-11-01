import type { GeoSearchApiResponse } from '@type/geocodingTypes';

type Results = NonNullable<GeoSearchApiResponse['results']>;
type Item = Results[number];

interface Props {
  id: string;
  results: Results;
  loading: boolean;
  onPick: (r: Item) => void;
}

export function GeoDropdown({ id, results, loading, onPick }: Props) {
  return (
    <div
      id={id}
      className="bg-base-200 absolute top-full right-0 left-0 z-50 mt-4 max-h-72 overflow-auto rounded-[10px] p-2 shadow-lg"
      role="listbox"
    >
      {loading && <div className="opacity-70">Searching</div>}
      {!loading && results.length === 0 && (
        <div className="opacity-70">No results</div>
      )}

      <ul className="w-full space-y-1">
        {results.map((r) => (
          <li key={`${r.id ?? r.name}-${r.latitude}-${r.longitude}`}>
            <button
              role="option"
              className="btn btn-base-200 hover:bg-neutral w-full justify-start rounded-[10px] shadow-none"
              onClick={() => onPick(r)}
            >
              {r.name}
              {r.admin1 ? `, ${r.admin1}` : ''} {r.country_code ?? ''}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
