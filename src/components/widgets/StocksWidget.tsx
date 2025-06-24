export function StocksWidget({ config }: { config: any }) {
  return (
    <div className="p-4 border rounded">
      <h2 className="font-bold text-lg">Stocks Widget</h2>
      <p>Symbol: {config.symbol || 'Not set'}</p>
    </div>
  );
}
