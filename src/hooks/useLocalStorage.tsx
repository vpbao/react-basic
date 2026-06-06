import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const storeValue = localStorage.getItem(key);

      if (storeValue) {
        return JSON.parse(storeValue) as T;
      }

      return initialValue;
    } catch (error) {
      console.error(`Failed to read localStorage key "${key}"`, error);

      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error(`Failed to write localStorage key "${key}"`, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
