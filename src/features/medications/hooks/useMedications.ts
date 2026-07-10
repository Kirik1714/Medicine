import { useState, useRef, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMedicationsApi } from "../medications.api";

export function useMedications() {
  const [isAllVisible, setIsAllVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [successFilter, setSuccessFilter] = useState<"all" | "success" | "failed">("all");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const { data: medications, isLoading, error } = useQuery({
    queryKey: ["medications"],
    queryFn: fetchMedicationsApi,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredMedications = useMemo(() => {
    if (!medications) return [];

    return medications.filter((med) => {
      const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSuccess =
        successFilter === "all"
          ? true
          : successFilter === "success"
            ? med.success === true
            : med.success === false;

      return matchesSearch && matchesSuccess;
    });
  }, [medications, searchQuery, successFilter]);

  const displayedMedications = isAllVisible
    ? filteredMedications
    : filteredMedications.slice(0, 9);

  return {
    medications,
    displayedMedications,
    filteredMedications,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    successFilter,
    setSuccessFilter,
    isSelectOpen,
    setIsSelectOpen,
    selectRef,
    isAllVisible,
    setIsAllVisible,
  };
}