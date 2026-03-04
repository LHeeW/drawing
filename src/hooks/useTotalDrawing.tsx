import { useNavigate } from "react-router-dom";
import { useGetDrawingsQuery } from "../queries/useDrawingQuery";

export const useTotalDrawing = () => {
  const { data, isLoading, isError } = useGetDrawingsQuery();
  const navigator = useNavigate();

  const image = data && data.drawings["00"].image;
  const polygons =
    data &&
    Object.values(data.drawings).filter(
      (it) => it.parent === "00" && it.position
    );

  const handleClick = (id: string) => {
    navigator(`/drawing/${id}`);
  };

  return { image, polygons, isLoading, isError, handleClick };
};
