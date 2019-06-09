<template>
  <el-container style="text-align: center;">
    <el-header>
      挂号登记
    </el-header>
    <el-container style="width: 70%;margin: auto;height: auto;">
    <el-aside style="width: 50%;">
      <el-form >
        <el-form-item label="身份证号：" :label-width="formLabelWidth" style="text-align:left">
          <el-input v-model="pId" style="width: 250px;margin-left:0" autocomplete="off"
                    @blur="getPatient($event)"></el-input>
          <el-button @click="onTapAddPatient">添加</el-button>
        </el-form-item>
        <div style="margin-top: -20px;">
        </div>
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
      </el-form>
    </el-aside>
    <el-main>
      <el-form style="margin-top: -20px;text-align:left;">
        <el-form-item label="结算类别：" :label-width="formLabelWidth" style="text-align:left">
          <el-select v-model="payType" placeholder="请选结算类别">
            <el-option label="自费" value="自费"></el-option>
            <el-option label="医保" value="医保"></el-option>
            <el-option label="新农合" value="新农合"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="挂号级别：" :label-width="formLabelWidth" style="text-align:left">
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
          <el-select v-model="uId" filterable placeholder="请选看诊医生" @focus="getUser($event)">
            <div v-for="item in userList">
              <el-option :key="item.uId" :value="item.uId" :label="item.uName"></el-option>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item label="是否要病历本：" :label-width="formLabelWidth" style="text-align: left;">
          <el-radio-group v-model="hasMedicineRecord" @change="changeRecord">
            <el-radio v-model="hasMedicineRecord" label="true">要</el-radio>
            <el-radio v-model="hasMedicineRecord" label="false">不要</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="应收金额：" :label-width="formLabelWidth" style="text-align:left">
          {{rFee}}元
        </el-form-item>
        <el-form-item label="选择开单科室" :label-width="formLabelWidth" style="text-align: left;">
          <el-select v-model="postDId" filterable placeholder="请选择">
            <div v-for="item in departmentList">
              <el-option :key="item.dId" :value="item.dId" :label="item.dName"></el-option>
            </div>
          </el-select>
        </el-form-item>
        <el-button width="100" type="primary" @click="onTapSave">保存<i class="el-icon-success el-icon--right"></i>
        </el-button>
      </el-form>
    </el-main>
    </el-container>

    <!----------------------------------------------------------添加病人------------------------------------------------------>
    <el-dialog title="添加病人" :visible.sync="dialogFormVisible" width="400px">
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
              placeholder="选择日期"
              @blur="checkTime($event)">
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
        <el-button type="primary" @click="onTapAdd">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  export default {
    name: "registration",
    data() {
      return {
        pId: '',
        hasMedicineRecord: false,
        formLabelWidth: '120px',
        dialogFormVisible: false,
        pName: '',
        pSex: '',
        pBirth: '',
        pAddress: '',
        uId: '',
        dId: '',
        payType: '',
        rLName: '',
        departmentList: '',
        userList: '',
        rFee: 0.0,
        rLFee: 0.0,
        postDId: ''
      }
    },
    created: function () {
      let that = this
      this.$axios({
        url: "department/getAllDepartments",
        method: "post",
      }).then(response => {
        that.departmentList = response.data
      })
    }
    ,
    methods: {
      /**
       *
       * */
      onTapAddPatient: function () {
        this.reSetPatient()
        this.dialogFormVisible = true
      },
      /**添加病人*/
      onTapAdd: function () {
        let that = this
        this.$axios({
          url: 'registration/insertPatient',
          method: 'post',
          data: {
            pId: that.pId,
            pName: that.pName,
            pSex: that.pSex,
            pBirth: that.covertDate(that.pBirth),
            pAddress: that.pAddress
          }
        }).then(response => {
          console.log(response.data)
          this.dialogFormVisible = false
          this.reSetPatient()
        }).catch(err => {
          console.log(err)
          this.reSetPatient()
        })
      },
      /**重置病人*/
      reSetPatient: function () {
        this.pId = ''
        this.pName = ''
        this.pSex = ''
        this.pBirth = ''
        this.pAddress = ''
      },
      /***
       * 得到病人
       */
      getPatient: function (e) {
        let that = this
        this.$axios({
          url: 'registration/getPatientById',
          method: 'post',
          data: {
            pId: that.pId
          }
        }).then(responese => {
          if (responese.data.length == 0) {
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
      covertDate: function (date) {
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let result = year + '-' + month + '-' + day
        return result
      },
      /** 得到满足条件的医生 */
      getUser: function (e) {
        let that = this
        let date = new Date();
        let currentDate = this.covertDate(date)
        console.log(this.dId)
        this.$axios({
          url: 'user/getAvailableDoctor',
          method: 'post',
          data: {
            currentDate: currentDate,
            dId: this.dId,
            rLName: this.rLName
          }
        }).then(response => {
          that.userList = response.data
          console.log(response.data)
        })
      },
      /** 得到挂号等级 */
      getRLName: function (value) {
        let that = this
        this.$axios({
          url: 'registrationLevel/getRegistrationLevel',
          method: 'post',
          data: {
            rLId: '',
            rLName: that.rLName,
            rLFee: ''
          }
        }).then(response => {
          console.log(response.data)
          that.rLFee = response.data[0].rLFee
          if (that.hasMedicineRecord) {
            that.rFee = response.data[0].rLFee + 1
          } else {
            that.rFee = response.data[0].rLFee
          }
        }).catch(err => {
          console.log(err)
        })
      },
      /** 是否要病历本改变 */
      changeRecord: function (value) {
        if (this.hasMedicineRecord === 'true') {
          console.log(this.hasMedicineRecord)
          this.rFee = this.rLFee + 1
        } else {
          this.rFee = this.rLFee
        }
      },
      /***
       * 完成挂号
       */
      onTapSave: function () {
        let hasMedicineRecord = 0
        if (this.hasMedicineRecord === 'true') {
          hasMedicineRecord = 1
        }
        let that = this
        let currentDate = new Date().getTime();
        this.$axios({
          url: 'registration/insertRegistration',
          method: 'post',
          data: {
            pId: that.pId,
            payType: that.payType,
            rLName: that.rLName,
            dId: that.dId,
            uId: that.uId,
            hasMedicalHistory: hasMedicineRecord,
            rFee: that.rFee,
            rDate: currentDate,
            postDId: this.postDId
          }
        }).then(response => {
          console.log(response.data)
          this.insertIntoAccount(response.data)
        }).catch(err => {
          console.log(err)
        })
      },
      /**
       * 将挂号插入account
       */
      insertIntoAccount: function (rId) {
        console.log(rId)
        let currentTime = new Date()
        let account = {
          dId: this.dId,
          payTime: currentTime.getTime() / 1000,
          fee: this.rFee,
          feeType: '挂号费',
          payType: this.payType,
          rId: rId,
          cId: this.$cookie.get('uId'),
          postDId: this.postDId
        }
        let accounts = []
        accounts.push(account)
        this.$axios({
          url: 'account/insertAccount',
          method: 'post',
          data: {
            accounts: accounts
          }
        })
      },
      /**
       * 检查时间是否符合规范
       */
      checkTime: function (e) {
        let currentDate = new Date()
        if (currentDate.getTime() < this.pBirth.getTime()) {
          alert("兄弟你在逗我吗")
          this.pBirth = ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
