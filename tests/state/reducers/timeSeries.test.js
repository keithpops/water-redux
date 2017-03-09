import { expect } from 'chai';
import reduxCrud from 'redux-crud';
import reducer from 'reducers/timeSeries';

const { SITE_QUERY_CREATE_SUCCESS } = reduxCrud.actionTypesFor('site_query');
const initialState = [];

describe('reducers/timeSeries', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).to.equal(initialState);
  });

  it('handles the SITE_QUERY_CREATE_SUCCESS action', () => {
    const record = [{ id: 1, name: 'Swamp Thing' }]
    const reduced = reducer(initialState, {
      type: SITE_QUERY_CREATE_SUCCESS,
      record,
    });
    expect(reduced).to.include(record[0]);
  });
});
