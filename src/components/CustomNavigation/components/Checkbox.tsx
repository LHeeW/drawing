import { useCheckbox } from "../../../hooks/useCheckbox";
import styles from "./Checkbox.module.css";

export default function Checkbox() {
  const {
    availableDisciplines,
    isSelected,
    isLoading,
    isError,
    handleChange,
    selectedDisciplines,
  } = useCheckbox();

  if (isError) return <div>Error...</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className={styles.container}>
      {availableDisciplines.map((it) => (
        <label key={it} className={`${styles.label_unclick} ${isSelected(it)}`}>
          <input
            type="checkbox"
            checked={selectedDisciplines.includes(it)}
            onChange={() => handleChange(it)}
            hidden
          />
          {it}
        </label>
      ))}
    </div>
  );
}
