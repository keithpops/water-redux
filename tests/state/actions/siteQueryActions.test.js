import { expect } from 'chai';
import _ from 'lodash';
import configureStore from 'redux-mock-store';
import { createSiteQuery } from 'actions/siteQueryActions';
import reduxMiddleware from 'config/middleware';
import { SITES } from '../../helpers/constants';

const mockStore = configureStore(reduxMiddleware);

describe('actions/siteQueryActions', () => {
  let store, action, actions;
  describe('createSiteQuery', () => {

    describe('with valid site id(s)', () => {
      before(() => {
        store = mockStore();
        return createSiteQuery(SITES[0])(store.dispatch).then(() => {
          actions = store.getActions();
        });
      });

      it('should call at least 2 actions', () => expect(actions).to.have.length.of.at.least(2));

      it('should have SITE_QUERY_CREATE_SUCCESS action', () => {
        action = _.find(actions, { type: 'SITE_QUERY_CREATE_SUCCESS' });
        expect(action).to.exist.and.have.property('record');
      });
    });

    describe('with invalid site id(s)', () => {
      before(() => {
        store = mockStore();
        return createSiteQuery("&lol=cool")(store.dispatch).then(() => {
          actions = store.getActions();
        });
      });

      it('should be able to throw an error', () => {
        action = _.find(actions, { type: 'SITE_QUERY_CREATE_ERROR' });
        expect(action).to.exist.and.have.property('error');
      });
    });

    describe('can handle an array of ids', () => {
      before(() => {
        store = mockStore();
        return createSiteQuery(SITES)(store.dispatch).then(() => {
          actions = store.getActions();
        });
      });

      it('should have SITE_CREATE_SUCCESS action', () => {
        action = _.find(actions, { type: 'SITE_CREATE_SUCCESS' });
        expect(action).to.exist.and.have.property('record');
      });

      it('should have SITE_QUERY_CREATE_SUCCESS action', () => {
        action = _.find(actions, { type: 'SITE_QUERY_CREATE_SUCCESS' });
        expect(action).to.exist.and.have.property('record');
      });
    });
  });
});
