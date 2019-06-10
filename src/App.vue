<template>
  <div id="app">
    <el-container style="height: 1000px; border: 1px solid #eee; margin-top: -60px;">
      <el-aside style="height: 100%;width: auto;margin-top: 40px;">
        <div v-if="isCollapse"><el-button type="text" @click="isCollapse=false" size="mini">展开</el-button></div>
        <div v-else><el-button type="text" @click="isCollapse=true">收起</el-button></div>
        <el-menu class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-submenu index="0" style="text-align: left">
            <template slot="title"><i class="el-icon-office-building"></i><span style="font-weight:bold;">东软云医院首页</span></template>
            <router-link to="/">
              <el-menu-item>
                返回首页
              </el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu index="1" style="text-align: left;">
            <template slot="title"><i class="el-icon-setting"></i><span style="font-weight:bold;">基础信息维护</span></template>
            <router-link to="/management/department"><el-menu-item index="1-2">科室管理</el-menu-item></router-link>
            <router-link to="/management/user"><el-menu-item index="1-3">用户管理</el-menu-item></router-link>
            <router-link to="/management/registrationLevel"><el-menu-item index="1-4">挂号级别管理</el-menu-item></router-link>
            <router-link to="/management/disease"><el-menu-item index="1-5">诊断目录管理</el-menu-item></router-link>
            <router-link to="/management/examnationItem"><el-menu-item index="1-6">非药品收费项目管理</el-menu-item></router-link>
            <el-menu-item-group>
              <template slot="title">医生排班管理</template>
              <router-link to="/management/arrangementRegulation"><el-menu-item index="1-7">生成排班规则</el-menu-item></router-link>
              <router-link to="/management/arrangement"><el-menu-item index="1-8">生成排班计划</el-menu-item></router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2" style="text-align: left">
            <template slot="title"><i class="el-icon-wallet"></i><span style="font-weight:bold;">门诊挂号收费</span></template>
            <router-link to="/registration/registration"><el-menu-item index="2-1">现场挂号</el-menu-item></router-link>
            <router-link to="/registration/withdraw"><el-menu-item index="2-2">退号</el-menu-item></router-link>
            <router-link to="/registration/charge"><el-menu-item index="2-3">收费</el-menu-item></router-link>
            <router-link to="/registration/withdraw"> <el-menu-item index="2-4">退费</el-menu-item></router-link>
            <el-menu-item index="2-5">发票补打</el-menu-item>
            <el-menu-item index="2-6">发票重打</el-menu-item>
            <el-menu-item index="2-7">患者费用查询</el-menu-item>
          </el-submenu>
          <el-submenu index="3" style="text-align: left;">
            <template slot="title"><i class="el-icon-first-aid-kit"></i><span style="font-weight:bold;">门诊医生工作站</span></template>
            <router-link to="/workstation/workstation"><el-menu-item index="3-1">门诊病历首页</el-menu-item></router-link>
            <router-link to="/workstation/medicalTemplateManagement"><el-menu-item index="3-10">医技模板管理</el-menu-item></router-link>
            <router-link to="/workstation/westernMedicine_template"><el-menu-item index="3-11">西药处方模板管理</el-menu-item></router-link>
            <router-link to="/workstation/chineseMedicine_template"><el-menu-item index="3-12">中药处方模板管理</el-menu-item></router-link>
          </el-submenu>
          <el-submenu index="4" style="text-align: left;">
            <template slot="title"><i class="el-icon-suitcase"></i><span style="font-weight:bold;">门诊医技工作站</span></template>
            <router-link to="/medicalLaboratory/medicalLaboratoryMain"><el-menu-item index="4-1">门诊医技工作站</el-menu-item></router-link>
          </el-submenu>
          <el-submenu index="5" style="text-align: left;">
            <template slot="title"><i class="el-icon-help"></i><span style="font-weight:bold;">门诊药房工作站</span></template>
            <router-link to="/medicineWorkStation/deliverMedicine"><el-menu-item index="5-1">门诊发药</el-menu-item></router-link>
            <router-link to="/medicineWorkStation/drugWithdrawal"><el-menu-item index="5-2">门诊退药</el-menu-item></router-link>
           <router-link to="/medicineWorkStation/drugManagement"> <el-menu-item index="5-3">药品管理</el-menu-item></router-link>
          </el-submenu>
          <el-submenu index="6" style="text-align: left;">
            <template slot="title"><i class="el-icon-document"></i><span style="font-weight:bold;">门诊财务管理</span></template>
            <router-link to="/financeManagement/dailySettlement"><el-menu-item index="6-2">门诊日结核对</el-menu-item></router-link>
            <router-link to="/financeManagement/financeOfDepartment"><el-menu-item index="6-3">门诊科室工作量统计</el-menu-item></router-link>
            <router-link to="/financeManagement/financeOfUser"><el-menu-item index="6-4">门诊医生工作量统计</el-menu-item></router-link>
          </el-submenu>
        </el-menu>

      </el-aside>
      <el-container>
          <el-header style="text-align: right;height: 40px;">
              <div class="grid-content ">
                <template >
                  <el-button type="text" @click="onTapLogin" v-show="showLogin">登录</el-button>
                  <el-tag v-show="!showLogin">{{username}}</el-tag>
                  <el-button type="text" @click="logout">注销</el-button>
                </template>
              </div>
          </el-header>

        <el-dialog
          title="登陆"
          :visible.sync="centerDialogVisible"
          width="30%"
          center>
          <span>用户名<el-input v-model="uId" placeholder="请输入用户名"></el-input></span>
          <br><br>
          <span>密码<el-input type="password" v-model="password" placeholder="请输入密码"></el-input></span>

          <span slot="footer" class="dialog-footer">
            <el-button @click.native="handleShow">取 消</el-button>
            <el-button type="primary" @click.native="handleShow" >确 定</el-button>
          </span>
        </el-dialog>

        <router-view></router-view>

      </el-container>

    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return {
        showLogin:true,
        uId:'',
        username:'',
        password:'',
        isCollapse: true,
        centerDialogVisible:false
      }
    },created:function(){
      console.log("1111")
      console.log(this.$cookie.get('uId'))
      if(this.$cookie.get('uId') !== null){
        this.username = this.$cookie.get('username')
        this.uId = this.$cookie.get('uId')
        this.showLogin=false;
      }
    }, methods:{
      handleShow:function () {
        let that = this
        this.$axios({
          url:'user/login',
          method:'post',
          data:{
            uId:that.uId,
            uPassword:that.password
          }
        }).then(response=>{
          console.log(response.data)
          if(response.data!==null){
            that.username = response.data.uNickName
            this.showLogin=false;
            this.centerDialogVisible=false;
            this.$cookie.set('uId', response.data.uId);
            this.$cookie.set('username', response.data.uNickName);
          }else{
            alert("账号或者密码错误")
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      /**
       * 注销
       */
      logout:function () {
        this.showLogin=true;
        this.$cookie.delete('uId')
        this.$cookie.delete('username')
      },
      /**
       * 登陆
       */
      onTapLogin:function () {
        this.centerDialogVisible=true
        this.uId = this.$cookie.get('uId')
      }
    }

  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>



