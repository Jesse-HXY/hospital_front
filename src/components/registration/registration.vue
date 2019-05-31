<template>
  <el-container>
    <el-header>
      挂号登记
    </el-header>
    <el-form style="margin:0 auto;width:600px;">
      <el-form-item label="身份证号：" :label-width="formLabelWidth" style="text-align:left">
        <el-input v-model="pId" style="width: 250px;margin-left:0" autocomplete="off" @blur="getPatient($event)"></el-input>
        <el-button @click="dialogFormVisible = true">添加</el-button>
      </el-form-item>
      <el-form-item label="姓名：" :label-width="formLabelWidth" style="text-align:left">{{pName}}
      </el-form-item>
      <el-form-item label="性别：" :label-width="formLabelWidth" style="text-align:left">
        <span v-if="pSex">男</span>
        <span v-if="pSex===false">女</span>
    </el-form-item>
      <el-form-item label="出生日期：" :label-width="formLabelWidth" style="text-align:left">
        {{pBirth}}
      </el-form-item>
      <el-form-item label="家庭住址：" :label-width="formLabelWidth" style="text-align:left">
        {{pAddress}}
      </el-form-item>
      <el-form-item label="结算类别：" :label-width="formLabelWidth" style="text-align:left">
        <el-select v-model="payType" placeholder="请选结算类别">
          <el-option label="自费" value="自费"></el-option>
          <el-option label="医保" value="医保"></el-option>
          <el-option label="新农合" value="新农合"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="挂号级别：" :label-width="formLabelWidth" style="text-align:left" >
        <el-select v-model="rLName" placeholder="请选挂号等级" @change="getRLName">
          <el-option label="专家号" value="专家号"></el-option>
          <el-option label="普通号" value="普通号"></el-option>
          <el-option label="急诊号" value="急诊号"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="挂号科室：" :label-width="formLabelWidth" style="text-align:left">
        <template>
          <el-select v-model="dId" filterable placeholder="请选择科室">
            <div v-for="item in departmentList">
              <el-option :key="item.dId" :value="item.dId" :label="item.dName"></el-option>
            </div>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item label="看诊医生：" :label-width="formLabelWidth" style="text-align:left">
        <!--<el-select v-model="uId" placeholder="请选看诊医生" @focus="getUser($event)">-->
          <!--<el-option label="专家号" value="专家号"></el-option>-->
          <!--<el-option label="普通号" value="普通号"></el-option>-->
          <!--<el-option label="急诊号" value="急诊号"></el-option>-->
        <!--</el-select>-->
        <el-select v-model="uId" filterable placeholder="请选看诊医生" @focus="getUser($event)">
          <div v-for="item in userList">
            <el-option :key="item.uId" :value="item.uId" :label="item.uName"></el-option>
          </div>
        </el-select>
      </el-form-item>
      <el-form-item label="是否要病历本：" :label-width="formLabelWidth">
        <el-radio v-model="hasMedicineRecord" label="0">要</el-radio>
        <el-radio v-model="hasMedicineRecord" label="1">不要</el-radio>
      </el-form-item>
      <el-form-item label="应收金额：" :label-width="formLabelWidth" style="text-align:left">
      </el-form-item>
      <el-button  width="100" type="primary">保存<i class="el-icon-success el-icon--right"></i></el-button>
    </el-form>

<!----------------------------------------------------------添加病人------------------------------------------------------>
    <el-dialog title="添加病人" :visible.sync="dialogFormVisible" width="400px" >
      <el-form>
        <el-form-item label="身份证号：" :label-width="formLabelWidth" style="text-align:left">
          <el-input v-model="pId" style="width: 250px;margin-left:0" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" :label-width="formLabelWidth" style="text-align:left">
          <el-input v-model="pName" style="width: 250px;margin-left:0" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别：" :label-width="formLabelWidth">
          <el-radio v-model="pSex" label="true">男</el-radio>
          <el-radio v-model="pSex" label="false">女</el-radio>
        </el-form-item>
        <el-form-item label="出生日期：" :label-width="formLabelWidth" style="text-align:left">
          <div class="block">
            <el-date-picker
              v-model="pBirth"
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
            pBirth:'',
            pAddress:'',
            uId:'',
            dId:'',
            payType:'',
            rLName:'',
            departmentList:'',
            userList:'',
            rLCost:0
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
          /**添加病人*/
        onTapAdd:function () {
          this.reSetPatient()
          let that = this
          this.$axios({
            url:'registration/insertPatient',
            method: 'post',
            data:{
              pId:that.pId,
              pName: that.pName,
              pSex: that.pSex,
              pBirth: that.covertDate(that.pBirth),
              pAddress: that.pAddress
            }
          }).then(response=>{
            this.dialogFormVisible=false
            this.reSetPatient()
          }).catch(err=>{
            console.log(err)
            this.reSetPatient()})
        },
        /**重置病人*/
        reSetPatient:function () {
          this.pId = ''
          this.pName = ''
          this.pSex = ''
          this.pBirth =''
          this.pAddress=''
        },
        /***
         * 得到病人
         */
        getPatient:function (e) {
          let that = this
          this.$axios({
            url:'registration/getPatientById',
            method:'post',
            data:{
              pId:that.pId
            }
          }).then(responese=>{
            if(responese.data.length == 0){
              alert("无此患者")
            }
            that.pSex = responese.data.pSex
            that.pAddress = responese.data.pAddress
            that.pBirth = responese.data.pBirth
            that.pName = responese.data.pName
            that.pAddress = responese.data.pAddress
          })
          console.log(e.target.value)
        },
        /**转换date*/
        covertDate:function(date){
          let year = date.getFullYear()
          let month = date.getMonth()+1
          let day = date.getDate()
          let result =year+'-'+month+'-'+day
          return result
        },
        /** 得到满足条件的医生 */
        getUser:function (e) {
          let that = this
          let date = new Date();
          let seperator1 = "-";
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let strDate = date.getDate();
          let currentDate = year + seperator1 + month + seperator1 + strDate
          console.log(this.dId)
          this.$axios({
            url:'user/getAvailableDoctor',
            method:'post',
            data:{
              currentDate:currentDate,
              dId:this.dId,
              rLName: this.rLName
            }
          }).then(response=>{
            that.userList = response.data
            console.log(response.data)
          })
        },
        /** 得到挂号等级 */
        getRLName:function (value) {
          let that = this
          this.$axios({
            url:'registrationLevel/'
          })
        }
      }
    }
</script>

<style scoped>

</style>
