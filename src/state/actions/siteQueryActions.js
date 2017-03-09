import reduxCrud from 'redux-crud';
import groupBy from 'lodash.groupby';
import { request } from 'utils';

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
    dispatch(createStart({ id: sites }));

    sites.split(',').forEach(id => dispatch(createSiteStart({ id })));

    const query = { sites, ...params};
    return request('GET', query).then(response => {
      const groups = groupBy(response.timeSeries, time => time.sourceInfo.siteCode[0].value);
      Object.keys(groups).forEach((key) => {
        try {
          const firstSeriesInGroup = groups[key][0];
          dispatch(createSiteSuccess(({ id: key, ...firstSeriesInGroup.sourceInfo })));
        } catch (e) {
          dispatch(createSiteError(e, { id: key }));
        }
      });
      return dispatch(createSuccess({ id: sites, ...response.queryInfo }));
    }).catch(err => dispatch(createError(err.message, { id: sites }, err.response.statusText)));
  };
}

export { createSiteQuery };
