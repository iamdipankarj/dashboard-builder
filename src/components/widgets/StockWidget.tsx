export default function StocksWidget({ config }: { config: any }) {
  return (
    <div className="p-4 border rounded">
      <p>Symbol: <strong>{config.symbol || 'Not set'}</strong></p>
    </div>
  );
}
