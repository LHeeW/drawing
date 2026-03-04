import type { Components } from "../../types/loadData.types";
import { getDrawingImage } from "../../utils/getDrawingImage";
import styles from "./RevisionLayer.module.css";

interface Props {
  revision: Components["Revision"];
  disciplineTransform?: Components["TransForm"];
}

export default function RevisionLayer({
  revision,
  disciplineTransform,
}: Props) {
  const trans = revision.imageTransform ||
    disciplineTransform || { x: 0, y: 0, scale: 1, rotation: 0 };

  const rotation_deg = (trans.rotation * 180) / Math.PI;

  return (
    <image
      href={getDrawingImage(revision.image)}
      transform={`translate(${trans.x}, ${trans.y}) rotate(${rotation_deg}) scale(${trans.scale})`}
      className={styles.drawing_image}
    />
  );
}
