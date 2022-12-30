import { useMemo, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { useFetch } from './FetchHook';
import { STATUS } from './Constants';

const defaultFilters = {
  title: null,
  category: null,
};

const Filter = () => {
  const { data, status, trigger } = useFetch();

  const [filters, setFilters] = useState(defaultFilters);
  const handleSearch = event => {
    const value = event.target.value || null;
    setFilters(prev => ({ ...prev, title: value }));
  };

  const searchAPI = useMemo(
    () => debounce(param => trigger('/entries', param), 300),
    [trigger]
  );

  useEffect(() => {
    searchAPI(filters);
  }, [searchAPI, filters]);

  return (
    <div className="filter-container">
      <div className="filters">
        <input
          type="search"
          placeholder="Search API by title..."
          value={filters.title || ''}
          onChange={handleSearch}
        />
      </div>
      <div>
        {(status === STATUS.init || status === STATUS.loading) && (
          <p>Loading...</p>
        )}
        {status === STATUS.error && <p>Erorr...</p>}

        {status === STATUS.success && (
          <ul>
            {data.entries.map(element => (
              <li key={element.API + element.Link}>
                <p>Title: {element.API}</p>
                <p>Description: {element.Description}</p>
                <a href={element.Link} target="_blank" rel="noreferrer">
                  {element.Link}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Filter;
