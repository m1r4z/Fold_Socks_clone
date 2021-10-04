import { PROJECT_NAME } from "./constant";

export const getDataFromStorage = () => {
	const key = PROJECT_NAME;
	return new Promise((resolve, reject) => {
		chrome.storage.local.get([key], (res) => {
			if (!res[key]) resolve(null);
			else {
				resolve(res[key]);
			}
		});
	});
};

export const setDataInStorage = (value) => {
	const key = PROJECT_NAME;
	return new Promise((resolve, reject) => {
		chrome.storage.local.set({ [key]: value }, (res) => {
			console.log("Value set ", value);
			resolve(null);
		});
	});
};

export const addStorageChangeListener = (listener) => {
	chrome.storage.onChanged.addListener(listener);
};

export const removeStorageChangeListener = (listener) => {
	chrome.storage.onChanged.removeListener(listener);
};

export const getDataFromLocalStorage = () => {
	const key = PROJECT_NAME;
	return JSON.parse(localStorage.getItem(key));
};

export const setDataInLocalStorage = (value) => {
	const key = PROJECT_NAME;
	return localStorage.setItem(key, JSON.stringify(value));
};

export const addLocalStorageChangeListener = (listener) => {
	window.addEventListener("storage", listener);
};

export const removeLocalStorageChangeListener = (listener) => {
	window.removeEventListener("storage", listener);
};
