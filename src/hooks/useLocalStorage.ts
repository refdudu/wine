import { useEffect, useState } from "react";

export function useArrayLocalStorage<T>(key = "", initialValue?: T[]) {
  function getItems() {
    const localStorageItem = localStorage.getItem(key);
    if (!localStorageItem) return initialValue || ([] as T[]);
    const items = JSON.parse(localStorageItem);
    if (!items) return [];
    return items;
  }
  const [items, setItems] = useState<T[]>(getItems);

  function handleSetItems(newItems: T[]) {
    localStorage.setItem(key, JSON.stringify(newItems));
    setItems(newItems);
  }
  return [items, handleSetItems] as [T[], (newItems: T[]) => void];
}
