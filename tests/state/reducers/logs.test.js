import { expect } from 'chai';
import reduxCrud from 'redux-crud';
import reducer from 'reducers/logs';
import { constants } from 'utils';

const { LOG_CREATE_SUCCESS } = reduxCrud.actionTypesFor('log');
const initialState = [];

describe('reducers/logs', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).to.equal(initialState);
  });

  it('handles the LOG_CREATE_SUCCESS action', () => {
    const record = { id: 1, requested_at: Date.now().toString() }
    const reduced = reducer(initialState, {
      type: `${constants.ACTION_TYPE_PREFIX}${LOG_CREATE_SUCCESS}`,
      record,
    });
    expect(reduced).to.include(record);
  });
});
