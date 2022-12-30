import React, { Fragment, useState, useEffect } from 'react';

const Filter = (appState, entries, onTextChange) => {
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
