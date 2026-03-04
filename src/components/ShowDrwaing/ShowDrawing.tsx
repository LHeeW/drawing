import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import styles from "./ShowDrawing.module.css";
import { useImageSize } from "../../hooks/useImageSize";
import { getDrawingImage } from "../../utils/getDrawingImage";

interface Props {
  image: string;
  children?: React.ReactNode;
}

export default function ShowDrawing({ image, children }: Props) {
  const { width, height } = useImageSize(getDrawingImage(image));

  return (
    <div className={styles.container}>
      <TransformWrapper
        centerOnInit
        initialScale={0.1}
        minScale={0.1}
        maxScale={10}
        limitToBounds={false}
      >
        <TransformComponent
          wrapperStyle={{ width: "100%", height: "100%" }}
          contentStyle={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={getDrawingImage(image)} alt="도면" className={styles.img} />
          <svg viewBox={`0 0 ${width} ${height}`} className={styles.svg}>
            {width && children}
          </svg>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
