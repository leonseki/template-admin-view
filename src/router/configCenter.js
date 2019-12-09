const articleRouters = [
  {
    path: '/config',
    meta: {
      parentTitle: '配置中心',
      noAuth: true
    },
    component: () => import('../views/NavBar'),
    children: [
      {
        path: 'imageIndex',
        name: 'ImageIndex',
        meta: {
          title: '图片列表',
          noAuth: true
        },
        component: () => import('../views/config-center/ImageIndex.vue')
      }
    ]
  }
];

export default articleRouters
