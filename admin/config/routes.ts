﻿const baseRoutes = [
  {
    path: '/login',
    layout: false,
    component: './Login',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
];

const AuthRoutes = [
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/article',
    name: '文章',
    routes: [
      { path: '/article', redirect: '/article/list' },
      {
        path: '/article/list',
        name: '文章列表',
        component: './ArticleList',
      },
      {
        path: '/article/add',
        hideInMenu: true,
        name: '新增文章',
        component: './ArticleAdd',
      },
    ],
  },
  {
    path: '/System',
    name: '系统管理',
    routes: [
      {
        path: '/System/Menu',
        name: '菜单管理',
        component: './System/Menu',
      },
      {
        path: '/System/Role',
        name: '角色管理',
        component: './System/Role',
      },
    ],
  },
  {
    path: '/demo',
    name: '测试菜单',
    routes: [
      {
        path: '/demo/one',
        name: '测试菜单ONE',
        component: './demo/one',
      },
    ],
  },
];

const handleAuthRoutes = (routes) => {
  const result: any[] = [];
  routes.forEach((item) => {
    const row: any = { ...item, access: 'roleAuth' };

    if (item.routes && item.routes.length) {
      row.routes = handleAuthRoutes(item.routes);
    }
    result.push(row);
  });

  return result;
};

export default [
  ...baseRoutes,
  ...handleAuthRoutes(AuthRoutes),
  {
    component: './404',
  },
];
