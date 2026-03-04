import ShowDrawing from "../../../components/ShowDrwaing/ShowDrawing";
import { useTotalDrawing } from "../../../hooks/useTotalDrawing";
import { getPolygonCenterPoint } from "../../../utils/getPolygonCenterPoint";
import styles from "./TotalDrawing.module.css";

export default function TotalDrawing() {
  const { image, polygons, isLoading, isError, handleClick } =
    useTotalDrawing();

  if (isError) return <div>Error...</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <ShowDrawing image={image!}>
      {polygons &&
        polygons.map((polygon) => {
          const centerPoint = getPolygonCenterPoint(polygon.position!.vertices);
          const points = polygon
            .position!.vertices.map((vertex) => vertex.join(","))
            .join(" ");

          return (
            <g key={polygon.id}>
              <polygon
                points={points}
                className={styles.polygon}
                onClick={() => handleClick(polygon.id)}
              />
              <text x={centerPoint.x} y={centerPoint.y} className={styles.text}>
                {polygon.name}
              </text>
            </g>
          );
        })}
    </ShowDrawing>
  );
}
