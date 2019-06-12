<template>
    <el-container>
      <el-header style="text-align: left; font-size: 12px">
      <template>
        发票编号：
        <div style="width: 150px;display: inline-block">
          <el-input
            v-model="searchiId"
            size="mini"
            placeholder="输入发票编号"
          ></el-input>
        </div>
      </template>
        <el-button type="primary" size="mini" @click="onTapSearch">查询</el-button>
        <el-button type="primary" size="mini" @click="onTapReprint">重打</el-button>
      </el-header>
      <el-main style="text-align: center;">
        <div style="display: inline-block;">
        <el-table
          :data="itemList"
        >
          <el-table-column
            label="名称"
            prop="name"
            width="300"
          >
          </el-table-column>
          <el-table-column
            label="类型"
            prop="type"
            width="150"
          >
          </el-table-column>
          <el-table-column
            label="单价"
            prop="fee"
            width="100"
          >
          </el-table-column>
          <el-table-column
            label="数量"
            prop="number"
            width="50"
          >
          </el-table-column>
          <el-table-column
            label="合计"
            prop="total"
            width="100"
          >
          </el-table-column>
        </el-table>
        </div>
      </el-main>
      <!------------------------------------------------发票对话框------------------------------------------------------>
      <el-dialog :visible.sync="invoiceDialogVisible" width="500px">
        <div id="pdfDom">
        发票编号:{{newiId}}
        <el-table
          :data="itemList"
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
            prop="fee">
          </el-table-column>
          <el-table-column
            label="数量"
            width="100"
            prop="number">
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          合计:{{totalFee}}
          <el-button type="primary" @click="invoiceDialogVisible = false" >确 定</el-button>
          <el-button type="primary" @click="getPdf() , invoiceDialogVisible = false">打印</el-button>
        </div>
        </div>
      </el-dialog>
    </el-container>
</template>

<script>
    export default {
        name: "reprintInvoice",
      data(){
          return{
            searchiId:'',
            itemList:[],
            newiId:'',
            invoiceDialogVisible:false,
            totalFee:0.0,
            htmlTitle:''
          }
      },
      methods:{
          onTapSearch:function () {
            this.itemList = []
            this.$axios({
              url:'invoice/selectMedicineByiId',
              method:'post',
              data:{
                iId:this.searchiId
              }
            }).then(response=>{
              for(let i = 0; i < response.data.length; i++){
                this.itemList.push({
                  name:response.data[i].mName,
                  number:response.data[i].mAmount,
                  type:response.data[i].mType,
                  fee:response.data[i].mFee,
                  total:response.data[i].mFee * response.data[i].mAmount
                })
              }
            })
            this.$axios({
              url:'invoice/selectExaminationApplicationByiId',
              method:'post',
              data:{
                iId:this.searchiId
              }
            }).then(response=>{
              for(let i = 0; i < response.data.length; i++){
                this.itemList.push({
                  name:response.data[i].examnationItem.eIName,
                  number:1,
                  type:response.data[i].examnationItem.eIFeeType,
                  fee:response.data[i].examnationItem.eIFee,
                  total:response.data[i].examnationItem.eIFee
                })
              }
            })
          },
        onTapReprint:function () {
          this.$axios({
            url:'invoice/updateInvoice',
            method:'post',
            data:{
              iId:this.searchiId,
              iStatus:"重打"
            }
          }).then(response=>{
            this.newiId = this.searchiId
            this.invoiceDialogVisible=true
            this.totalFee = 0.0
            for(let i = 0; i < this.itemList.length; i++){
              this.totalFee = Math.round((this.totalFee + this.itemList[i].total) * 100) /100
            }
          })
        }
      },watch:{
          'newiId':function (newiId) {
            this.htmlTitle = "发票编号" + newiId
          }
      }
    }
</script>

<style scoped>

</style>
