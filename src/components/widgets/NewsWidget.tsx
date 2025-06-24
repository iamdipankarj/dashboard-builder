export default function NewsWidget({ config }: { config: any }) {
  return (
    <div className="p-4 border rounded">
      <h2 className="font-bold text-lg">News Widget</h2>
      <p>Latest News: {config.source || 'Not set'}</p>
    </div>
  );
}
