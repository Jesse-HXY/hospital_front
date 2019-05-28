import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import department from '@/components/department'
import arragementRegulation from '@/components/arragementRegulation'
import arragement from '@/components/arragement'
import user from '@/components/user'
import registrationLevel from '@/components/registrationLevel'
import axios from 'axios'
Vue.prototype.axios = axios
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/department',
      name:'department',
      component: department
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:"/arragementRegulation",
      name:'arragementRegulation',
      component:arragementRegulation
    },
    {
      path:'/arragement',
      name:'arragement',
      component:arragement
    },
    {
      path:'/user',
      name:'user',
      component:user
    },
    {
      path:'/registrationLevel',
      name:'registrationLevel',
      component:registrationLevel
    },
  ]
})
