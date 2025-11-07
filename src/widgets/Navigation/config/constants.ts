export const SettingsList = [
  {
    name: 'Temperature',
    options: [
      { label: 'Celsius (°C)', value: 'celsius' },
      { label: 'Fahrenheit (°F)', value: 'fahrenheit' },
    ],
  },
  {
    name: 'Wind Speed',
    options: [
      { label: 'km/h', value: 'kmh' },
      { label: 'mph', value: 'mph' },
    ],
  },
  {
    name: 'Precipitation',
    options: [
      { label: 'Millimeters (mm)', value: 'mm' },
      { label: 'Inches (in)', value: 'inch' },
    ],
  },
];

export type SectionName = 'Temperature' | 'Wind Speed' | 'Precipitation';
