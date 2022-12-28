import './App.css';
import React, { Fragment } from 'react';

const List = props => {
  const { entries } = props;

  if (!entries || entries.length === 0) return <p>No api's, sorry</p>;

  return (
    <ul>
      <h2 className="list-head">Available Api's</h2>
      {entries.map(entrie => {
        return (
          <Fragment key={entrie.Link + entrie.API}>
            <li className="list">
              <span className="list-text">{entrie.Category} </span>
              <span className="list-description">{entrie.Description}</span>
              <button
                className="list-button"
                onClick={() => {
                  props.delete(entrie);
                }}
              >
                Delete api
              </button>
            </li>
          </Fragment>
        );
      })}
    </ul>
  );
};
export default List;
