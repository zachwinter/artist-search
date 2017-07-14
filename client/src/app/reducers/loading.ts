import { Action } from '@ngrx/store';

export interface LoadingState {
  isLoading: boolean;
}

export const initialState: LoadingState = {
  isLoading: false
};

export function loadingReducer(state: LoadingState = initialState, action: Action): LoadingState {
  switch (action.type) {
    case 'LOADING':
      return {
        isLoading: true
      };

    case 'LOADING_COMPLETE':
      return {
        isLoading: false
      };

    default:
      return {
        isLoading: state.isLoading
      };
  }
}
