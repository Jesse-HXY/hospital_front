<template>
  <el-container style="height: 100%; border: 1px solid #eee;">
    <el-header style="text-align: left; font-size: 20px"> 患者信息查询：</el-header>
    <el-header style="text-align: left; font-size: 12px">

      <template style="font-size: 12px">
        病历号
        <div style="width: 200px;display: inline-block ">
          <el-input
            v-model="searchrId"
            size="mini"
            placeholder="输入病历号"
          />
        </div>
      </template>

      <el-button type="primary" icon="el-icon-search" @click="onTapSearch">搜索</el-button>
    </el-header>

    <el-container style="height: 175px; border: 1px solid #eee;font-size: 20px">
      <el-main style="text-align: left">
        患者信息确认:
        <el-table :data="patientList"
                  stripe
                  style="width: 100%">
          <el-table-column
            label="姓名"
            width="300px">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{scope.row.pName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="身份证"
            width="300px">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{scope.row.pId}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="家庭住址"
            width="300px">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{scope.row.pAddress}}</span>
            </template>
          </el-table-column>

        </el-table>
      </el-main>
      <!--</el-main>-->
    </el-container>
    <el-container style="height: 100%; border: 1px solid #eee;font-size: 20px">
      <el-header>
        <el-header style="text-align: left"> 患者挂号信息：</el-header>
      </el-header>

      <el-main>
        <el-table
          :data="itemList"
          stripe
          style="width: 100%">
          <el-table-column
          width="35">
            <template slot-scope="scope">
              <el-checkbox v-model="checkList[scope.$index]"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            label="病历号"
            width="100">
            {{rId}}
          </el-table-column>
          <el-table-column
            label="姓名"
            width="100">
            <template slot-scope="scope">
              <span  style="margin-left: 10px">{{pName}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="项目名称"
            width="250"
          prop="name">
          </el-table-column>
          <el-table-column
            label="单价"
            width="100"
            prop="Fee">
          </el-table-column>
          <el-table-column
            label="数量"
            width="50"
          prop="number">
          </el-table-column>
          <el-table-column
            label="开立时间"
            width="250"
          prop="displayTime">
          </el-table-column>
          <el-table-column
            label="状态"
            width="250"
          prop="status">
          </el-table-column>
        </el-table>
        <div style="margin-top: 10px;">
          合计:{{totalFee}}
          <el-button type="primary" icon="el-icon-goods" @click="onTapCharge">收费结算</el-button>
        </div>
      </el-main>
      <el-dialog title="收费" :visible.sync="dialogFormVisible" width="350px" >
        <el-form>
          <el-form-item label="应收金额" :label-width="formLabelWidth">
            {{totalFee}}
          </el-form-item>
          <el-form-item label="支付方式" :label-width="formLabelWidth" >
            <el-select v-model="payType"   placeholder="请选择支付方式">
              <el-option label="自费" value="自费"></el-option>
              <el-option label="医保" value="医保"></el-option>
              <el-option label="新农合" value="新农合"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="实收金额" :label-width="formLabelWidth">
            <el-input v-model="chargeFee" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="找零金额" :label-width="formLabelWidth">
            {{returnFee}}
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onTapConfirm" >确 定</el-button>
        </div>
      </el-dialog>
    </el-container>

  </el-container>
</template>

<script>
    export default {
        name: "charge",
      data(){
          return{
            searchrId:'',
            patientList:[],
            pName:'',
            rId: '',
            itemList: [],
            totalFee:0.0,
            checkList:[],
            formLabelWidth: '120px',
            dialogFormVisible:false,
            chargeFee:'',
            payType:'',
            returnFee:'',
            postDId:'',
            dId:''
          }
      },created:function(){
        let that = this
        this.$axios({
          url:"department/getAllDepartments",
          method:"post",
        }).then(response=>{
          that.departmentList = response.data
        })
      },
      methods:{
        onTapSearch:function () {

          let that = this;
          that.itemList = []
          that.checkList = []
          /**
           * 搜索已经开立的非药品
           * **/
          this.$axios({
            url:'registration/getRegistrationInfoByrId',
            method:'post',
            data:{
              rId : that.searchrId
            }
          }).then(response=>{
            console.log(response.data)
            this.patientList = response.data;
            this.pName = response.data[0].pName
            this.rId = this.searchrId
            this.postDId=response.data[0].dId
            this.$axios({
              url:'diagnosis/selectByrIdAndStatus',
              method: 'post',
              data:{
                rId:that.rId,
                eAStatus:'开立'
              }
            }).then(response=>{
              for(let i = 0; i < response.data.length; i++){
                let item = response.data[i]
                item.Fee = item.examnationItem.eIFee
                item.feeType = item.examnationItem.eIFeeType
                item.name = item.examnationItem.eIName
                item.status = item.eAStatus
                let eTDate = new Date(response.data[i].beginTime * 1000)
                item.displayTime = eTDate.toLocaleDateString().replace(/\//g, "-") + " " + eTDate.toTimeString().substr(0, 8)
                item.number = 1
                that.itemList.push(item)
                that.checkList.push(false)
              }
              console.log(that.itemList)
              this.axios({
                url:'diagnosis/getDetailByrId',
                method:'post',
                data:{
                  rId:that.rId
                }
              }).then(res=>{
                console.log('123',res.data)
                for(let i =0; i<res.data.length;i++){
                  let eTDate = new Date(res.data[i].useDate * 1000)
                  let medicine = res.data[i];
                  let medicineList={
                    dia_M_Id:medicine.dia_M_Id,
                    name:medicine.mName,
                    Fee:medicine.mFee,
                    number:medicine.mAmount,
                    status :medicine.diaState,
                    displayTime : eTDate.toLocaleDateString().replace(/\//g, "-") + " " + eTDate.toTimeString().substr(0, 8),
                    dId:medicine.dId,
                    feeType:medicine.mType,
                  }
                  that.itemList.push(medicineList)
                  that.checkList.push(false)
                }
              })
            })

          }).catch(err=>{
            console.log(err)
          })

        },

        /***
         * 点击收费
         */
        onTapCharge:function () {
          this.dialogFormVisible = true
          this.chargeFee = 0
          this.payType = ''
        },
        /**
         * 点击收费的确认
         */
        onTapConfirm:function () {
          if (this.chargeFee < this.totalFee) {
            alert("来医院坑钱你的良心不会痛吗")
            return
          }
          let cId = this.$cookie.get('uId')
          let accounts = []
          let eAIdList = []
          let dia_M_idList = []

          for (let i = 0; i < this.checkList.length; i++) {

            if (this.checkList[i]) {
              let currentTime = new Date()
              let account = {
                dId: this.itemList[i].dId,
                payTime: currentTime.getTime() / 1000,
                fee: this.itemList[i].Fee,
                feeType: this.itemList[i].feeType,
                payType: this.payType,
                rId: this.rId,
                cId: cId,
                postDId: this.postDId
              }
              if (this.itemList[i].eAId !== null && this.itemList[i].eAId !== 0) {
                eAIdList.push(this.itemList[i].eAId)
                account.eAId = this.itemList[i].eAId
              } else {
                account.eAId = -1
              }
              if (this.itemList[i].dia_M_Id !== null && this.itemList[i].dia_M_Id !== 0) {
                dia_M_idList.push(this.itemList[i].dia_M_Id)
                account.dia_M_Id = this.itemList[i].dia_M_Id

              }
              else {
                account.dia_M_Id = -1
              }
              accounts.push(account)
            }
          }
          this.$axios({
            url: 'account/insertAccount',
            method: 'post',
            data: {
              accounts: accounts
            }
          }).then(response => {
          }).catch(err => {
            console.log(err)
          })

              this.$axios({
                url: 'diagnosis/updateStatus',
                method: 'post',
                data: {
                  eAIdList: eAIdList,
                  eAStatus: '已收费'
                }
              }).then(response => {
                this.onTapSearch()
                this.dialogFormVisible = false
              })

              this.axios({
                url: 'diagnosis/updateMStateBydia_M_Id',
                method: 'post',
                data: {
                  dia_M_Id: dia_M_idList,
                  mState: '已缴费'
                }
              }).then(response => {
                this.onTapSearch()
                this.dialogFormVisible = false
              }).then(err => {
                console.log(err)
              })



        }

      },watch:{
          'searchrId':'onTapSearch',
        'checkList':function (checkList) {
            let total = 0.0
            for(let i = 0; i < checkList.length; i++){
              if(checkList[i]){
                total = total + this.itemList[i].Fee*this.itemList[i].number
              }
            }
            this.totalFee = total
        },
        'chargeFee':function (chargeFee) {
          this.returnFee = (chargeFee>this.totalFee)?Math.round((chargeFee-this.totalFee) * 100) / 100:0

        }
      }
    }
</script>

<style scoped>

</style>
