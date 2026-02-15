import { useEffect, useRef } from 'react';

type PointCloudViewerProps = {
  positions: Float32Array;
};

type OrbitControlsInstance = {
  enableDamping: boolean;
  target: { set: (x: number, y: number, z: number) => void };
  update: () => void;
  dispose: () => void;
};

function PointCloudViewer({ positions }: PointCloudViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !window.THREE || !window.OrbitControls) return;

    const THREE = window.THREE;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f8fafc');

    const width = container.clientWidth;
    const height = Math.max(container.clientHeight, 320);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 5000);
    camera.position.set(25, 25, 25);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const controls = new window.OrbitControls(camera, renderer.domElement) as OrbitControlsInstance;
    controls.enableDamping = true;

    const gridHelper = new THREE.GridHelper(40, 20, 0x94a3b8, 0xcbd5e1);
    scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: '#2563eb',
      size: 0.35,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    geometry.computeBoundingSphere();
    const radius = geometry.boundingSphere?.radius ?? 10;
    const safeRadius = Number.isFinite(radius) && radius > 0 ? radius : 10;
    controls.target.set(0, 0, 0);
    camera.position.set(safeRadius * 1.8, safeRadius * 1.8, safeRadius * 1.8);
    camera.lookAt(0, 0, 0);

    let animationFrameId = 0;

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const nextWidth = container.clientWidth;
      const nextHeight = Math.max(container.clientHeight, 320);
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrameId);

      controls.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [positions]);

  return <div ref={containerRef} className="h-[420px] w-full overflow-hidden rounded-xl border border-slate-200" />;
}

export default PointCloudViewer;
