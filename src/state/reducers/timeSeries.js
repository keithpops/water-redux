import reduxCrud from 'redux-crud';
import unionBy from 'lodash.unionby';
import { constants } from 'utils';

const { SITE_QUERY_CREATE_SUCCESS } = reduxCrud.actionTypesFor('site_query');

const initialState = [];

export default function timeSeries(state = initialState, action) {
  switch (action.type) {
    case `${constants.ACTION_TYPE_PREFIX}${SITE_QUERY_CREATE_SUCCESS}`:
      return unionBy(state, action.record, 'name');
    default:
      return state;
  }
}
