import { useParams } from "react-router-dom";
import { useGetDrawingsQuery } from "../../../queries/useDrawingQuery";
import { useDrawingStore } from "../../../stores/useDrawingStore";
import styles from "./SideBar.module.css";

export default function SideBar() {
  const { id } = useParams();
  const { data } = useGetDrawingsQuery();
  const { revisionIndices, selectedDisciplines, setRevisionIndices } =
    useDrawingStore();

  if (!id || !data || !data.drawings[id]) return null;

  const currentDrawing = data.drawings[id];

  return (
    <>
      {selectedDisciplines.length > 0 && (
        <div className={styles.container}>
          {selectedDisciplines.map((dis) => {
            const discipline = currentDrawing.disciplines?.[dis];
            if (!discipline) return null;

            const currentIdx = revisionIndices[dis] ?? 0;
            let totalRevs = 0;
            let currentVersion = "";
            let changes: string[] = [];

            if (discipline.revisions) {
              totalRevs = discipline.revisions.length;
              const rev = discipline.revisions[currentIdx];
              currentVersion = rev?.version || "";
              changes = rev?.changes || [];
            } else if (discipline.regions) {
              const regions = Object.values(discipline.regions);
              totalRevs = Math.min(
                ...regions.map((r) => r.revisions?.length || 0)
              );
              const allChanges = regions.flatMap(
                (r) => r.revisions[currentIdx]?.changes || []
              );
              changes = Array.from(new Set(allChanges));
              currentVersion = regions[0]?.revisions[currentIdx]?.version || "";
            }

            return (
              <div key={dis} className={styles.discipline_wrapper}>
                <div className={styles.control_row}>
                  <span className={styles.discipline_name}>{dis}</span>
                  <input
                    type="range"
                    min="0"
                    max={Math.max(0, totalRevs - 1)}
                    step="1"
                    className={styles.range_input}
                    value={currentIdx}
                    onChange={(e) =>
                      setRevisionIndices(dis, parseInt(e.target.value))
                    }
                  />
                  <span className={styles.version_tag}>{currentVersion}</span>
                </div>

                {changes.length > 0 && (
                  <div className={styles.changes_box}>
                    <ul className={styles.changes_list}>
                      {changes.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
