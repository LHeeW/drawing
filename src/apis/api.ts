import type { Components } from "../types/loadData.types";

type loadDataType = Components["ProjectComponents"];

export const loadData = async () => {
  const response = await fetch("/metadata.json");

  if (!response.ok) {
    throw new Error(`에러 코드: ${response.status}`);
  }
  const data: loadDataType = await response.json();

  return data;
};
