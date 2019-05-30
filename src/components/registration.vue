<template>
  <el-container>
    <el-header>
      挂号登记
    </el-header>
    <el-form style="margin:0 auto;width:750px;">
      <el-form-item label="身份证号：" :label-width="formLabelWidth" style="text-align:left">
        <el-input style="width: 500px;margin-left:0" autocomplete="off"></el-input>
        <el-button>添加</el-button>
      </el-form-item>
      <el-form-item label="姓名：" :label-width="formLabelWidth" style="text-align:left">
      </el-form-item>
      <el-form-item label="性别：" :label-width="formLabelWidth" style="text-align:left">
    </el-form-item>
      <el-form-item label="出生日期：" :label-width="formLabelWidth" style="text-align:left">
    </el-form-item>
      <el-form-item label="家庭住址：" :label-width="formLabelWidth" style="text-align:left">
      </el-form-item>
      <el-form-item label="挂号级别：" :label-width="formLabelWidth" style="text-align:left">
        <el-select placeholder="请选挂号等级">
          <el-option label="专家号" value="专家号"></el-option>
          <el-option label="普通号" value="普通号"></el-option>
          <el-option label="急诊号" value="急诊号"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="挂号科室：" :label-width="formLabelWidth" style="text-align:left">
        <el-select placeholder="请选挂号科室">
          <el-option label="专家号" value="专家号"></el-option>
          <el-option label="普通号" value="普通号"></el-option>
          <el-option label="急诊号" value="急诊号"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="看诊医生：" :label-width="formLabelWidth" style="text-align:left">
        <el-select placeholder="请选看诊医生">
          <el-option label="专家号" value="专家号"></el-option>
          <el-option label="普通号" value="普通号"></el-option>
          <el-option label="急诊号" value="急诊号"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
    export default {
        name: "registration",
      data(){
          return{
            formLabelWidth: '120px'
          }
      }
    }
</script>

<style scoped>

</style>
