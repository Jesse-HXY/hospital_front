<template>
   
  <el-container>
    <el-aside width="40%">
      <el-header>

        <el-row class="bg-purple-light">
          <el-col :span="12">
            <div class="grid-content "  align="left">
              <el-tag hit="true">中药处方模板</el-tag>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content " >
              <el-button type="text"  icon="el-icon-circle-plus">新建模板</el-button></div>
          </el-col>
        </el-row>
      </el-header>
      <el-main align="left">
        <el-row >
          <el-col :span="3"><div class="grid-content">名称：</div></el-col>
          <el-col :span="8">
            <div class="grid-content "  align="left">

              <el-input placeholder="请输入名称"></el-input>
            </div>
          </el-col>

          <el-col :span="3"><div class="grid-content">&nbsp&nbsp&nbsp&nbsp范围：</div></el-col>
          <el-col :span="8">
            <div class="grid-content " >

              <el-select v-model="value" placeholder="所有">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

            </div>
          </el-col>
        </el-row>
        <el-button align='left' type="primary">查询</el-button>
      </el-main>
      <el-footer>
        <el-table :data="templateList">
          <el-table-column label="模板名称" prop="templateName"></el-table-column>
          <el-table-column label="创建时间" prop="templateCreateTime"></el-table-column>
          <el-table-column label="范围" prop="templateCategory"></el-table-column>
        </el-table>
      </el-footer>
    </el-aside>
    <el-main>

      <el-header>
        <el-row :gutter="20" class=" bg-purple-light">
          <el-col :span="8" align="left">
            <div class="grid-content">
              <el-button type="info" >操作:</el-button>
            </div></el-col>

          <el-col :span="16" align="center">
            <div class="grid-content ">
              <el-button type="text" icon="el-icon-circle-plus">增加药品</el-button>
              <el-button type="text" icon="el-icon-remove">删除药品</el-button>
              <el-button type="text" icon="el-icon-circle-check">修改模板</el-button>
              <el-button type="text" icon="el-icon-delete">删除模板</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col > <div><el-card shadow="hover" >模板明细:</el-card></div></el-col>
        </el-row>
        <el-row >
          <el-col :span="3"><div class="grid-content">模板名称：</div></el-col>
          <el-col :span="8">
            <div class="grid-content "  align="left">

              <el-input placeholder="请输入模板名称"></el-input>
            </div>
          </el-col>

          <el-col :span="8"><div class="grid-content">&nbsp&nbsp&nbsp&nbsp模板范围：</div></el-col>
          <el-col :span="4">
            <div class="grid-content ">

              <el-select v-model="value" placeholder="全院">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

            </div>
          </el-col>
        </el-row>


        <el-table :data="medicineList">
          <el-table-column
            width="25px"><el-checkbox></el-checkbox></el-table-column>
          <el-table-column label="药品名称" prop="mName"></el-table-column>
          <el-table-column label="规格" prop="mSpecification"></el-table-column>
          <el-table-column label="单位" prop="mUnit"></el-table-column>
          <el-table-column label="用法" prop="mUsage"></el-table-column>
          <el-table-column label="用量" prop="mAmount"></el-table-column>
          <el-table-column label="频次" prop="mTimes"></el-table-column>
        </el-table>

      </el-header>






    </el-main>
  </el-container>
</template>

<script>
  export default {
    data() {
      let mid=0;
      let mName='';
      let mSpecification='';
      let mUnit='';
      let mUsage=''; // 用法
      let mAmount=''; //用量
      let mTimes=''; // 频次
      let medicineList=[]
      let templateName='';
      let templateCreateTime='';
      let templateCategory='';
      let templateList=[];


      return {
        mid :mid,
        mName:mName,
        mSpecification:mSpecification,
        mUnit:mUnit,
        mUsage:mUsage,
        mAmount:mAmount,
        mTimes:mTimes,
        templateName:templateName,
        templateCreateTime:templateCreateTime,
        templateCategory:templateCategory,

        formLabelWidth:'120 px',
        templateList:[{templateName:'感冒',templateCreateTime:'2019/02/02',templateCategory:'全院'},
          {templateName:'腮腺炎',templateCreateTime:'2019/09/02',templateCategory:'个人'}],

        medicineList:[{mName:'肾宝片',mSpecification:'1000ml/g',mUnit:'1',mUsage:'Papa',mAmount:'1',mTimes:'1'}],
        options: [{
          value: '选项1',
          label: '全院'
        }, {
          value: '选项2',
          label: '科室'
        }, {
          value: '选项3',
          label: '个人'
        }],
        value: ''
      }
    }
  }
</script>
<style>
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
