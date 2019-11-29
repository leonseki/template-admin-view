const loginRouters = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import('../views/Login')
  }
]

export default loginRouters
