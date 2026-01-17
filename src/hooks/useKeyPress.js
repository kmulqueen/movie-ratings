import { useEffect, useRef } from "react";

export function useKeyPress(key, callback) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    function execute(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        callbackRef.current();
      }
    }
    document.addEventListener("keydown", execute);

    // Cleanup func
    return function () {
      document.removeEventListener("keydown", execute);
    };
  }, [key]);
}
