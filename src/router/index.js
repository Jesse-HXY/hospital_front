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
import registrationMain from '@/components/workstation/registrationMain'
import applyDispose from '@/components/workstation/applyDispose'
import medicinePrescription from '@/components/workstation/medicinePrescription'
import herbalPrescription from '@/components/workstation/herbalPrescription'
import medicalTemplateManagement from '@/components/workstation/medicalTemplateManagement'
import westernMedicine_template from '@/components/workstation/westernMedicine_template'
import chineseMedicine_template from '@/components/workstation/chineseMedicine_template'
import charge from '@/components/registration/charge'
import medicalLaboratoryMain from '@/components/medicalLaboratory/medicalLaboratoryMain'
import financeOfDepartment from '@/components/financeManagement/financeOfDepartment'
import deliverMedicine from '@/components/medicineWorkStation/deliverMedicine'
import drugManagement from '@/components/medicineWorkStation/drugManagement'
import financeOfUser from '@/components/financeManagement/financeOfUser'
import index from '@/components/index'

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

      components:{
        default:workstation,
        registrationMain:registrationMain,
        applyDispose:applyDispose,
        medicinePrescription:medicinePrescription,
        herbalPrescription:herbalPrescription,
      }
    },
    {
      path:'/workstation/medicalTemplateManagement',
      name:'medicalTemplateManagement',
      component:medicalTemplateManagement
    },
    {
      path:'/workstation/westernMedicine_template',
      name:'westernMedicine_template',
      component:westernMedicine_template
    },
    {
      path:'/workstation/chineseMedicine_template',
      name:'chineseMedicine_template',
      component:chineseMedicine_template
    },
    {
      path:'/registration/charge',
      name:'charge',
      component:charge
    },
    {
      path:'/medicalLaboratory/medicalLaboratoryMain',
      name:'medicalLaboratoryMain',
      component:medicalLaboratoryMain
    },
    {
      path:'/financeManagement/financeOfDepartment',
      name:'financeOfDepartment',
      component:financeOfDepartment
    },
    {
      path: '/medicineWorkStation/deliverMedicine',
      name:'deliverMedicine',
      component:deliverMedicine
    },
    {
      path: '/medicineWorkStation/drugManagement',
      name:'drugManagement',
      component:drugManagement
    },
    {
      path:'/financeManagement/financeOfUser',
      name:'financeOfUser',
      component:financeOfUser
    },
    {
      path:'/',
      name:'index',
      component:index
    }
  ]
})
//
