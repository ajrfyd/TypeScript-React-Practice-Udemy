import axios, { AxiosError} from 'axios';
import { ActionType } from '../action-types';
import { Action } from '../actions';


export const searchRepositories = (term: string) => async (dispatch: any) => {
  dispatch({ type: ActionType.SEARCH_REPOSITORIES });

  try {
    const { data } = await axios.get('https://registry.npmjs.org/-/v1/search', {
      params: {
        text: term
      }
    });

    const names = data.objects.map((result: any) => result.package.name);

    dispatch({ type: ActionType.SEARCH_REPOSITORIES_SUCCESS, payload: names })
  } catch(err) {
    if(axios.isAxiosError(err)) {
      dispatch({ type: ActionType.SEARCH_REPOSITORIES_ERROR, payload: err.message });
    }
  }
}