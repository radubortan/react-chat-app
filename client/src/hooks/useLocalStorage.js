import { useEffect, useState } from 'react';

const PREFIX = 'chat-app-';

const useLocalStorage = (key, initialValue) => {
  //name of the variable to be stored
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    //we read the value from storage
    const jsonValue = localStorage.getItem(prefixedKey);
    //if we have a value stored, we set the state
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }
    if (typeof initialValue === 'function') {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
};

export default useLocalStorage;
