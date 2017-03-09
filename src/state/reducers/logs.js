import reduxCrud from 'redux-crud';

const baseReducers = reduxCrud.List.reducersFor('log');

const initialState = [];

export default function logs(state = initialState, action) {
  switch (action.type) {
    default:
      return baseReducers(state, action);
  }
}
