import { combineReducers } from 'redux';
import logs from './logs';
import sites from './sites';

export default combineReducers({
  logs,
  sites,
});
