import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { ALL_CITIES } from "@/lib/events";

type FiltersState = {
  query: string;
  setQuery: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
};

const FiltersContext = createContext<FiltersState | null>(null);

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [city, setCity] = useState<string>(ALL_CITIES);

  const value = useMemo(
    () => ({ query, setQuery, category, setCategory, city, setCity }),
    [query, category, city],
  );

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
}

export function useFilters(): FiltersState {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error("useFilters must be used inside <FiltersProvider>");
  return ctx;
}
