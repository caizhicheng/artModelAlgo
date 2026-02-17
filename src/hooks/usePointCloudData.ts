import { useEffect, useMemo, useState } from 'react';

type UsePointCloudDataResult = {
  loading: boolean;
  error: string;
  points: number[][];
  positions: Float32Array;
};

function isValidPoint(point: number[]): point is [number, number, number] {
  return (
    point.length >= 3 &&
    Number.isFinite(point[0]) &&
    Number.isFinite(point[1]) &&
    Number.isFinite(point[2])
  );
}

export function usePointCloudData(): UsePointCloudDataResult {
  const [points, setPoints] = useState<number[][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadPointCloud() {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('/api/pointcloud', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('Invalid point cloud payload');
        }

        const sanitizedPoints = data
          .filter((item): item is number[] => Array.isArray(item))
          .filter(isValidPoint)
          .map((point) => [point[0], point[1], point[2]]);

        setPoints(sanitizedPoints);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError('Failed to load point cloud data.');
      } finally {
        setLoading(false);
      }
    }

    loadPointCloud();

    return () => {
      controller.abort();
    };
  }, []);

  const positions = useMemo(() => {
    const typedArray = new Float32Array(points.length * 3);

    points.forEach((point, index) => {
      const offset = index * 3;
      typedArray[offset] = point[0];
      typedArray[offset + 1] = point[1];
      typedArray[offset + 2] = point[2];
    });

    return typedArray;
  }, [points]);

  return { loading, error, points, positions };
}
