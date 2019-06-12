<template>
    <el-container>
      <el-header style="height: auto;">
        <div class="block">
          <el-date-picker
            v-model="dates"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </div>
        <br>
        收款员ID:
        <div style="display: inline-block;">
          <el-input size="mini" v-model="cId"></el-input>
        </div>
        <el-button type="primary" size="mini" @click="onTapGenerate">生成</el-button>
        <el-button type="primary" size="mini" @click="getPdf()">打印</el-button>
      </el-header>
      <div id="pdfDom">
        <br>
      <el-header>
        <span style="font-size: 20px;">东软云医院日结清单</span>
      </el-header>
      <el-main style="text-align: center;margin-top: -25px;">
        <table style="width: 1000px;text-align: left;display: inline-block;" border="1" cellspacing="0">
          <tr>
            <td>日结时间范围</td>
            <td colspan="12">{{dateRange}}</td>
          </tr>
          <tr>
            <td>制表人</td>
            <td colspan="3">{{uName}}</td>
            <td>收费人</td>
            <td colspan="5">{{cName}}</td>
            <td>制表时间</td>
            <td colspan="2" >{{currentTime}}</td>
          </tr>
          <tr>
            <td>起始发票号</td>
            <td colspan="10">
              <span v-for="beginInvoice in beginInvoiceList">
                {{beginInvoice}}
              </span>
              &nbsp
            </td>
            <td colspan="2">
              <span>{{beginInvoiceListLength}}</span>
            </td>
          </tr>
          <tr>
            <td>作废发票号</td>
            <td colspan="10">
              <span v-for="cancelledInvoice in cancelledInvoiceList">
                {{cancelledInvoice}}
              </span>
              &nbsp;
            </td>
            <td colspan="2">{{cancelledInvoiceListLength}}</td>
          </tr>
          <tr>
            <td>重打发票号</td>
            <td colspan="10">
              <span v-for="reprintInvoice in reprintInvoiceList">
                {{reprintInvoice}}
              </span>
              &nbsp;
            </td>
            <td colspan="2">{{reprintInvoiceListLength}}</td>
          </tr>
          <tr>
            <td>药费</td>
            <td>西药费</td>
            <td>{{xyFee}}</td>
            <td>中药费</td>
            <td>{{zyFee}}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td width="13%">共计</td>
            <td width="7%">{{xyFee+zyFee}}</td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="10%"></td>
            <td width="7%"></td>
          </tr>
          <tr>
            <td width="130px">医疗费用</td>
            <td width="70px">挂号费</td>
            <td width="70px">{{registrationFee}}</td>
            <td width="70px">检查费</td>
            <td width="70px">{{examinationFee}}</td>
            <td width="70px">检验费</td>
            <td width="70px">{{testFee}}</td>
            <td width="70px">治疗费</td>
            <td width="70px">{{treatmentFee}}</td>
            <td width="70px">材料费</td>
            <td width="70px">{{materialFee}}</td>
            <td width="100px">手术费</td>
            <td width="70px">{{surgeryFee}}</td>
          </tr>
          <tr>
            <td width="13%">共计</td>
            <td width="7%">{{registrationFee + surgeryFee + examinationFee + testFee + treatmentFee + materialFee}}</td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="10%"></td>
            <td width="7%"></td>
          </tr>
          <tr>
            <td width="13%">总收入</td>
            <td width="7%">{{registrationFee + surgeryFee + examinationFee + testFee + treatmentFee + materialFee + xyFee + zyFee}}</td>
            <td width="7%">自费</td>
            <td width="7%">{{ownExpenses}}</td>
            <td width="7%">医保卡</td>
            <td width="7%">{{medicalInsurance}}</td>
            <td width="7%">新农合</td>
            <td width="7%">{{nCMS}}</td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="10%"></td>
            <td width="7%"></td>
          </tr>
          <tr>
            <td width="13%">共计</td>
            <td width="7%">（大写）</td>
            <td colspan="5">{{chinese}}</td>
            <td width="7%">（小写）</td>
            <td width="7%">{{registrationFee + surgeryFee + examinationFee + testFee + treatmentFee + materialFee + xyFee + zyFee}}</td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="10%"></td>
            <td width="7%"></td>
          </tr>
        </table>
        </el-main>
      </div>
    </el-container>
</template>


