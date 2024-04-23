import { useEffect, useState } from "react";

export function useArrayLocalStorage<T>(key = "", initialValue?: T[]) {
	const [items, setItems] = useState<T[]>(initialValue || []);
	useEffect(() => {
		function getItems() {
			if (!localStorage) return;
			const localStorageItem = localStorage.getItem(key);
			if (!localStorageItem) return setItems(initialValue || ([] as T[]));
			const items = JSON.parse(localStorageItem);
			if (!items) return;
			return setItems(items);
		}
		getItems();
	}, []);
	function handleSetItems(newItems: T[]) {
		localStorage.setItem(key, JSON.stringify(newItems));
		setItems(newItems);
	}
	return [items, handleSetItems] as [T[], (newItems: T[]) => void];
}
