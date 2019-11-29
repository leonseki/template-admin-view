const articleRouters = [
  {
    path: '/article',
    meta: {
      parentTitle: '内容管理',
      noAuth: true
    },
    component: () => import('../views/NavBar'),
    children: [
      {
        path: 'index',
        name: 'ArticleIndex',
        meta: {
          title: '文章列表',
          noAuth: true
        },
        component: () => import('../views/article/index.vue'),

      }
    ]
  }
];

export default articleRouters
