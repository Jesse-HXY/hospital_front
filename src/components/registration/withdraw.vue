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

    <el-container style="height: 100%; border: 1px solid #eee;font-size: 20px">
     <el-main style="text-align: left">
       <!--<el-header style="text-align: left; font-size: 20px">-->
         <!--患者信息确认:-->
       <!--</el-header>-->
       <!--<el-main>-->
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
            <el-button type="primary" icon="el-icon-goods" @click="withdralMoney">退费</el-button>
          </div>
          <!--<el-dialog-->
            <!--title="退号"-->
            <!--:visible.sync="centerDialogVisible"-->
            <!--width="30%"-->
            <!--center>-->
            <!--<span>应退挂号费 &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<el-tag align="right">0元</el-tag></span>-->
             <!--<div align="right">-->
            <!--<el-button type="primary" @click="centerDialogVisible=false">确 定</el-button>-->
             <!--</div>-->
          <!--</el-dialog>-->





        </el-main>
        <el-dialog :visible.sync="invoiceDialogVisible" width="500px">
          <div id="pdfDom">
          冲红发票编号:{{refundIId}}
          <el-table
            :data="refundItemList"
            stripe
            style="width: 500px">

            <el-table-column
              label="项目名称"
              width="250"
              prop="name">
            </el-table-column>
            <el-table-column
              label="单价"
              width="150"
              prop="Fee">
            </el-table-column>
            <el-table-column
              label="数量"
              width="100"
              prop="number">
            </el-table-column>
          </el-table>
          新发票编号:{{remainIId}}  &nbsp; &nbsp;合计:{{invoiceFee}}
          <el-table
            :data="remainItemList"
            stripe
            style="width: 500px">

            <el-table-column
              label="项目名称"
              width="250"
              prop="name">
            </el-table-column>
            <el-table-column
              label="单价"
              width="150"
              prop="Fee">
            </el-table-column>
            <el-table-column
              label="数量"
              width="100"
              prop="number">
            </el-table-column>
          </el-table>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="invoiceDialogVisible = false" >确 定</el-button>
            <el-button type="primary" @click="invoiceDialogVisible = false , getPdf()" >打印</el-button>
          </div>
        </el-dialog>
      </el-container>

  </el-container>


</template>

<script>


  export default {
    name: 'withdraw',

    data(){



      return{

        searchrId:'',
        patientList:[],
        pName:'',
        rId: '',
        itemList: [],
        mList:[],
        totalFee:0.0,
        checkList:[],
        formLabelWidth: '120px',
        dialogFormVisible:false,
        chargeFee:'',
        payType:'',
        returnFee:'',
        postDId:'',
        dId:'',
        refundItemList:[],
        remainItemList:[],
        refundIId:'',
        remainIId:'',
        invoiceDialogVisible:false,
        htmlTitle:''
      }
    },
    methods: {

      onTapSearch: function () {

        let that = this;
        that.itemList = []
        that.checkList = []
        /**
         * 搜索已经开立的非药品
         * **/
        this.$axios({
          url: 'registration/getRegistrationInfoByrId',
          method: 'post',
          data: {
            rId: that.searchrId
          }
        }).then(response => {
          console.log(response.data)
          this.patientList = response.data;
          this.pName = response.data[0].pName
          this.rId = this.searchrId
          this.postDId = response.data[0].dId
          this.$axios({
            url: 'diagnosis/selectByrIdAndStatus',
            method: 'post',
            data: {
              rId: that.rId,
              eAStatus: '已收费'
            }
          }).then(response => {
            for (let i = 0; i < response.data.length; i++) {
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
              url: 'diagnosis/getDetailByrId',
              method: 'post',
              data: {
                rId: that.rId,
                mState: '已退药'
              }
            }).then(res => {
              console.log('123', res.data)
              for (let i = 0; i < res.data.length; i++) {
                let eTDate = new Date(res.data[i].useDate * 1000)
                let medicine = res.data[i];
                let medicineList = {
                  dia_M_Id: medicine.dia_M_Id,
                  name: medicine.mName,
                  Fee: medicine.mFee,
                  number: medicine.mAmount,
                  status: '已退药',
                  displayTime: eTDate.toLocaleDateString().replace(/\//g, "-") + " " + eTDate.toTimeString().substr(0, 8),
                  dId: medicine.dId,
                  feeType: medicine.mType,
                }
                that.itemList.push(medicineList)
                that.checkList.push(false)
              }
            })
          })

        }).catch(err => {
          console.log(err)
        })

      },
      withdralMoney: function () {
        let that = this
        let eAIdList = [];
        let mIdList = [];
        let eAFee = [];
        let medicineFee=[];
        this.refundItemList = []
        this.remainItemList = []
        for (let i = 0; i < this.checkList.length; i++) {
          if (this.checkList[i]) {
            if(that.itemList[i].feeType==='中药'||that.itemList[i].feeType==='西药'){
              medicineFee.push(that.itemList[i].number * that.itemList[i].Fee)
              mIdList.push(that.itemList[i].dia_M_Id)
            }
              else
            {
              eAFee.push(that.itemList[i].number * that.itemList[i].Fee)
              eAIdList.push(that.itemList[i].eAId)
            }
            this.refundItemList.push(this.itemList[i])
          }else{
            this.remainItemList.push(this.itemList[i])
          }
        }


        if(eAIdList.length===0 && mIdList.length===0){
          this.$message({
            message:"请先选择你想要退费的项目或药物",
            type:'warning'
          })
        }

        else {
          this.$axios({
            url: 'account/returnMoney',
            method: 'post',
            data: {
              eAIds: eAIdList,
              eAFee: eAFee,
              dia_M_Ids: mIdList,
              medicineFee: medicineFee
            }
          }).then(response => {
            this.invoiceDialogVisible = true
            this.refundIId = response.data[0]
            this.remainIId = response.data[1]
            this.onTapSearch()
          }).catch(err => {
            console.log(err)
          })
          this.$message({
            message:"退费成功",
            type:'success'
          })

        }
      }
      }, watch: {

        'checkList': function (checkList) {
          let that = this
          let total = 0.0
          for (let i = 0; i < checkList.length; i++) {
            if (checkList[i]) {
              total = total + this.itemList[i].Fee * this.itemList[i].number
            }
          }
          that.totalFee = Math.round(total*100)/100
        },
      'refundIId':function (refundIid) {
        this.htmlTitle = '发票编号' + refundIid
      }
      }


  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
