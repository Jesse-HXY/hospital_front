<template>
    <el-container>
      <el-aside width="40%" style="margin-top: -20px">
        <el-header style="text-align: left;">
          <el-tag>医技模版：</el-tag>
            <el-button type="text" icon="el-icon-circle-plus-outline" style="float: right;">添加模版</el-button>
        </el-header>
        <el-main>

          <el-header style="text-align: left; font-size: 12px;margin-top: -20px;margin-left: -20px;">
            <template>
              名称：
              <div style="width: 200px;display: inline-block;">
                <el-input></el-input>
              </div>
              &nbsp&nbsp&nbsp&nbsp范围：
              <div style="width: 150px;display: inline-block">
                <el-select>
                  <el-option label="全院" value="全院"></el-option>
                  <el-option label="个人" value="个人"></el-option>
                </el-select>
              </div>
            </template>
          </el-header>
          <el-header style="text-align: left; font-size: 12px;margin-left: -20px;">
            <template>
              类型：
              <div style="width: 150px;display: inline-block">
                <el-select>
                  <el-option label="检查" value="检查"></el-option>
                  <el-option label="检验" value="检验"></el-option>
                  <el-option label="处置" value="处置"></el-option>
                </el-select>
              </div>
              <el-button type="primary">查询</el-button>
            </template>
          </el-header>
          <!--模版表格-->
          <el-table
          :data="templateList"
          >
            <el-table-column
            label="模版名称"
            prop="tName"
            ></el-table-column>
            <el-table-column
              width="165"
              label="创建时间"
              prop="time"
            ></el-table-column>
            <el-table-column
              label="范围"
              prop="scope"
            ></el-table-column>
            <el-table-column
              label="类型"
              prop="type"
            ></el-table-column>
            <el-table-column
              label="查看"
            ><el-button type="text">查看详情</el-button></el-table-column>
          </el-table>
        </el-main>
      </el-aside>
      <!--模版操作-->
      <el-main>
        <el-header style="text-align: left;">
          <el-tag>操作</el-tag>
          <div style="float:right;">
            <el-button type="text" icon="el-icon-check">修改模版</el-button>
            <el-button type="text" icon="el-icon-delete">删除模版</el-button>
          </div>
        </el-header>
        <el-header>模版明细：</el-header>
        <el-form :label-position="right" label-width="120px">
          <el-form-item label="模版名称：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="创建时间："></el-form-item>
          <el-form-item label="适用范围：" style="text-align: left;">
            <el-select>
              <el-option label="全院" value="全院"></el-option>
              <el-option label="个人" value="个人"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="适用范围：" style="text-align: left;">
            <el-select>
              <el-option label="检查" value="检查"></el-option>
              <el-option label="检验" value="检验"></el-option>
              <el-option label="处置" value="处置"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button size="large" type="primary" style="float:left;">增加检验项目</el-button>
        <el-table
          :data="itemList">
          <el-table-column
          label="项目编码"
          prop="itemCode"
          ></el-table-column>
          <el-table-column
            label="项目名称"
            prop="itemName"
            width="300"
          ></el-table-column>
          <el-table-column
            label="项目规格"
            prop="itemSpecification"
            width="85"
          ></el-table-column>
          <el-table-column
            label="检查部位"
            prop="itemPart">
          </el-table-column>
          <el-table-column
            label="操作"
            ><el-button type="danger" size="small">操作</el-button></el-table-column>
        </el-table>
      </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "medicalTemplateManagement",
      data(){
          return{
            templateList:[{tName:'小儿感冒',time:'2019-6-3 00:00:00',scope:'全院',type:'检查'},{tName:'小儿感冒',time:'2019-6-3 00:00:00',scope:'全院',type:'检查'},{tName:'小儿感冒',time:'2019-6-3 00:00:00',scope:'全院',type:'检查'},{tName:'小儿感冒',time:'2019-6-3 00:00:00',scope:'全院',type:'检查'}],
            itemList:[{itemCode:123124,itemName:'大抢救',itemSpecification:'日',itemPart:'全身'},{itemCode:123124,itemName:'大抢救',itemSpecification:'日',itemPart:'全身'}]
          }
      }
    }
</script>

<style scoped>

</style>
