import axios from "axios";
import { useEffect, useRef, useState, useCallback } from "react";

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>();
  const activeRequestArr = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async (
      url: string,
      method: string = "GET",
      body: any = null,
      headers: any = {},
      params: any = {}
    ) => {
      try {
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeRequestArr.current.push(httpAbortCtrl);
        const response = await axios({
          method,
          url,
          data: body,
          headers,
          signal: httpAbortCtrl.signal,
          params,
        });
        activeRequestArr.current = activeRequestArr.current.filter(x => x !== httpAbortCtrl);
        setIsLoading(false);
        return response.data;
      } catch (error: any) {
        setIsLoading(false);
        if (!axios.isCancel(error)) {
          setError(error.response.data);
          throw error;
        }
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    return () => activeRequestArr.current.forEach((x) => x.abort());
  },[]);

  return { isLoading, error, sendRequest, clearError };
};
