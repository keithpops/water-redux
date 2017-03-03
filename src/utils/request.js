import axios from 'axios';
import queryString from 'query-string';
import _ from 'lodash';

const API_BASE = 'https://waterservices.usgs.gov/nwis/iv/'
const DEFAULT_QUERY = {
  format: 'json',
};

axios.defaults.baseURL = API_BASE;
axios.defaults.headers.common['Content-Type'] = 'application/json';

const FiveHundredError = {
  errors: [{
    code: "errors.server.internal",
    title: "Internal Server Error",
    status: 500
  }],
};

const handleResponse = (response) => {
  const { data, status, statusText } = response;
  if (status >= 200 && status < 300) {
    if (statusText === 'NO CONTENT' || status === 204) { return true; }
    try {
      return data.value;
    } catch(e) {
      return `water-redux: Response body could not be parsed as JSON. (Status Code: ${status})`;
    }
  }
  if (status === 500) { throw FiveHundredError; }
  try {
    throw data
  } catch(e) {
    throw `water-redux: Response body could not be parsed as JSON. (Status Code: ${status})`;
  }
}

export default async (method, query={}, body) => {
  const path = queryString.stringify(_.merge(DEFAULT_QUERY, query));

  try {
    return await axios.get(`?${path}`).then(handleResponse);
  } catch(e) {
    throw new Error(e);
  }
}
