import { useGetDrawingsQuery } from "../../queries/useDrawingQuery";
import Checkbox from "./components/Checkbox";
import styles from "./CustomNavigation.module.css";

export default function CustomNavigation({ id = "00" }: { id?: string }) {
  const { data, isLoading, isError } = useGetDrawingsQuery();

  if (isError || !data) return <div>데이터를 불러오지 못했습니다.</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <nav className={styles.nav_container}>
      <div className={styles.title_container}>
        <span className={styles.title}>{data.project.name}</span>
        <span className={styles.drawing_name}>{data.drawings[id].name}</span>
      </div>
      <Checkbox />
    </nav>
  );
}
