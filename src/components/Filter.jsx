import React, { Fragment } from 'react';

const Filter = props => {
  const { onTextChange } = props;
  return (
    <Fragment>
      <label>
        Find api by name
        <input
          type="text"
          name="filter"
          placeholder="Search API by name..."
          onChange={onTextChange}
        />
      </label>
    </Fragment>
  );
};

export default Filter;
