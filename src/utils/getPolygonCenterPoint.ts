import type { Components } from "../types/loadData.types";

export const getPolygonCenterPoint = (vertices: Components["Vertex"][]) => {
  const x = vertices.map((vertex) => vertex[0]);
  const y = vertices.map((vertex) => vertex[1]);

  const minX = Math.min(...x);
  const maxX = Math.max(...x);
  const minY = Math.min(...y);
  const maxY = Math.max(...y);

  return {
    x: (minX + maxX) / 2,
    y: (minY + maxY) / 2,
  };
};
