<template>
  <el-container>
    <el-header>
      新增排班规则
    </el-header>
    <el-header>
      <template>
        科室名称：
        <div style="width: 10%;display: inline-block">
          <el-select v-model="tempDId" filterable placeholder="选择科室名称">
            <el-option
              v-for="item in departmentList"
              :key="item.dId" :value="item.dId" :label="item.dName">
            </el-option>
          </el-select>
        </div>
        &nbsp&nbsp&nbsp&nbsp挂号等级：
        <div style="width: 10%;display: inline-block">
          <el-select v-model="tempRLName" placeholder="选择挂号等级">
            <el-option label="专家号" value="专家号"></el-option>
            <el-option label="普通号" value="普通号"></el-option>
            <el-option label="急诊号" value="急诊号"></el-option>
          </el-select>
        </div>
      </template>
      &nbsp&nbsp&nbsp&nbsp
      <el-button @click="onTapSearch" width="100">查询</el-button>
      <el-button width="100">增加</el-button>
    </el-header>
    <el-main>
      <el-table
        stripe
        :data ="userList"
        style="width: 100%">
        <el-table-column
          prop="uName"
          width = 100px
          label="医生姓名"></el-table-column>
        <el-table-column
          width = 100px
          label="星期一上午">
          <template slot-scope="scope">
          <el-checkbox v-model="checkList[scope.$index].check1"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
          width = 100px
          label="星期一下午"><template slot-scope="scope">
          <el-checkbox v-model="checkList[scope.$index].check2"></el-checkbox>
        </template></el-table-column>
        <el-table-column
          width = 100px
          label="星期二上午"><template slot-scope="scope">
          <el-checkbox v-model="checkList[scope.$index].check3"></el-checkbox>
        </template></el-table-column>
        <el-table-column
          width = 100px
          label="星期二下午"><template slot-scope="scope">
          <el-checkbox v-model="checkList[scope.$index].check4"></el-checkbox>
        </template></el-table-column>
        <el-table-column
          width = 100px
          label="星期三上午"><template slot-scope="scope">
          <el-checkbox v-model="checkList[scope.$index].check5"></el-checkbox>
        </template></el-table-column>
        <el-table-column
          width = 100px
          label="星期三下午"><template slot-scope="scope">
          <el-checkbox v-model="checkList[scope.$index].check6"></el-checkbox>
        </template></el-table-column>
        <el-table-column
          width = 100px
          label="星期四上午"><template slot-scope="scope">
          <el-checkbox v-model="checkList[scope.$index].check7"></el-checkbox>
        </template></el-table-column>
        <el-table-column
          width = 100px
          label="星期四下午"><template slot-scope="scope">
          <el-checkbox v-model="checkList[scope.$index].check8"></el-checkbox>
        </template></el-table-column>
        <el-table-column
          width = 100px
          label="星期五上午"><template slot-scope="scope">
          <el-checkbox v-model="checkList[scope.$index].check9"></el-checkbox>
        </template></el-table-column>
        <el-table-column
          width = 100px
          label="星期五下午"><template slot-scope="scope">
          <el-checkbox v-model="checkList[scope.$index].check10"></el-checkbox>
        </template></el-table-column>
        <el-table-column
          width = 100px
          label="星期六上午"><template slot-scope="scope">
          <el-checkbox v-model="checkList[scope.$index].check11"></el-checkbox>
        </template></el-table-column>
        <el-table-column
          width = 100px
          label="星期六下午"><template slot-scope="scope">
          <el-checkbox v-model="checkList[scope.$index].check12"></el-checkbox>
        </template></el-table-column>
        <el-table-column
          width = 100px
          label="星期日上午"><template slot-scope="scope">
          <el-checkbox v-model="checkList[scope.$index].check13"></el-checkbox>
        </template></el-table-column>
        <el-table-column
          width = 100px
          label="星期日下午"><template slot-scope="scope">
          <el-checkbox v-model="checkList[scope.$index].check14"></el-checkbox>
        </template></el-table-column>

      </el-table>
    </el-main>
    <el-footer>规则名称：
      <div style="width: 10%;display: inline-block">
        <el-input
          v-model="aRName"
          size="mini"
          placeholder="排班规则名称"
        />
      </div>
    </el-footer>
    <el-footer>
      <el-button width="100">取消</el-button>
      <el-button width="100" @click="onTapSave">保存</el-button>
    </el-footer>

  </el-container>
