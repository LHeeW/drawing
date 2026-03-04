import { useNavigate } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  const navigator = useNavigate();
  const handleClick = () => navigator("/", { replace: true });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - NOT FOUND</h1>
      <button className={styles.btn} onClick={handleClick}>
        돌아가기
      </button>
    </div>
  );
}
