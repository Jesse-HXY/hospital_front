<template>
  <div id="app">
    <el-container style="height: 750px; border: 1px solid #eee">
      <el-aside style="width:15%">
        <el-menu>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-setting"></i>基础信息维护</template>
            <el-menu-item index="1-1">常数类别管理</el-menu-item>
            <router-link to="/department"><el-menu-item index="1-2">科室管理</el-menu-item></router-link>
            <router-link to="/user"><el-menu-item index="1-3">用户管理</el-menu-item></router-link>
            <router-link to="/registrationLevel"><el-menu-item index="1-4">挂号级别管理</el-menu-item></router-link>
            <el-menu-item index="1-5">诊断目录管理</el-menu-item>
            <router-link to="/nonMedicine"><el-menu-item index="1-6">非药品收费项目管理</el-menu-item></router-link>
            <el-menu-item-group>
              <template slot="title">医生排班管理</template>
              <router-link to="/arrangementRegulation"><el-menu-item index="1-7">生成排班规则</el-menu-item></router-link>
              <router-link to="/arrangement"><el-menu-item index="1-8">生成排班计划</el-menu-item></router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-setting"></i>门诊挂号收费</template>
            <router-link to="/registration"><el-menu-item index="2-1">现场挂号</el-menu-item></router-link>
            <el-menu-item index="2-2">退号</el-menu-item>
            <el-menu-item index="2-3">收费</el-menu-item>
            <el-menu-item index="2-4">退费</el-menu-item>
            <el-menu-item index="2-5">发票补打</el-menu-item>
            <el-menu-item index="2-6">发票重打</el-menu-item>
            <el-menu-item index="2-7">患者费用查询</el-menu-item>
            <el-menu-item index="2-8">收费员日结</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>门诊医生工作站</template>
            <el-menu-item index="3-1">门诊病历首页</el-menu-item>
            <el-menu-item index="3-2">检查申请</el-menu-item>
            <el-menu-item index="3-3">检验申请</el-menu-item>
            <el-menu-item index="3-4">门诊确诊</el-menu-item>
            <el-menu-item index="3-5">处置申请</el-menu-item>
            <el-menu-item index="3-6">成药处方</el-menu-item>
            <el-menu-item index="3-7">草药处方</el-menu-item>
            <el-menu-item index="3-8">诊毕</el-menu-item>
            <el-menu-item index="3-9">患者费用明细查询</el-menu-item>
            <el-menu-item index="3-10">医技模板管理</el-menu-item>
            <el-menu-item index="3-11">西药处方模板管理</el-menu-item>
            <el-menu-item index="3-12">中药处方模板管理</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-setting"></i>门诊医技工作站</template>
            <el-menu-item index="4-1">患者检查</el-menu-item>
            <el-menu-item index="4-2">患者检验</el-menu-item>
            <el-menu-item index="4-3">患者处置</el-menu-item>
            <el-menu-item index="4-4">医技管理</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-setting"></i>门诊药房工作站</template>
            <el-menu-item index="5-1">门诊发药</el-menu-item>
            <el-menu-item index="5-2">门诊退药</el-menu-item>
            <el-menu-item index="5-3">药品管理</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-setting"></i>门诊财务管理</template>
            <el-menu-item index="6-1">费用科目管理</el-menu-item>
            <el-menu-item index="6-2">门诊日结核对</el-menu-item>
            <el-menu-item index="6-3">门诊科室工作量统计</el-menu-item>
            <el-menu-item index="6-4">门诊医生工作量统计</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'App'
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
</style>

<script>
export default {
  name: 'App'
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
</style>
