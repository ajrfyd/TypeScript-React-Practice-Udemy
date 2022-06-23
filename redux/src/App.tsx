import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./state/reducers";
import { searchRepositories } from './state/action-creators';
import RepositoriesList from './components/RepositoriesList';

const App = () => {
  const repo = useSelector((state: RootState) => state.repositoriesReducer);
  const [data, setData] = useState<RootState[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(searchRepositories('react'));
  }, [])

  return (
    <div>
      <h1>Search For a Package</h1>
      <RepositoriesList />
    </div>
  )
}

export default App;