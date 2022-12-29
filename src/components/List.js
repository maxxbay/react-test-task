import './App.css';
import React from 'react';

const List = props => {
  const { entries, deleteApi, showApi } = props;

  if (!entries || entries.length === 0) return <p>No api's, sorry</p>;

  // const handleTogglePress = (event, id) => {
  //   if (event.key === 'Enter') {
  //     event.preventDefault();
  //     handleClick(id);
  //   }
  // };

  // const handleClick = e => {
  //   e.preventDefault();

  //   console.log(e.target.innerText);
  // };

  return (
    <ul>
      <h2 className="list-head">Available Api's</h2>
      {entries.map(entrie => {
        return (
          <div key={entrie.Link + entrie.API} className="flex">
            <li
              className="list"
              onClick={() => {
                showApi(entrie);
              }}
            >
              <span className="list-text">{entrie.Category} </span>
              <span className="list-description">{entrie.Description}</span>
            </li>
            <button
              className="list-button"
              onClick={() => {
                deleteApi(entrie);
              }}
            >
              Delete api
            </button>
          </div>
        );
      })}
    </ul>
  );
};
export default List;
