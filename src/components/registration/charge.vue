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
          prop="examnationItem.eIName">
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
            chargeFee:0,
            payType:'',
            returnFee:0
          }
      },
      methods:{
        onTapSearch:function () {
          let that = this;
          that.itemList=[]
          this.$axios({
            url:'registration/getRegistrationInfoByrId',
            method:'post',
            data:{
              rId : that.searchrId,
            }
          }).then(response=>{
            console.log(response.data);
            this.patientList = response.data;
            this.pName = response.data[0].pName
            this.rId = this.searchrId
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
                item.payType = item.examnationItem.eIFeeType
                item.status = item.eAStatus
                let eTDate = new Date(response.data[i].beginTime * 1000)
                item.displayTime = eTDate.toLocaleDateString().replace(/\//g, "-") + " " + eTDate.toTimeString().substr(0, 8)
                item.number = 1
                that.itemList.push(item)
                that.checkList.push(false)
              }
              console.log(response.data)
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
          for(let i = 0; i < checkList.length; i++){
            if(checkList[i]){
              total = total + this.itemList[i].Fee
            }
          }
          this.$axios({
            url:'',
            method:'',
            data:{

            }
          })
        }
      },watch:{
          'searchrId':'onTapSearch',
        'checkList':function (checkList) {
            let total = 0.0
            for(let i = 0; i < checkList.length; i++){
              if(checkList[i]){
                total = total + this.itemList[i].Fee
              }
            }
            this.totalFee = total
        },
        'chargeFee':function (chargeFee) {
          this.returnFee = (chargeFee>this.totalFee)?Math.floor((chargeFee-this.totalFee) * 100) / 100:0

        }
      }
    }
</script>

<style scoped>

</style>
