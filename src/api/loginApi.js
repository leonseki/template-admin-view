import axiosInstance from '../interceptors/axios';

const LOGIN = '/api/login';
const VERIFICATION_LOGIN = '/api/login/verificationCodeLogin';
const GET_VERIFICATION_CODE = '/api/login/getVerificationCode';
const GET_ACCOUNT_INFO = '/api/login/getAccountInfo';

export default {
  // 密码登录
  login({email, password}) {
    return axiosInstance.post(LOGIN, {email, password})
  },

  // 验证码登录
  verificationLogin({email, code}) {
    return axiosInstance.post(VERIFICATION_LOGIN, {email, code})
  },

  // 获取邮箱验证码
  getMessageCode({email}) {
    return axiosInstance.get(GET_VERIFICATION_CODE, {
      params: { email }
    })
  },
  // 获取用户基本信息
  getAccountInfo() {
    return axiosInstance.get(GET_ACCOUNT_INFO)
  }
}
