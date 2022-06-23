import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../state/reducers";
// import { searchRepositories } from "../state/action-creators";
// import { actionCreators } from "../state/ index";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

const RepositoriesList = () => {
  const [word, setWord] = useState('');
  const [list, setList] = useState([]);
  // const dispatch = useDispatch();

  const { searchRepositories } = useActions();

  // const { data, loading, error } = useSelector((state: RootState) => state.repositoriesReducer);
  const { data, loading, error } = useTypedSelector((state) => state.repositoriesReducer);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // dispatch(actionCreators.searchRepositories(word) as any);
    searchRepositories(word);
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type="text" value={word} onChange={(e) => setWord(e.target.value)}/>
        <button>Search</button>
      </form>
      <ul>
        {
          error && <h3>{error}</h3>
        }
        {
          data && data.map(item => <li key={item}>{item}</li>)
        }
        {
          loading && <h1>Loading....</h1>
        }
      </ul>
    </div>
  )
}

export default RepositoriesList;