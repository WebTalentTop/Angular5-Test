import { Action, State } from '@ngrx/store';

export interface AppState {
  name: string;
  toolbarText: string;
  sidebarText: string;
  diagramText: string;
}
export const SET_NAME = 'SET_NAME';
export const TRIGGER_TOOLBAR_TEXT = 'TRIGGER_TOOLBAR_TEXT';
export const TRIGGER_SIDEBAR_TEXT = 'TRIGGER_SIDEBAR_TEXT';
export const TRIGGER_DIAGRAM_TEXT = 'TRIGGER_DIAGRAM_TEXT';

export class NameAction implements Action {
  type = SET_NAME
  constructor(public payload: string) { }
}
export class ToolbarTextAction implements Action {
  type = TRIGGER_TOOLBAR_TEXT
  constructor(public payload: string) { }
}
export class SidebarTextAction implements Action {
  type = TRIGGER_SIDEBAR_TEXT
  constructor(public payload: string) { }
}

export class DiagramTextAction implements Action {
  type = TRIGGER_DIAGRAM_TEXT
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
    case TRIGGER_TOOLBAR_TEXT:
      return action.payload;
    default:
      return state;
  }
}
export function sidebarReducer(state: string = "" , action: SidebarTextAction) {
  switch (action.type) {
    case TRIGGER_SIDEBAR_TEXT:
      return action.payload;
    default:
      return state;
  }
}
export function diagramReducer(state: string = "" , action: DiagramTextAction) {
  switch (action.type) {
    case TRIGGER_DIAGRAM_TEXT:
      return action.payload;
    default:
      return state;
  }
}
