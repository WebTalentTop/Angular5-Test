import { Action, State } from '@ngrx/store';

export interface AppState {
  name: string;
}
export const SET_NAME = 'SET_NAME';

export class NameAction implements Action {
  type = SET_NAME
  constructor(public payload: string) { }
}
export function nameReducer(state: string = "" , action: NameAction) {
  switch (action.type) {
    case SET_NAME:
      return action.payload;
    default:
      return state;
  }
}
