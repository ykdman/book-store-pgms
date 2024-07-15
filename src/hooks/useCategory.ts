import { useEffect, useState } from "react";
import { Category } from "../shared/models";
import { fetchCategory } from "../shared/api/category.api";

export const useCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    fetchCategory().then((category) => {
      console.log(category);
      if (!category) return;
      const categoryWithAll = [{ id: null, name: "전체" }, ...category];
      setCategories(categoryWithAll);
    });
  }, []);

  return { categories };
};
