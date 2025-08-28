import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.history.scrollRestoration = "manual"; // 🚀 force disable browser scroll restore
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
