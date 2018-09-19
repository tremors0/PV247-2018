import * as Immutable from 'immutable';
import { combineReducers } from 'redux';
import { TODO_APP_ITEM_CREATE, TODO_APP_ITEM_TOGGLE, TODO_APP_ITEM_UPDATE, TODO_APP_LOADING_SUCCESS } from '../constants/actionTypes';
import { IItems } from '../models/ITodoApp';
import { ITodoItem } from '../models/ITodoItem';

const byId = (prevState = Immutable.Map<Uuid, ITodoItem>(), action: Action): Immutable.Map<Uuid, ITodoItem> => {
  switch (action.type) {
    case TODO_APP_LOADING_SUCCESS:
      return Immutable.Map(action.payload.todos.map((item: ITodoItem) => [item.id, item]));

    case TODO_APP_ITEM_CREATE: {
      const { id, text } = action.payload;

      return prevState.set(id, { id, text, isCompleted: false });
    }

    case TODO_APP_ITEM_UPDATE: {
      const { id, text } = action.payload;
      const oldTodo = prevState.get(id);

      return prevState.set(id, { ...oldTodo, text });
    }

    case TODO_APP_ITEM_TOGGLE: {
      const { id } = action.payload;
      const oldTodo = prevState.get(id);

      return prevState.set(id, { ...oldTodo, isCompleted: !oldTodo.isCompleted });
    }

    default:
      return prevState;
  }
};

const allIds = (prevState = Immutable.List<Uuid>(), action: Action): Immutable.List<Uuid> => {
  switch (action.type) {
    case TODO_APP_LOADING_SUCCESS:
      return Immutable.List(action.payload.todos.map((item: ITodoItem) => item.id));

    case TODO_APP_ITEM_CREATE:
      return prevState.push(action.payload.id);

    default:
      return prevState;
  }
};

export const items = combineReducers<IItems>({
  allIds,
  byId,
});
