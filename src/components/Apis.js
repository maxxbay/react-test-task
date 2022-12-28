import React, { useEffect, useState } from 'react';
import './App.css';
import ItemApi from './ItemApi';
import List from './List';

function Api() {
  const [appState, setAppState] = useState({
    HTTPS: false,
    entries: null,
    categories: [],
    selectedCategory: '',
    selectedCors: '',
    Link: '',
  });

  useEffect(() => {
    setAppState({ HTTPS: true });
    const apiUrl = `https://api.publicapis.org/entries`;
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const categories = getCategories(data.entries);
        setAppState({
          HTTPS: true,
          entries: data.entries,
          categories,
          selectedCategory: '',
        });
      });
  }, [setAppState]);

  const getCategories = entries => {
    const categories = entries.map(entrie => entrie.Category);
    return categories.filter((cat, idx, arr) => arr.indexOf(cat) === idx);
  };

  const deleteApi = entrie => {
    setAppState({
      ...appState,
      entries: appState.entries.filter(el => el.Link !== entrie.Link),
    });
  };

  const getFilteredEntries = (entries, cat, cors) => {
    const a = entries?.filter(
      entry =>
        (!cat ? true : cat === entry.Category) &&
        (!cors ? true : cors === entry.Cors)
    );
    console.log(a);
    return a;
  };

  const handleChange = e => {
    setAppState({
      ...appState,
      selectedCategory: e.target.value,
    });
  };

  const onCorsChange = e => {
    setAppState({
      ...appState,
      selectedCors: e.target.value,
    });
  };
  return (
    <div className="App">
      <div className="container">
        <h1>API's</h1>
      </div>
      <div className="category-container">
        {' '}
        <label htmlFor="categories">Choose a category:</label>
        <select name="categories" id="categories" onChange={handleChange}>
          <option value={''}>{`=all=`}</option>
          {appState.categories?.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <ItemApi onChange={onCorsChange} />
      </div>
      <div className="list-container">
        <List
          entries={getFilteredEntries(
            appState.entries,
            appState.selectedCategory,
            appState.selectedCors
          )}
          deleteApi={deleteApi}
        />
      </div>
      <footer>
        <div className="footer">Built by Maksym Bay</div>
      </footer>
    </div>
  );
}
export default Api;
