import React, { Fragment } from 'react';

const ItemApi = ({ checked, name, onChange }) => {
  return (
    <Fragment>
      <label>CORS:</label>
      <label>
        {' '}
        Yes
        <input
          checked={checked}
          type="radio"
          name="Cors"
          value={'yes'}
          onChange={onChange}
        />
      </label>
      <label>
        {' '}
        No
        <input
          checked={checked}
          type="radio"
          name="Cors"
          value={'no'}
          onChange={onChange}
        />
      </label>
      <label>
        {' '}
        Unknown
        <input
          checked={checked}
          type="radio"
          name="Cors"
          value={'unknown'}
          onChange={onChange}
        />
      </label>
      <label>
        {' '}
        All
        <input
          checked={checked}
          type="radio"
          name="Cors"
          value={''}
          onChange={onChange}
        />
      </label>
    </Fragment>
  );
};
export default ItemApi;
