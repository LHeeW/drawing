import { create } from "zustand";
import type { Components } from "../types/loadData.types";

interface DrawingState {
  selectedDisciplines: string[];
  revisionIndices: Record<string, number>;
  toggleDiscipline: (
    dis: string,
    currentDrawing: Components["Drawing"]
  ) => void;
  setRevisionIndices: (dis: string, index: number) => void;
  reset: () => void;
}

export const useDrawingStore = create<DrawingState>((set) => ({
  selectedDisciplines: [],
  revisionIndices: {},

  toggleDiscipline: (dis, currentDrawing) => {
    set((state) => {
      const isSelected = state.selectedDisciplines.includes(dis);
      if (!isSelected) {
        const discipline = currentDrawing.disciplines?.[dis];
        let maxIdx = 0;
        if (discipline?.revisions) {
          maxIdx = discipline.revisions.length - 1;
        } else if (discipline?.regions) {
          const regions = Object.values(discipline.regions);
          if (regions.length > 0) {
            maxIdx = (regions[0].revisions?.length || 1) - 1;
          }
        }
        return {
          selectedDisciplines: [...state.selectedDisciplines, dis],
          revisionIndices: { ...state.revisionIndices, [dis]: maxIdx },
        };
      }
      return {
        selectedDisciplines: state.selectedDisciplines.filter((d) => d !== dis),
      };
    });
  },

  setRevisionIndices: (dis, index) =>
    set((state) => ({
      revisionIndices: { ...state.revisionIndices, [dis]: index },
    })),

  reset: () => set({ selectedDisciplines: [], revisionIndices: {} }),
}));
