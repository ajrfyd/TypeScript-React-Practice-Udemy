import { ActionType } from "../action-types";

const SEARCH_REPOSITORIES = 'search_repositories';
const SEARCH_REPOSITORIES_SUCCESS = 'search_repositories_success';
const SEARCH_REPOSITORIES_ERROR = 'search_repositories_error'

export interface SearchRepositoriesAction {
  type: ActionType.SEARCH_REPOSITORIES
}

export interface SearchRepositoriesSuccessAction {
  type: ActionType.SEARCH_REPOSITORIES_SUCCESS;
  payload: string[];
}

export interface SearchRepositoriesErrorAction {
  type: ActionType.SEARCH_REPOSITORIES_ERROR;
  payload: string;
}

export type Action = 
  | SearchRepositoriesAction
  | SearchRepositoriesSuccessAction
  | SearchRepositoriesErrorAction
