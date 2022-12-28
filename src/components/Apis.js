import React, { useEffect, useState } from 'react';
import './App.css';
import List from './List';
// import withListLoading from './withListLoading';
// import { v4 as uuidv4 } from 'uuid';

function Api() {
  // const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    HTTPS: false,
    entries: null,
    Category: '',
    Cors: '',
    Link: '',
  });

  // const [entries, setEntries] = useState([]);
  useEffect(() => {
    setAppState({ HTTPS: true });
    const apiUrl = `https://api.publicapis.org/entries`;
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        setAppState({ HTTPS: true, entries: data.entries });
      });
  }, [setAppState]);

  const deleteApi = Link => {
    setAppState({
      entries: appState.entries.filter(entries => entries.Link !== Link),
    });
  };

  return (
    <div className="App">
      <div className="container">
        <h1>API's</h1>
      </div>
      <div className="list-container">
        {/* <ListLoading isLoading={appState.HTTPS} entries={appState.entries} /> */}
        <List entries={appState.entries} delete={deleteApi} />
      </div>
      <footer>
        <div className="footer">Built by Maksym Bay</div>
      </footer>
    </div>
  );
}
export default Api;
