import env from './env'
const API_URL = {
  local: '//localhost:3000',
  dev: '',
  test: '',
  pro: ''
};
const apiUrl = env && API_URL[env] ? API_URL[env] : API_URL['local'];

export default apiUrl
