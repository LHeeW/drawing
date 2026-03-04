import { useParams } from "react-router-dom";
import { useDrawingStore } from "../../stores/useDrawingStore";
import ShowDrawing from "../../components/ShowDrwaing/ShowDrawing";
import { useGetDrawingsQuery } from "../../queries/useDrawingQuery";
import RevisionLayer from "../../components/RevisionLayer/RevisionLayer";
import SideBar from "./components/SideBar";

export default function DetailPage() {
  const { id } = useParams();
  const { selectedDisciplines, revisionIndices } = useDrawingStore();
  const { data } = useGetDrawingsQuery();
  const currentDrawing = id && data?.drawings[id];
  const image = currentDrawing ? currentDrawing.image : "";

  return (
    <>
      <ShowDrawing image={image}>
        {selectedDisciplines.map((dis) => {
          const discipline =
            currentDrawing && currentDrawing.disciplines?.[dis];
          if (!discipline) return null;

          if (discipline.revisions) {
            const revIdx =
              revisionIndices[dis] ?? discipline.revisions.length - 1;
            const rev = discipline.revisions[revIdx];
            return (
              rev && (
                <RevisionLayer
                  key={rev.image}
                  revision={rev}
                  disciplineTransform={discipline.imageTransform}
                />
              )
            );
          }
          if (discipline.regions) {
            return Object.entries(discipline.regions).map(
              ([regionId, region]) => {
                const revIdx =
                  revisionIndices[dis] ?? region.revisions.length - 1;
                const rev = region.revisions[revIdx];

                return (
                  rev && (
                    <RevisionLayer
                      key={regionId + rev.image}
                      revision={rev}
                      disciplineTransform={discipline.imageTransform}
                    />
                  )
                );
              }
            );
          }
          return null;
        })}
      </ShowDrawing>
      <SideBar />
    </>
  );
}
