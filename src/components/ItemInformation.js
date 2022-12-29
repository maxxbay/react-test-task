import React from 'react';
import './App.css';

const ItemInformation = props => {
  const { entrie } = props;

  return (
    <div className="item">
      <h2 className="list-text">Current Api</h2>
      <section className="item">
        <span className="list-description flex">
          Category: {entrie.Category}
        </span>
        <span className="list-description flex">API: {entrie.API}</span>
        <span className="list-description flex">
          Description: {entrie.Description}
        </span>
        <span className="list-description flex">Auth: {entrie.Auth}</span>
        <span className="list-description flex">HTTPS: {entrie.HTTPS}</span>
        <span className="list-description flex">CORS: {entrie.Cors}</span>
        <span className="list-description flex">Link: {entrie.Link}</span>
      </section>
    </div>
  );
};
export default ItemInformation;
