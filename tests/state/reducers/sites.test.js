import { expect } from 'chai';
import reduxCrud from 'redux-crud';
import reducer from 'reducers/sites';

const { SITE_CREATE_SUCCESS } = reduxCrud.actionTypesFor('site');
const initialState = [];

describe('reducers/sites', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).to.equal(initialState);
  });

  it('handles the SITE_CREATE_SUCCESS action', () => {
    const record = { id: 50231500, name: 'LAGUNA BAHIA MOSQUITO NO.1 VIEQUES PR' }
    const reduced = reducer(initialState, {
      type: SITE_CREATE_SUCCESS,
      record,
    });
    expect(reduced).to.include(record);
  });
});
