import { useParams } from "react-router-dom";
import { useGetDrawingsQuery } from "../queries/useDrawingQuery";
import { useDrawingStore } from "../stores/useDrawingStore";
import styles from "../components/CustomNavigation/components/Checkbox.module.css";

export const useCheckbox = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetDrawingsQuery();
  const { selectedDisciplines, toggleDiscipline } = useDrawingStore();

  const currentDrawing = data && id && data.drawings[id];
  const disciplines = (currentDrawing && currentDrawing?.disciplines) || {};
  const availableDisciplines = Object.keys(disciplines);

  const isSelected = (dis: string) => {
    const selected = selectedDisciplines.includes(dis);
    const className = selected && styles.label_click;
    return className;
  };

  const handleChange = (dis: string) => {
    if (currentDrawing) {
      toggleDiscipline(dis, currentDrawing);
    }
  };

  return {
    availableDisciplines,
    isSelected,
    isLoading,
    isError,
    currentDrawing,
    selectedDisciplines,
    handleChange,
  };
};
