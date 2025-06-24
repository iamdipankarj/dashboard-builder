export default function NewsWidget({ config }: { config: any }) {
  return (
    <div className="p-4 border rounded">
      <p>Latest News: <strong>{config.source || 'Not set'}</strong></p>
    </div>
  );
}
