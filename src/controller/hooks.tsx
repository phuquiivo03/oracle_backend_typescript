import { useEffect, useRef, useState } from 'react'

export const useInterval = (callback: () => void, delay: number | null) => {
    const savedCallback = useRef(callback);

    // Lưu trữ callback mới nhất.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Thiết lập interval.
    useEffect(() => {
        if (delay !== null) {
            let id = setInterval(() => savedCallback.current(), delay);
            return () => clearInterval(id);
        }
    }, [delay]);
  }