<script>
  import {moneyToCapital} from '../../js/util.js'
    export default {
        name: "dailySettlement",
      data(){
          return{
            dates:[],
            dateRange:'',
            currentTime:'',
            cId:'',
            uName:'',
            cName:'',
            diagnosticFee:'',
            examinationFee:'',
            materialFee:'',
            medicalInsurance:'',
            nCMS:'',
            ownExpenses:'',
            registrationFee:'',
            surgeryFee:'',
            testFee:'',
            treatmentFee:'',
            xyFee:'',
            zyFee:'',
            htmlTitle: '',
            chinese:'',
            beginInvoiceList:[],
            beginInvoiceListLength:'',
            cancelledInvoiceList:[],
            cancelledInvoiceListLength:'',
            reprintInvoiceList:[],
            reprintInvoiceListLength:''
          }
      },methods:{
        /**
         * 点击生成
         */
        onTapGenerate:function () {
          this.generateTime()
          this.getUNameByUId(this.cId, true)
          this.getUNameByUId(Number(this.$cookie.get('uId')), false)
          this.getWorkLoadBycId()
          this.getBeginInvoiceList()
          this.getCancelledInvoiceList()
          this.getReprintInvoiceList()
        },
        /**
         * 获得时间范围与制表时间
         */
        generateTime:function () {
          let beginTime = this.dates[0].toLocaleDateString().replace(/\//g, "-") + " " + this.dates[0].toTimeString().substr(0, 8)
          let endTime = this.dates[1].toLocaleDateString().replace(/\//g, "-") + " " + this.dates[1].toTimeString().substr(0, 8)
          this.dateRange = beginTime + '-' + endTime
          let currentTime = new Date()
          this.currentTime = currentTime.toLocaleDateString().replace(/\//g, "-") + " " + currentTime.toTimeString().substr(0, 8)
        },
        /**
         * 根据uId获取uName
         */
        getUNameByUId:function (uId, isCollector) {
          this.$axios({
            url:'user/getUserById',
            method:'post',
            data:{
              uId:uId
            }
          }).then(response=>{
            if(isCollector){
              this.cName = response.data.uName
            }else{
              this.uName = response.data.uName
            }
          })
        },
        /**
         * 得到开始发票
         */
        getBeginInvoiceList:function(){
          this.$axios({
            url:'invoice/selectIId',
            method:'post',
            data:{
              cId:this.cId,
              beginTime: this.dates[0].getTime()/1000,
              endTime:this.dates[1].getTime()/1000,
              iStatus:'生效'
            }
          }).then(response=>{
            this.beginInvoiceList = response.data
            this.beginInvoiceListLength = "共有" + response.data.length + "张"
          })
        },
        /**
         * 得到重打发票
         */
        getCancelledInvoiceList:function(){
          this.$axios({
            url:'invoice/selectIId',
            method:'post',
            data:{
              cId:this.cId,
              beginTime: this.dates[0].getTime()/1000,
              endTime:this.dates[1].getTime()/1000,
              iStatus:'重打'
            }
          }).then(response=>{
            this.reprintInvoiceList = response.data
            this.reprintInvoiceListLength = "共有" + response.data.length + "张"
          })
        },
        /**
         * 得到作废发票
         */
        getReprintInvoiceList:function(){
          this.$axios({
            url:'invoice/getCancelledInvoice',
            method:'post',
            data:{
              cId:this.cId,
              beginTime: this.dates[0].getTime()/1000,
              endTime:this.dates[1].getTime()/1000
            }
          }).then(response=>{
            this.cancelledInvoiceList = response.data
            this.cancelledInvoiceListLength = "共有" + response.data.length + "张"
          })
        },
        getWorkLoadBycId:function () {
          this.$axios({
            url:"workloadsCount/getWorkloadsCountBycId",
            method: 'post',
            data:{
              beginTime: this.dates[0].getTime()/1000,
              endTime:this.dates[1].getTime()/1000,
              cId: this.cId,
            }
          }).then(response=>{
            console.log(response.data)
            this.diagnosticFee = Math.round(response.data.diagnosticFee * 100) /100
            this.examinationFee = Math.round(response.data.examinationFee * 100) / 100
            this.materialFee = Math.round(response.data.materialFee * 100) / 100
            this.medicalInsurance = Math.round(response.data.medicalInsurance * 100) / 100
            this.nCMS = Math.round(response.data.nCMS * 100) / 100
            this.ownExpenses = Math.round(response.data.ownExpenses * 100) / 100
            this.registrationFee = Math.round(response.data.registrationFee * 100) / 100
            this.surgeryFee = Math.round(response.data.surgeryFee * 100) / 100
            this.testFee = Math.round(response.data.testFee * 100) / 100
            this.treatmentFee = Math.round(response.data.treatmentFee * 100) / 100
            this.xyFee = Math.round(response.data.xyFee * 100) / 100
            this.zyFee = Math.round(response.data.zyFee * 100) / 100
            this.chinese = moneyToCapital(this.nCMS + this.ownExpenses + this.medicalInsurance)
          })
        }
      },watch:{
          'cName':function (cName) {
            this.htmlTitle = this.dateRange + cName + '的日结'
          }
      }
    }
</script>

<style scoped>

</style>