</template>

<script>
    export default {
      name: "arrangementRegulation",
      data(){
        /**排班规则所属科室*/
        let departmentName = '';
        /** 规则名称 */
        let aRName = '';
          let userList = [];
        return{
          tempDId:'',
          dId:'',
          aRName:aRName,
          tempRLName:'',
          rLName:'',
          departmentName:departmentName,
          userList:userList,
          departmentList:[],
          checkList:[{check1:false,check2:false,check3:false,check4:false,check5:false,check6:false,check7:false,check8:false,check9:false,check10:false,check11:false,check12:false,check13:false,check14:false},
            {check1:false,check2:false,check3:false,check4:false,check5:false,check6:false,check7:false,check8:false,check9:false,check10:false,check11:false,check12:false,check13:false,check14:false},
            {check1:false,check2:false,check3:false,check4:false,check5:false,check6:false,check7:false,check8:false,check9:false,check10:false,check11:false,check12:false,check13:false,check14:false}]
        }
      },created:function () {
        let that = this
        this.$axios({
          url:"department/getDepartments",
          method:"post",
          data:{
            dCategory:"临床"
          }
        }).then(response=>{
          that.departmentList = response.data
        })
      },methods:{
        /**
         * 点击搜索按钮
         * */
        onTapSearch:function(){
          this.dId = this.tempDId
          this.rLName = this.tempRLName
          let that = this
          this.$axios({
            url:'user/getUerByDIdAndRLName',
            method:'post',
            data:{
              dId:that.dId,
              rLName:that.rLName
            }
          }).then(response=>{
            that.userList = response.data
            for(let i = 0; i < that.userList; i++){
              that.checkList.push({check1:false,check2:false,check3:false,check4:false,check5:false,check6:false,check7:false,check8:false,check9:false,check10:false,check11:false,check12:false,check13:false,check14:false})
            }
          })
        },
        /**
         * 点击保存
         * */
        onTapSave:function () {
          let resultList = []
          let that = this
          for(let i = 0; i< this.checkList.length; i++){
            let resultPlan = this.calculatePlan(this.checkList[i])
            let uId = that.userList[i].uId
            let result = {
              uId:uId,
              aRPlan:resultPlan
            }
            resultList.push(result)
          }
          console.log(that.dId)
          console.log(that.rLName)
          console.log(resultList)
          this.$axios({
            url: 'arrangementRegulation/insertArrangementRegulation',
            method: 'post',
            data:{
              dId:that.dId,
              rLName: that.rLName,
              aRName:that.aRName,
              resultList:resultList
            }
          }).then(response=>{

          }).catch(err=>{
            console.log(err)
          })
        },
        /**
         * 计算排班plan的值
         * */
        calculatePlan:function (check) {
          let result = 0
          if(check.check1){
            result = result + Math.pow(2,13)
          }if(check.check2){
            result = result + Math.pow(2,12)
          }if(check.check3){
            result = result + Math.pow(2,11)
          }if(check.check4){
            result = result + Math.pow(2,10)
          }if(check.check5){
            result = result + Math.pow(2,9)
          }if(check.check6){
            result = result + Math.pow(2,8)
          }if(check.check7){
            result = result + Math.pow(2,7)
          }if(check.check8){
            result = result + Math.pow(2,6)
          }if(check.check9){
            result = result + Math.pow(2,5)
          }if(check.check10){
            result = result + Math.pow(2,4)
          }if(check.check11){
            result = result + Math.pow(2,3)
          }if(check.check12){
            result = result + Math.pow(2,2)
          }if(check.check13){
            result = result + Math.pow(2,1)
          }if(check.check14){
            result = result + Math.pow(2,0)
          }
          return result
        }
      }

    }
</script>

<style scoped>

</style>
