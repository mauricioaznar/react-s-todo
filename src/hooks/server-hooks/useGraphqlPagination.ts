import { useCallback, useEffect, useState } from "react";
import LocalStorage from "../../helpers/local-storage";

interface UseGraphqlPagination {
  afterKey?: string;
  beforeKey?: string;
  limitKey?: string;
  limit?: number;
}

export const useGraphqlPagination = (props: UseGraphqlPagination) => {
  const { afterKey, beforeKey, limit } = props;

  const [after, setAfterLocal] = useState<null | string | undefined>(
    afterKey ? LocalStorage.getString(afterKey) : null,
  );

  const [before, setBeforeLocal] = useState<null | string | undefined>(
    beforeKey ? LocalStorage.getString(beforeKey) : null,
  );

  const setAfter = useCallback((a: string | null | undefined) => {
    if (a) {
      setBeforeLocal(null);
      if (beforeKey) {
        LocalStorage.removeItem(beforeKey);
      }

      setAfterLocal(a);
      if (afterKey) {
        if (a) {
          LocalStorage.saveString(a, afterKey);
        } else {
          LocalStorage.removeItem(afterKey);
        }
      }
    }
  }, []);

  useEffect(() => {
    setAfter(after);
  }, [after]);

  const setBefore = useCallback((b: string | null | undefined) => {
    if (b) {
      setAfterLocal(null);
      if (afterKey) {
        LocalStorage.removeItem(afterKey);
      }

      setBeforeLocal(b);
      if (beforeKey) {
        if (b) {
          LocalStorage.saveString(b, beforeKey);
        } else {
          LocalStorage.removeItem(beforeKey);
        }
      }
    }
  }, []);

  useEffect(() => {
    setBefore(before);
  }, [before]);

  const resetGraphqlPagination = useCallback(() => {
    setBeforeLocal(null);
    if (beforeKey) {
      LocalStorage.removeItem(beforeKey);
    }
    setAfterLocal(null);
    if (afterKey) {
      LocalStorage.removeItem(afterKey);
    }
  }, []);

  return {
    after,
    setAfter,
    before,
    limit,
    setBefore,
    resetGraphqlPagination,
  };
};
