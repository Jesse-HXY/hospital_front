import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import department from '@/components/department'
import arrangementRegulation from '@/components/arrangementRegulation'
import arrangement from '@/components/arrangement'
import user from '@/components/user'
import registrationLevel from '@/components/registrationLevel'
import examnationItem from '@/components/examnationItem'
import disease from '@/components/disease'
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
      path:"/arrangementRegulation",
      name:'arrangementRegulation',
      component:arrangementRegulation
    },
    {
      path:'/arrangement',
      name:'arrangement',
      component:arrangement
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
    {
      path:'/examnationItem',
      name:'/examnationItem',
      component:examnationItem
    },
    {
      path:'/disease',
      name:'disease',
      component:disease
    }
  ]
})
//
