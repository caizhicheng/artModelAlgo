import PointCloudViewer from '../components/PointCloudViewer';
import { usePointCloudData } from '../hooks/usePointCloudData';

function PointCloudPage() {
  const { loading, error, points, positions } = usePointCloudData();

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Point Cloud</h2>
      <p className="text-sm text-slate-600">
        Data source: <code className="rounded bg-slate-100 px-1 py-0.5">/api/pointcloud</code> (response type:
        <code className="rounded bg-slate-100 px-1 py-0.5">number[][]</code>)
      </p>

      {loading && <p className="text-slate-600">Loading point cloud data...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && points.length === 0 && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-700">
          No valid point cloud points were returned by the API.
        </p>
      )}

      {!loading && !error && points.length > 0 && (
        <>
          <p className="text-sm text-slate-600">Loaded {points.length} points.</p>
          <PointCloudViewer positions={positions} />
        </>
      )}
    </section>
  );
}

export default PointCloudPage;
