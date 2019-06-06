<template>
    <el-container>
      <el-header style="text-align: center;">
        <el-button type="text" icon="el-icon-success">执行确认</el-button>
        <el-button type="text" icon="el-icon-delete">取消执行</el-button>
      </el-header>
      <el-main>
        <el-table style="margin-top: -35px"
                  :data="examinationItemList">
          <el-table-column width="35"
          >
            <el-checkbox></el-checkbox>
          </el-table-column>
          <el-table-column
            label="申请名称"
            prop="eAName"
          >
          </el-table-column>
          <el-table-column
            label="项目名称"
            prop="examnationItem.eIName"
          >
          </el-table-column>
          <el-table-column
            label="执行状态"
            prop="eAStatus"
          ></el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button type="text">录入结果</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog :visible.sync="inputResultDialog" title="录入结果">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="result">
          </el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="inputResultDialog = false">取 消</el-button>
            <el-button type="primary" @click="onTapConfirm" >确 定</el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
</template>

<script>
    export default {
      props:['rId','dId'],
        name: "patientExamination",
      data(){
          return{
            inputResultDialog:false,
            result:'',
            examinationItemList:[]
          }
      },methods:{
        onTapConfirm:function () {
          
        },
        getExaminationApplication:function () {
          let that = this
          this.$axios({
            url:'diagnosis/getByrIdAndEIFeeType',
            method:'post',
            data:{
              rId:that.rId,
              eIFeeType:'检查费',
              dId:this.dId,
              eAStatus:'已收费'
            }
          }).then(response=>{
            that.examinationItemList = response.data
            console.log(that.examinationItemList)
          })

        }
      },watch:{
        'rId':'getExaminationApplication',
        'dId':'getExaminationApplication'
      }
    }
</script>

<style scoped>

</style>
