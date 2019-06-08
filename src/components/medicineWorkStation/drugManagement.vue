<template>
       
  <el-container>
    <el-header>
      <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content ">
          <el-input placeholder="请输入药品助记码"></el-input>
        </div></el-col>
      <el-col :span="6"><div class="grid-content "><el-button type="primary" icon="el-icon-view">查询药品</el-button></div></el-col>
      <el-col :span="6"><div class="grid-content "><el-button type="primary" icon="el-icon-edit">新增药品</el-button></div></el-col>
      <el-col :span="6"><div class="grid-content "><el-button type="primary" icon="el-icon-sell">导入药品</el-button></div></el-col>
    </el-row>
    </el-header>
    <el-main>
      <el-table :data="medicineList">
        <el-table-column
          width="25px"><el-checkbox></el-checkbox></el-table-column>
        <el-table-column
        label="药品编码"
        prop-=""></el-table-column>
        <el-table-column
          label="药品名称"
          prop-=""></el-table-column>
        <el-table-column
          label="药品规格"
          prop-=""></el-table-column>
        <el-table-column
          label="药品单位"
          prop-=""></el-table-column>
        <el-table-column
          label="药品单价"
          prop-=""></el-table-column>
        <el-table-column
          label="药品剂型"
          prop-=""></el-table-column>
        <el-table-column
          label="药品类型"
          prop-=""></el-table-column>
        <el-table-column
          label="操作"
          prop-="">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              @click="handleAdd(scope.$index, scope.row)" v-if="scope.$index == editIndex">添加</el-button>
            <el-button
              size="mini" v-else disabled>添加</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="onTapGiveUp" v-if="scope.$index == editIndex">放弃</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)" v-else>删除</el-button>
          </template>
        </el-table-column>

      </el-table>



    </el-main>
  </el-container>
</template>
<style></style>
<script>
    export default {

        data() {
          let mCode='';
          let mName='';
          let mSpecification='';
          let mUnit='';
          let mSinglePrice=0;
          let mFormulation=''; // 药品剂型
          let mType=''; //药品类型

            return {
               mCode:mCode,
               mName:mName,
               mSpecification:mSpecification,
               mUnit:mUnit,
               mSinglePrice:mSinglePrice,
               mFormulation:mFormulation,// 药品剂型
               mType:mType, //药品类型
               medicineList:[{}]
            }
        }
    }
</script>
