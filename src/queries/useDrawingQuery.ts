import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { drawingsKeys } from "./queryKeys";
import { loadData } from "../apis/api";
import type { Components } from "../types/loadData.types";

type TDataType = Components["ProjectComponents"];

export const useGetDrawingsQuery = <TData = TDataType>(
  options?: Omit<
    UseQueryOptions<TDataType, Error, TData>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: drawingsKeys.all,
    queryFn: loadData,
    ...options,
  });
};
