import { PropertyFilterFormData } from 'types';

function saveDataToLocalStorage(data: PropertyFilterFormData): void {
  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);

      localStorage.setItem(key, stringValue);
    }
  });
}

function removeDataFromLocalStorage(data: PropertyFilterFormData): void {
  Object.keys(data).forEach((key) => {
    const storagedValue = localStorage.getItem(key);

    if (storagedValue) {
      localStorage.removeItem(key);
    }
  });
}

export { saveDataToLocalStorage, removeDataFromLocalStorage };
