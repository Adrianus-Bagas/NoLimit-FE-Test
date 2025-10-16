import {useEffect, useRef} from "react";

export const usePrevious = (value: any) => {
  const ref = useRef(); // Create a ref to store the previous value

  useEffect(() => {
    // This effect runs after every render
    ref.current = value; // Update the ref's current value to the current 'value'
  });

  // Return the value stored in the ref from the *previous* render
  return ref.current;
};
