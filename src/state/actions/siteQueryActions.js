import reduxCrud from 'redux-crud';
import groupBy from 'lodash.groupby';
import { generateUUID, request } from 'utils';

const {
  createStart,
  createSuccess,
  createError,
} = reduxCrud.actionCreatorsFor('site_query');

const {
  createStart: createSiteStart,
  createSuccess: createSiteSuccess,
  createError: createSiteError,
} = reduxCrud.actionCreatorsFor('site');

const createSiteQuery = (_sites, params={}) => {
  return (dispatch) => {
    const sites = _sites.toString();
    const _id = generateUUID;

    dispatch(createStart({ id: _id }));

    sites.split(',').forEach(id => dispatch(createSiteStart({ id })));

    const query = { sites, ...params};
    return request('GET', query).then(response => {
      const groups = groupBy(response.timeSeries, time => time.sourceInfo.siteCode[0].value);

      // create sites
      Object.keys(groups).forEach((key) => {
        try {
          const timeSeries = groups[key];
          dispatch(createSiteSuccess(({ id: key, ...timeSeries[0].sourceInfo, timeSeries })));
        } catch (e) {
          dispatch(createSiteError(e, { id: key }));
        }
      });
      return dispatch(createSuccess({ id: _id, ...response.timeSeries }));
    }).catch(err => dispatch(createError(err.message, { id: sites }, err.response.statusText)));
  };
}

export { createSiteQuery };
