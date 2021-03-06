import reduxCrud from 'redux-crud';
import groupBy from 'lodash.groupby';
import {
  generateUUID,
  constants,
  request,
} from 'utils';

const __acf = (string) => `${constants.REDUX_CRUD_PREFIX}${string}`

const {
  createStart,
  createSuccess,
  createError,
} = reduxCrud.actionCreatorsFor(__acf('site_query'));

const {
  createStart: createSiteStart,
  createSuccess: createSiteSuccess,
  createError: createSiteError,
} = reduxCrud.actionCreatorsFor(__acf('site'));

const {
  createStart: createLogStart,
  createSuccess: createLogSuccess,
  createError: createLogError,
} = reduxCrud.actionCreatorsFor(__acf('log'));

const createSiteQuery = (_sites, params={}) => {
  return (dispatch) => {
    const sites = _sites.toString();
    const _id = generateUUID;

    dispatch(createStart({ id: _id }));
    dispatch(createLogStart({ id: _id }));

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

      // create log
      try {
        dispatch(createLogSuccess({ id: _id, ...response.queryInfo }))
      } catch (e) {
        dispatch(createLogError(e, { id: _id }));
      }
      
      return dispatch(createSuccess({ id: _id, ...response.timeSeries }));
    }).catch(err => dispatch(createError(err.message, { id: sites }, err.response.statusText)));
  };
}

export { createSiteQuery };
