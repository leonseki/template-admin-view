// 完整导航栏
const navigation= [
  {
    title: '概览',
    icon: 'ios-navigate',
    titleName: 'main',
    subItems: []
  },
  {
    title: '配置中心',
    icon: 'md-settings',
    subItems: [
      {
        title: '图片配置', icon: 'md-images', name: 'ImageIndex'
      }
    ]
  },
  {
    title: '内容管理',
    icon: 'ios-list-box',
    subItems: [
      {
        title: '文章列表', icon: 'ios-book', name: 'ArticleIndex'
      }
    ]
  },
  {
    title: '系统管理',
    icon: 'md-build',
    subItems: [
      {
        title: '账号列表', icon: 'md-people', name: 'account',
      },
    ]
  },
  {
    title: 'Crawler',
    icon: 'md-paw',
    subItems: [
      {
        title: '文章列表', icon: 'ios-book', name: 'crawlerIndex',
      },
    ]
  }
];

export default navigation
