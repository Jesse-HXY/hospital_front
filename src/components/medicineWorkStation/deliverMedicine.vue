<template>
       
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content ">
          <el-tag>门诊发药</el-tag>
        </div></el-col>
      <el-col :span="6"><div class="grid-content ">
       <el-input placeholder="请输入病历号" v-model="searchrId"></el-input>
      </div></el-col>
      <el-col :span="6"><div class="grid-content ">
        <!--<el-input placeholder="请输入时间" v-model="searchDate"></el-input>-->
        <!--<div class="block">-->
          <!--<el-date-picker-->
            <!--v-model="searchDate"-->
            <!--align="right"-->
            <!--type="date"-->
            <!--placeholder="选择日期"-->
            <!--&gt;-->
          <!--</el-date-picker>-->
        <!--</div>-->
        <el-date-picker
          v-model="searchDate"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </div></el-col>
      <el-col :span="6"><div class="grid-content ">
        <el-button @click="onTapSearch">查询</el-button>
        <el-button @click="deliverMedicine">发药</el-button>
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
              dia_M_Id:'',
              checkList:[],
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                },
                shortcuts: [{
                  text: '今天',
                  onClick(picker) {
                    picker.$emit('pick', new Date());
                  }
                }, {
                  text: '昨天',
                  onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                  }
                }, {
                  text: '一周前',
                  onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                  }
                }]
              },
            }
        },
      methods:{
        onTapSearch:function(){
          let that = this;
          this.searchDate = this.covertDate(this.searchDate)
          console.log(this.searchDate)
          this.$axios({
            url: "account/getMedicineByRIdAndTime",
            method:"post",
            data:{
              rId:that.searchrId,
              Date:that.searchDate,
            }
          }).then(response => {
            that.searchResult = response.data;

            console.log('result',response.data)
          }).catch(err=>{
            console.log(err)
          })
        },

        covertDate:function(date){
          let year =date.getFullYear();//获取完整的年份(4位,1970-????)
          let month = date.getMonth() + 1;//获取当前月份(0-11,0代表1月)
          let day = date.getDate();//获取当前日(1-31)
          if (month < 10) {
            month ="0" + month;
          }
          if (day < 10) {
            day ="0" + day;
          }
          let dateString = year +"-" + month + "-" + day;
          return dateString
        },

        deliverMedicine:function () {
          let that = this;
          console.log('cc',that.searchResult)
          let dia_M_Id_List =[]
          for(let i = this.checkList.length - 1; i > -1; i--) {
            if (this.checkList[i]) {
              dia_M_Id_List.push(that.searchResult[i].dia_M_Id)
              this.searchResult.splice(i,1)
              this.checkList.splice(i,1)
            }
          }
          if(dia_M_Id_List.length===0){
            this.$message({
              message:"请先选择你想要发的药",
              type:'warning'
            })
          }
          else {
            this.$axios({
              url: 'diagnosis/updateMStateBydia_M_Id',
              method: 'post',
              data: {
                dia_M_Id: dia_M_Id_List,
                mState: '已发药',
              }
            }).then(response => {
              console.log(response.data)
            }).catch(err => {
              console.log(err)
            })
            this.$message({
              message:"发药成功",
              type:'success'
            })
          }


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
