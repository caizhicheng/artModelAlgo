import type { IncomingMessage, ServerResponse } from 'node:http';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function createMockPointCloud(total = 1200): number[][] {
  const points: number[][] = [];

  for (let i = 0; i < total; i += 1) {
    const angle = (i / total) * Math.PI * 12;
    const radius = 6 + (i % 60) * 0.08;
    const x = Number((Math.cos(angle) * radius).toFixed(4));
    const y = Number((((i - total / 2) / 20) + Math.sin(angle * 0.5)).toFixed(4));
    const z = Number((Math.sin(angle) * radius).toFixed(4));
    points.push([x, y, z]);
  }

  return points;
}

function sendJson(res: ServerResponse, payload: unknown) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function pointCloudMockPlugin(): Plugin {
  return {
    name: 'pointcloud-mock-endpoint',
    configureServer(server) {
      server.middlewares.use((req: IncomingMessage, res: ServerResponse, next) => {
        if (req.method === 'GET' && req.url === '/api/pointcloud') {
          sendJson(res, createMockPointCloud());
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), pointCloudMockPlugin()],
});
