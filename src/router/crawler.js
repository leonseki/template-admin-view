const crawlerRouters = [
  {
    path: '/crawler',
    meta: {
      parentTitle: '爬虫管理',
      noAuth: true
    },
    component: () => import('../views/NavBar'),
    children: [
      {
        path: 'index',
        name: 'crawlerIndex',
        meta: {
          title: '文章列表',
          noAuth: true
        },
        component: () => import('../views/crawler/index.vue'),

      }
    ]
  }
];

export default crawlerRouters
