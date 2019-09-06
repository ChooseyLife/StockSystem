// 菜单 顶栏
export default [
  // { path: '/index', title: '首页', icon: 'home' },
  {
    title: '用户模块',
    icon: 'folder-o',
    children: [
      { path: '/member', title: '客户管理' },
      { path: '/company', title: '承运公司管理' },
      { path: '/mailiCost', title: '寄件运算结算管理' },
      { path: '/otherCost', title: '杂费入账' },
      { path: '/account', title: '生成账单' },
      { path: '/backup', title: '备份与恢复' }
    ]
  }
]
