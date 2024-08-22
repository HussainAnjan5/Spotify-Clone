import { useEffect, useRef } from 'react';

/**
 *
 * @param handler
 * @description Runs the handler function when outside of ref is clicked
 */
const useOutsideClick = (handler) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      e.stopPropagation();
      console.log('close');

      if (ref.current && !ref.current?.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener('click', handleClick, false);
    return () => document.removeEventListener('click', handleClick, false);
  }, [ref, handler]);

  return { ref };
};

export default useOutsideClick;
