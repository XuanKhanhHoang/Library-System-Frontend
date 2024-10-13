import { useEffect, useRef } from "react";

function useDidMountEffect(callback: Function, dependencies: unknown[] = []) {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) {
      callback();
    } else {
      hasMounted.current = true;
    }
  }, dependencies);
}

export default useDidMountEffect;
