import React, { useEffect, useState } from 'react';
import './App.css';
import Filter from './Filter';
import ItemApi from './ItemApi';
import ItemInformation from './ItemInformation';
import List from './List';

function Api() {
  const [appState, setAppState] = useState({
    HTTPS: false,
    entries: null,
    categories: [],
    selectedCategory: '',
    selectedCors: '',
    Link: '',
    currentEntry: null,
    selectedText: '',
  });
  // const [searchString, setSearchString] = useState('');

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

  const onTextChange = e => {
    setAppState({
      ...appState,
      selectedText: e.target.value,
    });
  };
  // const onTextChange = e => {
  //   setAppState({
  //     ...appState,
  //     selectedText: e.target.value,
  //   });
  // };
  // const getFilteredText = (entries, API) => {
  //   const a = entries?.filter(entry => (!API ? true : API === entry.API));
  //   return a;
  // };

  const showApi = entrie => {
    setAppState({
      ...appState,
      currentEntry: entrie,
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
        <Filter
          onChange={onTextChange}
          // entries={getFilteredText(appState.selectedText)}
        />
      </div>

      <div className="wrapper">
        <div className="list-container">
          <List
            entries={getFilteredEntries(
              appState.entries,
              appState.selectedCategory,
              appState.selectedCors
            )}
            deleteApi={deleteApi}
            showApi={showApi}
          />
        </div>
        <div className="item">
          {appState.currentEntry && (
            <ItemInformation entrie={appState.currentEntry} />
          )}
        </div>
      </div>

      <footer>
        <div className="footer">Built by Maksym Bay</div>
      </footer>
    </div>
  );
}
export default Api;
