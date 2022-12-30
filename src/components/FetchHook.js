import { useState, useCallback } from 'react';
import qs from 'qs';
import { BASE_URL, STATUS } from './Constants';

export const useFetch = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(STATUS.init);

  const trigger = useCallback((path, params = {}) => {
    setStatus(STATUS.loading);
    fetch(BASE_URL + path + '?' + qs.stringify(params, { skipNulls: true }))
      .then(res => res.json())
      .then(data => {
        setData(data);
        setStatus(STATUS.success);
      })
      .catch(() => {
        setStatus(STATUS.error);
      });
  }, []);

  return { data, status, trigger };
};
