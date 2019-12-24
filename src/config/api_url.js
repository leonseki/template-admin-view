import env from './env'
const API_URL = {
  // local: '//localhost:3000',
  local: '//111.231.94.127:3000',
  dev: location.origin,
  test: location.origin,
  pro: location.origin,

};
const apiUrl = env && API_URL[env] ? API_URL[env] : API_URL['local'];

export default apiUrl
