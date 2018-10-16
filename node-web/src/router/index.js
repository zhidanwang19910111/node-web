import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import list from '@/components/list'

import admin from '@/components/admin'
import adminIndex from '@/components/adminIndex'
import adminUser from '@/components/adminUser'

import catalog from '@/components/catalog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/admins',
      name: 'admins',
      component: admin,
      redirect: '/admins/index',
      children: [
        {
          path: 'index',
          component: adminIndex
        },
        {
          path: 'user',
          component: adminUser
        },
        {
          path: 'catalog',
          component: catalog
        }
    ]
    }
  ],
  mode: 'history'
})
