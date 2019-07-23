// 菜单 侧边栏
export default [
  // { path: '/index', title: '首页', icon: 'home' },
  {
    title: '用户模块',
    icon: 'folder-o',
    children: [
      { path: '/page1', title: '用户管理' },
      { path: '/page2', title: '产品管理' },
      { path: '/page3', title: '数据报表' }
    ]
  }
]
