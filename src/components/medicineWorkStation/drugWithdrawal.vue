<template>
     
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content ">
          <el-tag>门诊退药</el-tag>
        </div></el-col>
        <el-col :span="6"><div class="grid-content ">
          <el-input placeholder="请输入病历号" v-model="searchrId"></el-input>
        </div></el-col>
        <el-col :span="6"><div class="grid-content ">
          <el-input placeholder="请输入时间" v-model="searchDate"></el-input>
        </div></el-col>
        <el-col :span="6"><div class="grid-content ">
          <el-button @click="onTapSearch">查询</el-button>
          <el-button @click="withdrawalMedicine">退药</el-button>
        </div></el-col>

      </el-row>
    </el-header>
    <el-main>
      <el-table :data="searchResult">
        <el-table-column
          width="25px">
          <template slot-scope="scope">
            <el-checkbox v-model="checkList[scope.$index]"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
          label="药品编码"
          prop="mCode">

        </el-table-column>
        <el-table-column
          label="药品名称"
          prop="mName">

        </el-table-column>
        <el-table-column
          label="药品拼音"
          prop="mSpell">

        </el-table-column>
        <el-table-column
          label="规格"
          prop="mSpecification">

        </el-table-column>
        <el-table-column
          label="单位"
          prop="mUnit">

        </el-table-column>
        <el-table-column
          label="产家"
          prop="mProducer">

        </el-table-column>

        <el-table-column
          label="类型"
          prop="mType">

        </el-table-column>
        <el-table-column
          label="单价"
          prop="mFee">

        </el-table-column>
        <el-table-column
          label="用法"
          prop="instruction">

        </el-table-column>
        <el-table-column
          label="用量"
          prop="dosage">

        </el-table-column>
        <el-table-column
          label="频次"
          prop="times">

        </el-table-column>
        <el-table-column
          label="数量"
          prop="mAmount">

        </el-table-column>


      </el-table>
    </el-main>
  </el-container>

</template>

<script>
  export default {
    data() {
      return {
        searchrId:'',
        searchDate:'',
        searchResult:[],
        checkList:[],
      }
    },
    methods:{
      onTapSearch:function(){
        let that = this;
        this.$axios({
          url: "account/getAlreadyDrawMedicineByRIdAndTime",
          method:"post",
          data:{
           rId:that.searchrId,
            Date:that.searchDate,
          }
        }).then(response => {
          that.searchResult = response.data;
          console.log(response.data)
        }).catch(err=>{
          console.log(err)
        })
      },
      withdrawalMedicine:function () {
        // let that = this;
        // console.log('cc',that.searchResult)
        // let dia_M_Id_List =[]
        // let feeList=[]
        // for(let i = this.checkList.length - 1; i > -1; i--) {
        //   if (this.checkList[i]) {
        //     dia_M_Id_List.push(that.searchResult[i].dia_M_Id)
        //     feeList.push(that.searchResult[i].mFee * that.searchResult[i].mAmount)
        //   }
        // }
        // console.log(feeList)
        // this.$axios({
        //   url:'',
        //   method:'post',
        //   data:{
        //     dia_M_Id:dia_M_Id_List,
        //     Fee:feeList
        //   }
        // }).then(response=>{
        //   console.log(response.data)
        //   this.onTapSearch()
        // }).catch(err=>{
        //   console.log(err)
        // })

        let that = this;
        console.log('cc',that.searchResult)
        let dia_M_Id_List =[]
        for(let i = this.checkList.length - 1; i > -1; i--) {
          if (this.checkList[i]) {
            dia_M_Id_List.push(that.searchResult[i].dia_M_Id)
          }
        }
        this.$axios({
          url:'diagnosis/updateMStateBydia_M_Id',
          method:'post',
          data:{
            dia_M_Id:dia_M_Id_List,
            mState:'已退药',
          }
        }).then(response=>{
          console.log(response.data)
          this.onTapSearch()
        }).catch(err=>{
          console.log(err)
        })



      }
    }
  }
</script>
<style>
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
