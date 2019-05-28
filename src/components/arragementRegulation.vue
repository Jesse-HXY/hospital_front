<template>
  <el-container>
    <el-header>
      新增排班规则
    </el-header>
    <el-header>
      <template>
        科室名称：
        <div style="width: 10%;display: inline-block">
          <el-select v-model="departmentNamel" placeholder="选择挂号等级">
            <el-option label="专家号" value="专家号"></el-option>
            <el-option label="普通号" value="普通号"></el-option>
            <el-option label="急诊号" value="急诊号"></el-option>
          </el-select>
        </div>
        &nbsp&nbsp&nbsp&nbsp挂号等级：
        <div style="width: 10%;display: inline-block">
          <el-select v-model="registrationLevel" placeholder="选择挂号等级">
            <el-option label="专家号" value="专家号"></el-option>
            <el-option label="普通号" value="普通号"></el-option>
            <el-option label="急诊号" value="急诊号"></el-option>
          </el-select>
        </div>
      </template>
      &nbsp&nbsp&nbsp&nbsp
      <el-button width="100">查询</el-button>
      <el-button width="100">增加</el-button>
    </el-header>
    <el-main>
      <el-table
        stripe
        :data ="userList"
        style="width: 100%">
        <el-table-column
          prop="name"
          width = 100px
          label="医生姓名"></el-table-column>
        <el-table-column
          width = 100px
          label="星期一上午">
          <el-checkbox></el-checkbox>
        </el-table-column>
        <el-table-column
          width = 100px
          label="星期一下午"><el-checkbox></el-checkbox></el-table-column>
        <el-table-column
          width = 100px
          label="星期二上午"><el-checkbox></el-checkbox></el-table-column>
        <el-table-column
          width = 100px
          label="星期二下午"><el-checkbox></el-checkbox></el-table-column>
        <el-table-column
          width = 100px
          label="星期三上午"><el-checkbox></el-checkbox></el-table-column>
        <el-table-column
          width = 100px
          label="星期三下午"><el-checkbox></el-checkbox></el-table-column>
        <el-table-column
          width = 100px
          label="星期四上午"><el-checkbox></el-checkbox></el-table-column>
        <el-table-column
          width = 100px
          label="星期四下午"><el-checkbox></el-checkbox></el-table-column>
        <el-table-column
          width = 100px
          label="星期五上午"><el-checkbox></el-checkbox></el-table-column>
        <el-table-column
          width = 100px
          label="星期五下午"><el-checkbox></el-checkbox></el-table-column>
        <el-table-column
          width = 100px
          label="星期六上午"><el-checkbox></el-checkbox></el-table-column>
        <el-table-column
          width = 100px
          label="星期六下午"><el-checkbox></el-checkbox></el-table-column>
        <el-table-column
          width = 100px
          label="星期日上午"><el-checkbox></el-checkbox></el-table-column>
        <el-table-column
          width = 100px
          label="星期日下午"><el-checkbox></el-checkbox></el-table-column>

      </el-table>
    </el-main>
    <el-footer>规则名称：
      <div style="width: 10%;display: inline-block">
        <el-input
          v-model="aRName"
          size="mini"
          placeholder="排班规则名称"
        />
      </div>
    </el-footer>
    <el-footer>
      <el-button width="100">取消</el-button>
      <el-button width="100">保存</el-button>
    </el-footer>

  </el-container>
</template>

<script>
    export default {
      name: "arragementRegulation",
      data(){
        /**排班规则所属科室*/
        let departmentName = '';
        /**排班规则挂号等级*/
        let registrationLevel = '';
        /** 规则名称 */
        let aRName = '';
          let userList = [{name:"扁鹊"},{name:"华佗"},{name:"霍去病"}];
        return{
          aRName:aRName,
          registrationLevel:registrationLevel,
          departmentName:departmentName,
          userList:userList
        }
      },

    }
</script>

<style scoped>

</style>
