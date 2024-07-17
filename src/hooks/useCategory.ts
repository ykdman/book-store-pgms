import { useEffect, useState } from "react";
import { Category } from "../shared/models";
import { fetchCategory } from "../shared/api/category.api";
import { useLocation } from "react-router-dom";

export const useCategory = () => {
  const location = useLocation();
  const [categories, setCategories] = useState<Category[]>([]);

  const setActive = () => {
    const params = new URLSearchParams(location.search);
    if (params.get("category_id")) {
      setCategories((prev) => {
        return prev.map((item) => {
          return {
            ...item,
            isActive: item.id === Number(params.get("category_id")),
          };
        });
      });
    } else {
      setCategories((prev) => {
        return prev.map((item) => {
          return {
            ...item,
            isActive: false,
          };
        });
      });
    }
  };

  useEffect(() => {
    fetchCategory().then((category) => {
      if (!category) return;
      const categoryWithAll = [
        {
          id: null,
          name: "전체",
        },
        ...category,
      ];
      setCategories(categoryWithAll);
      setActive();
    });
  }, []);

  useEffect(() => {
    setActive();
  }, [location.search]);

  return { categories };
};
