export interface Components {
  Vertex: [number, number];

  ProjectComponents: {
    project: {
      name: string;
      unit: "px";
    };
    disciplines: { name: string }[];
    drawings: Record<string, Components["Drawing"]>;
  };

  Drawing: {
    id: string;
    name: string;
    image: string;
    parent: string | null;
    position: Components["Position"] | null;
    disciplines?: Partial<Record<string, Components["Disciplines"]>>;
  };

  Position: {
    vertices: Components["Vertex"][];
    imageTransform: Components["TransForm"];
  };

  TransForm: {
    relativeTo?: string;
    x: number;
    y: number;
    scale: number;
    rotation: number;
  };

  Polygon: {
    vertices: Components["Vertex"][];
    polygonTransform: Components["TransForm"];
  };

  Region: {
    polygon: Components["Polygon"];
    revisions: Components["Revision"][];
  };

  Revision: {
    version: string;
    image: string;
    date: string;
    description: string;
    changes: string[];
    imageTransform?: Components["TransForm"];
    polygon?: Components["Polygon"];
  };

  Disciplines: {
    revisions: Components["Revision"][];
    imageTransform?: Components["TransForm"];
    image?: string;
    polygon?: Components["Polygon"];
    regions?: Record<string, Components["Region"]>;
  };
}
