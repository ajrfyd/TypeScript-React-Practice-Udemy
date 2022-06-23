### TypeScript Practice Udemy

> 오류 Object is of type 'unknown'(Try catch의 error 객체)
catch에서 에러는 typescript가 unknown으로 처리한다고 함.
해결 방법 !
```js
  if(axios.isAxiosError(err)) {
      dispatch({ type: ActionType.SEARCH_REPOSITORIES_ERROR, payload: err.message });
    }
```
axios객체 내부의 isAxiosError메소드에 에러를 인자로 넣어 판별

> useAction hook(action을 간편하게 dispatch 할 수 있음)
```js
  import { useDispatch } from 'react-redux';
  import { bindActionCreators } from 'redux';
  // 액션생성 함수
  import { searchRepositories } from '../state/ index';
  // action-creators 에서 여러 함수 활용할 수 있는게 좋을듯
  // import { actionCreators } from '../state/ index';

  export const useActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(searchRepositories, dispatch);
  };

  // usage
  import { useActions } from "../hooks/useActions";
  const { searchRepositories } = useActions();
  searchRepositories(param);
  //dispatch(searchRepositories(param))이랑 같음.
```

> useTypedSelector hook(useSelector 간편하게)
```js
  // import { useSelector as _useSelector, TypedUseSelectorHook } from 'react-redux';
  import { useSelector , TypedUseSelectorHook } from 'react-redux';
  import { RootState } from '../state/reducers';

  // export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;
  export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;


  // usage
  import { useTypedSelector } from "../hooks/useTypedSelector";
  const { data, loading, error } = useTypedSelector((state) => state.repositoriesReducer);
  // const { data, loading, error } = useSelector((state: RootState) => state.repositoriesReducer);
```





