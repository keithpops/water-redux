import request from 'utils/request';
import { SITES, PARAMETER_CODES } from '../helpers/constants';

describe('utils/request', () => {
  let response = null;

  before(() => {
    const query = {
      sites: SITES.join(','),
      parameterCd: PARAMETER_CODES.join(','),
      period: 'P1D',
    };

    return request('GET', query).then(res => response = res);
  });

  it('should return a response', () => expect(response).to.exist);
});
