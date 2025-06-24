export default function WeatherWidget({ config }: { config: any }) {
  return (
    <div className="p-4 border rounded">
      <p>Location: <strong>{config.location || 'Not set'}</strong></p>
    </div>
  );
}
