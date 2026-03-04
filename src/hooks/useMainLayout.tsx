import { useEffect } from "react";
import { useGetDrawingsQuery } from "../queries/useDrawingQuery";
import { useNavigate, useParams } from "react-router-dom";
import { useDrawingStore } from "../stores/useDrawingStore";

export const useMainLayout = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetDrawingsQuery();
  const reset = useDrawingStore((state) => state.reset);
  const navigate = useNavigate();
  const isValidId = data?.drawings && id ? !!data.drawings[id] : true;

  useEffect(() => {
    if (!data || isLoading || isError) return;

    if (id && !data.drawings[id]) {
      alert("존재하지 않는 도면입니다.");
      navigate("/", { replace: true });
    }

    if (id === "00") navigate("/", { replace: true });

    reset();
  }, [id, data, navigate, isLoading, isError, reset]);

  return { id, isLoading, isValidId };
};
