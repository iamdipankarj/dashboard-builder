export function WeatherWidget({ config }: { config: any }) {
  return (
    <div className="p-4 border rounded">
      <h2 className="font-bold text-lg">Weather Widget</h2>
      <p>Location: {config.location || 'Not set'}</p>
    </div>
  );
}
