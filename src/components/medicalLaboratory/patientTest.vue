<template>
  <el-container>
    <el-header style="text-align: center;">
      <el-button type="text" icon="el-icon-success" @click="onTapExecute">执行确认</el-button>
      <el-button type="text" icon="el-icon-delete" @click="onTapCancel">取消执行</el-button>
    </el-header>
    <el-main>
      <el-table style="margin-top: -35px"
                :data="examinationItemList">
        <el-table-column width="35"
        >
          <template slot-scope="scope">
            <el-checkbox v-model="checkList[scope.$index]"></el-checkbox>
          </template>
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
            <div v-if="scope.row.eAStatus === '执行中'">
              <el-button type="text" @click="inputResult(scope.$index)">录入结果</el-button>
            </div>
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
    name: "patientTest",
    data(){
      return{
        inputResultDialog:false,
        result:'',
        examinationItemList:[],
        checkList:[],
        eAIdList:[],
        uId:0,
        currentIndex:-1
      }
    },created:function(){
      this.uId = this.$cookie.get('uId')
    }
    ,methods:{
      onTapConfirm:function () {
        let eAIdList = []
        this.examinationItemList[this.currentIndex].eAStatus = '执行结束'
        eAIdList.push(this.examinationItemList[this.currentIndex].eAId)
        this.updateEAStatus(eAIdList, '执行结束')
        this.$axios({
          url:'diagnosis/updateResult',
          method:'post',
          data:{
            eAId:this.examinationItemList[this.currentIndex].eAId,
            eAResult: this.result
          }
        })
      },
      /**
       * 录入结果
       */
      inputResult:function(index){
        this.result = ''
        this.inputResultDialog = true
        this.currentIndex = index
      },
      getExaminationApplication:function () {
        let that = this
        that.checkList = []
        let eAStatusList = ["执行中","已收费","执行结束","取消执行"]
        for(let i = 0; i < eAStatusList.length; i++){
          this.$axios({
            url:'diagnosis/getByrIdAndEIFeeType',
            method:'post',
            data:{
              rId:that.rId,
              eIFeeType:'检验费',
              dId:this.dId,
              eAStatus:eAStatusList[i]
            }
          }).then(response=>{
            console.log(response.data)
            that.examinationItemList = that.examinationItemList.concat(response.data)
            for(let i = 0; i < response.data.length; i++){
              that.checkList.push(false)
            }
            console.log(that.examinationItemList)
          })
        }
      },
      /**
       * 执行检查
       */
      onTapExecute:function(){
        this.changeEAStatus('执行中',true)
      },
      /**
       * 取消执行
       */
      onTapCancel:function(){
        this.changeEAStatus('已取消执行',false)
      },
      insertAccount:function(){
        this.$axios({
          url:'account/updateUId',
          method:'post',
          data:{
            uId:this.uId,
            dId:this.dId,
            rId:this.rId,
            eAIdList:this.eAIdList
          }
        })
      },
      changeEAStatus:function (eAStatus, insertAccount) {
        let eAIdList = []
        for(let i = 0; i < this.checkList.length; i++){
          if(this.checkList[i]){
            this.examinationItemList[i].eAStatus = eAStatus
            eAIdList.push(this.examinationItemList[i].eAId)
          }
        }
        this.eAIdList = eAIdList
        if(insertAccount){
          this.insertAccount()
        }
        this.updateEAStatus(eAIdList, eAStatus)
      },
      updateEAStatus:function (eAIdList, eAStatus) {
        this.$axios({
          url:'diagnosis/updateStatus',
          method:'post',
          data:{
            eAIdList:eAIdList,
            eAStatus: eAStatus
          }
        }).then(response=>{
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
