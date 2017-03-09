import { combineReducers } from 'redux';
import logs from './logs';
import sites from './sites';
import timeSeries from './timeSeries';

export default combineReducers({
  logs,
  sites,
  timeSeries,
});
