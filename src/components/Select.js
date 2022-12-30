import { useEffect } from 'react';
import { STATUS } from './Constants';
import { useFetch } from './FetchHook';

export const Select = ({ value, onChange }) => {
  const { data, status, trigger } = useFetch();

  useEffect(() => {
    trigger('/categories');
  }, [trigger]);

  const isLoading = status === STATUS.init || status === STATUS.loading;

  return (
    <select value={value} onChange={onChange}>
      <option value="">{isLoading ? 'Loading...' : 'All categories'}</option>

      {status === STATUS.success &&
        data.categories.map(cat => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
    </select>
  );
};
