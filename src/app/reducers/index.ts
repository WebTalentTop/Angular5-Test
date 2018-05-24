import { Action, State } from '@ngrx/store';

export interface AppState {
  name: string;
  toolbarText: string;
  sidebarText: string;
}
export const SET_NAME = 'SET_NAME';
export const SET_TOOLBAR_TEXT = 'SET_TOOLBAR_TEXT';
export const SET_SIDEBAR_TEXT = 'SET_SIDEBAR_TEXT';

export class NameAction implements Action {
  type = SET_NAME
  constructor(public payload: string) { }
}
export class ToolbarTextAction implements Action {
  type = SET_TOOLBAR_TEXT
  constructor(public payload: string) { }
}
export class SidebarTextAction implements Action {
  type = SET_SIDEBAR_TEXT
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
export function toolbarReducer(state: string = "" , action: ToolbarTextAction) {
  switch (action.type) {
    case SET_TOOLBAR_TEXT:
      return action.payload;
    default:
      return state;
  }
}
export function sidebarReducer(state: string = "" , action: SidebarTextAction) {
  switch (action.type) {
    case SET_SIDEBAR_TEXT:
      return action.payload;
    default:
      return state;
  }
}

