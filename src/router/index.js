import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import department from '@/components/management/department'
import arrangementRegulation from '@/components/management/arrangementRegulation'
import arrangement from '@/components/management/arrangement'
import user from '@/components/management/user'
import registrationLevel from '@/components/management/registrationLevel'
import examnationItem from '@/components/management/examnationItem'
import registration from '@/components/registration/registration'
import withdraw from '@/components/registration/withdraw'
import disease from '@/components/management/disease'
import workstation from '@/components/workstation/workstation'
import axios from 'axios'
Vue.prototype.axios = axios
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/management/department',
      name:'department',
      component: department
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:"/management/arrangementRegulation",
      name:'arrangementRegulation',
      component:arrangementRegulation
    },
    {
      path:'/management/arrangement',
      name:'arrangement',
      component:arrangement
    },
    {
      path:'/management/user',
      name:'user',
      component:user
    },
    {
      path:'/management/disease',
      name:'/disease',
      component:disease
    },
    {
      path:'/management/registrationLevel',
      name:'registrationLevel',
      component:registrationLevel
    },
    {
      path:'/management/examnationItem',
      name:'examnationItem',
      component:examnationItem
    },
    {
      path:'/registration/registration',
      name:'registration',
      component:registration
    },
    {
      path:'/registration/withdraw',
      name:'/withdraw',
      component:withdraw
    },
    {
      path:'/workstation/workstation',
      name:'workstation',
      component:workstation
    }
  ]
})
//
