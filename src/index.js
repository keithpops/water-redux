import middleware from './config/middleware';
import reducers from './state/reducers';

export * from './state/actions';

export const reducer = reducers;
export const waterMiddleware = middleware;
