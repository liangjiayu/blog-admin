﻿export default [
  // {
  //   path: '/user',
  //   layout: false,
  //   routes: [
  //     {
  //       path: '/user',
  //       routes: [
  //         {
  //           name: 'login',
  //           path: '/user/login',
  //           component: './User/login',
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    path: '/login',
    layout: false,
    component: './Login',
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
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
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
