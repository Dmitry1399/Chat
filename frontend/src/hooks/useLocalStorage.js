const actions = {
    set: (itemName, item) => localStorage.setItem(itemName, item),
    get: (itemName) => localStorage.getItem(itemName),
    clear: () => localStorage.clear(),
};

const useLocalStorage = (action) => actions[action];

export default useLocalStorage;