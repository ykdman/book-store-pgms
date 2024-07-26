import { getTheme } from "@/style/theme";
import { useEffect, useState } from "react";

export const useMediaQuery = () => {
  // 최대 크기가 768xp 이하 라면 모바일로 간주
  const [isMobile, setIsMobile] = useState<boolean>(
    window.matchMedia(getTheme("light").mediaQuery.mobile).matches
  );

  useEffect(() => {
    const isMobileQuery = window.matchMedia("(max-width : 768px)");
    setIsMobile(isMobileQuery.matches);
  }, [isMobile]);

  return { isMobile };
};
