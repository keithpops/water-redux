import reduxCrud from 'redux-crud';
import { constants } from 'utils';

const baseReducers = reduxCrud.List.reducersFor(`${constants.REDUX_CRUD_PREFIX}site`);

const initialState = [];

export default function sites(state = initialState, action) {
  switch (action.type) {
    default:
      return baseReducers(state, action);
  }
}
