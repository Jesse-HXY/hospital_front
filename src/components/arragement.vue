<template>
    <el-container>
      <el-header>排班规则列表</el-header>
      <el-header>
        科室选择:
        <div style="width: 10%;display: inline-block">
          <el-select v-model="departmentName" placeholder="选择挂号等级">
            <el-option label="专家号" value="专家号"></el-option>
            <el-option label="普通号" value="普通号"></el-option>
            <el-option label="急诊号" value="急诊号"></el-option>
          </el-select>
        </div>
        &nbsp&nbsp&nbsp&nbsp
        <el-button width="100">查询</el-button>
        <el-button width="100">清空</el-button>
      </el-header>
      <el-table
        stripe
        :data ="doctorList"
        style="width: 100%"
      >
        <el-table-column>
          <el-checkbox></el-checkbox>
        </el-table-column>
        <el-table-column
        label="规则名称"
        prop="arName"
        ></el-table-column>
        <el-table-column
          label="科室名称"
          prop="dName"
        ></el-table-column>
        <el-table-column
          label="医生姓名"
          prop="docName"
        ></el-table-column>
        <el-table-column
          label="时间"
          prop="arPlan"
        ></el-table-column>
      </el-table>
      <el-footer>
        <div style="display: inline-block">
        <div class="block">
        <span class="demonstration">开始</span>
        <el-date-picker
          v-model="beginDate"
          type="date"
          placeholder="选择开始日期">
        </el-date-picker>
          <span class="demonstration">结束</span>
          <el-date-picker
            v-model="endDate"
            type="date"
            placeholder="选择结束日期">
          </el-date-picker>
          <el-button width="100">生成</el-button>
        </div>
        </div>
      </el-footer>
      <el-footer><el-button width="100">结束</el-button></el-footer>
    </el-container>
</template>

<script>
    export default {
        name: "arragement",
      data(){
        /** 科室名称 */
        let departmentName = ''
        let doctorList = [{arName:"q1",dName:"心脑血管科", docName:"扁鹊", arPlan:"00011110001111"},{arName:"q2",dName:"心脑血管科", docName:"扁鹊", arPlan:"00011110001111"},{arName:"q3",dName:"心脑血管科", docName:"扁鹊", arPlan:"00011110001111"},{arName:"q4",dName:"心脑血管科", docName:"扁鹊", arPlan:"00011110001111"}];
        let beginDate = '';
        let endDate = '';
        return{
          departmentName:departmentName,
          doctorList:doctorList,
          beginDate:beginDate,
          endDate:endDate
        }
      }
    }
</script>

<style scoped>

</style>
