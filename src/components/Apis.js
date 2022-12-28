import React, { useEffect, useState } from 'react';
import './App.css';
import ItemApi from './ItemApi';
import List from './List';
// import withListLoading from './withListLoading';
// import { v4 as uuidv4 } from 'uuid';

function Api() {
  // const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    HTTPS: false,
    entries: null,
    categories: [],
    selectedCategory: '',
    selectedCors: '',
    Link: '',
  });

  // const [entries, setEntries] = useState([]);
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

  // useEffect(() => {
  //   setAppState({
  //     ...appState,
  //     selectedCategory: appState.categories[0],
  //   });
  // }, [appState, appState.categories]);

  const getCategories = entries => {
    const categories = entries.map(entrie => entrie.Category);
    // console.log(categories);
    return categories.filter((cat, idx, arr) => arr.indexOf(cat) === idx);
  };

  const deleteApi = entrie => {
    setAppState({
      ...appState,
      entries: appState.entries.filter(el => el.Link !== entrie.Link),
    });
  };
  // console.log(appState.categories);

  const getFilteredEntries = (entries, cat, cors) => {
    // if (cat === '' && cors === '') {
    //   return entries;
    // }
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
  // console.log(appState);
  // console.log(getFilteredEntries(appState?.entries, appState.selectedCategory));

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

      <div className="list-container">
        <label htmlFor="categories">Choose a car:</label>

        <select name="categories" id="categories" onChange={handleChange}>
          <option value={''}>{`=all=`}</option>
          {appState.categories?.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <ItemApi onChange={onCorsChange} />

        {/* <ListLoading isLoading={appState.HTTPS} entries={appState.entries} /> */}
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
