import { useQuery } from "@tanstack/react-query";
import queryKey from "@/constants/queryKey";
import { getCategoriesService } from "./services";

const useQueryCategories = () =>
  useQuery<string[], Error>({
    queryKey: [queryKey.category.list],
    queryFn: getCategoriesService,
    select: (data) => data,
    staleTime: 1000 * 60 * 5,
    enabled: true,
  });

export default useQueryCategories;
