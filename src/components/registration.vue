<template>
  <el-container>
    <el-header>
      挂号登记
    </el-header>
    <el-form style="margin:0 auto;width:600px;">
      <el-form-item label="身份证号：" :label-width="formLabelWidth" style="text-align:left">
        <el-input v-model="pId" style="width: 250px;margin-left:0" autocomplete="off"></el-input>
        <el-button @click="dialogFormVisible = true">添加</el-button>
      </el-form-item>
      <el-form-item label="姓名：" :label-width="formLabelWidth" style="text-align:left">
      </el-form-item>
      <el-form-item label="性别：" :label-width="formLabelWidth" style="text-align:left">
    </el-form-item>
      <el-form-item label="出生日期：" :label-width="formLabelWidth" style="text-align:left">
    </el-form-item>
      <el-form-item label="家庭住址：" :label-width="formLabelWidth" style="text-align:left">
      </el-form-item>
      <el-form-item label="结算类别：" :label-width="formLabelWidth" style="text-align:left">
        <el-select v-model="payType" placeholder="请选结算类别">
          <el-option label="专家号" value="专家号"></el-option>
          <el-option label="普通号" value="普通号"></el-option>
          <el-option label="急诊号" value="急诊号"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="挂号级别：" :label-width="formLabelWidth" style="text-align:left">
        <el-select v-model="rLName" placeholder="请选挂号等级">
          <el-option label="专家号" value="专家号"></el-option>
          <el-option label="普通号" value="普通号"></el-option>
          <el-option label="急诊号" value="急诊号"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="挂号科室：" :label-width="formLabelWidth" style="text-align:left">
        <template>
          <el-select v-model="chosenDepartmentList" filterable placeholder="请选择科室">
            <div v-for="item in departmentList">
              <el-option :key="item.dId" :value="item.dId" :label="item.dName"></el-option>
            </div>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item label="看诊医生：" :label-width="formLabelWidth" style="text-align:left">
        <el-select v-model="uId" placeholder="请选看诊医生">
          <el-option label="专家号" value="专家号"></el-option>
          <el-option label="普通号" value="普通号"></el-option>
          <el-option label="急诊号" value="急诊号"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否要病历本：" :label-width="formLabelWidth">
        <el-radio v-model="hasMedicineRecord" label="1">要</el-radio>
        <el-radio v-model="hasMedicineRecord" label="2">不要</el-radio>
      </el-form-item>
      <el-form-item label="应收金额：" :label-width="formLabelWidth" style="text-align:left">
      </el-form-item>
      <el-button  width="100" type="primary">保存<i class="el-icon-success el-icon--right"></i></el-button>
    </el-form>

<!----------------------------------------------------------添加病人------------------------------------------------------>
    <el-dialog title="添加科室" :visible.sync="dialogFormVisible" width="400px" >
      <el-form>
        <el-form-item label="身份证号：" :label-width="formLabelWidth" style="text-align:left">
          <el-input v-model="pId" style="width: 250px;margin-left:0" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" :label-width="formLabelWidth" style="text-align:left">
          <el-input v-model="pName" style="width: 250px;margin-left:0" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别：" :label-width="formLabelWidth">
          <el-radio v-model="pSex" label="1">男</el-radio>
          <el-radio v-model="pSex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="出生日期：" :label-width="formLabelWidth" style="text-align:left">
          <div class="block">
            <el-date-picker
              v-model="pBirthday"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="家庭住址：" :label-width="formLabelWidth" style="text-align:left">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="pAddress">
          </el-input>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onTapAdd" >确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
    export default {
        name: "registration",
      data(){
          return{
            pId:'',
            hasMedicineRecord:'',
            formLabelWidth: '120px',
            dialogFormVisible:false,
            pName:'',
            pSex:'',
            pBirthday:'',
            pAddress:'',
            uId:'',
            dId:'',
            payType:'',
            rLName:'',
            departmentList:'',
            chosenDepartmentList:''
          }
      },
      created:function () {
        let that = this
        this.$axios({
          url:"department/getAllDepartments",
          method:"post",
        }).then(response=>{
          that.departmentList = response.data
        })
      }
      ,
      methods:{
        onTapAdd:function () {
          this.dialogFormVisible=false
        }
      }
    }
</script>

<style scoped>

</style>
