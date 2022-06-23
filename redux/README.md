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