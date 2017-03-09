import reduxCrud from 'redux-crud';

const baseReducers = reduxCrud.List.reducersFor('site');

const initialState = [];

export default function sites(state = initialState, action) {
  switch (action.type) {
    default:
      return baseReducers(state, action);
  }
}
