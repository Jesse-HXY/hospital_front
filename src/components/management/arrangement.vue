<template>
    <el-container>
      <el-header>排班规则列表</el-header>
      <el-main>
      <el-header>
        科室选择:
        <div style="width: 10%;display: inline-block">
          <el-select v-model="tempDId" filterable placeholder="选择科室名称">
            <el-option
              v-for="item in departmentList"
              :key="item.dId" :value="item.dId" :label="item.dName">
            </el-option>
          </el-select>
        </div>
        &nbsp&nbsp&nbsp&nbsp
        <el-button width="100" @click="onTapSearch">查询</el-button>
        <el-button width="100">清空</el-button>
      </el-header>
      <el-table
        stripe
        :data ="doctorList"
        style="width: 100%"
      >
        <el-table-column width="25px">
          <template slot-scope="scope"><el-checkbox v-model="checkList[scope.$index]"></el-checkbox></template>
        </el-table-column>
        <el-table-column width="150px"
        label="规则名称"
        prop="arName"
        ></el-table-column>
        <el-table-column
          width="150px"
          label="挂号等级"
          prop="rLName"
        ></el-table-column>
        <el-table-column
          width="150px"
          label="医生姓名"
          prop="uName"
        ></el-table-column>
        <el-table-column
          label="时间"
          style="width: auto;"
        ><template slot-scope="scope"><div v-for="day in scope.row.workingList" style="display: inline-block">
          <el-tag type="danger">{{day}}</el-tag>&nbsp&nbsp
        </div></template></el-table-column>
      </el-table>
      </el-main>
      <el-footer>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        @blur="checkTime($event)">
        </el-date-picker>
      </el-footer>
      <el-footer><el-button @click="onTapAdd" width="100">生成</el-button></el-footer>
    </el-container>
</template>

<script>
    export default {
        name: "arrangement",
      data(){
        /** 科室名称 */
        let departmentName = '';
        let doctorList = [];
        let beginDate = '';
        let endDate = '';
        let week=["星期一上午","星期一下午","星期二上午","星期二下午","星期三上午","星期三下午","星期四上午","星期四下午","星期五上午","星期五下午","星期六上午","星期六下午","星期日上午","星期日下午"]
        return{
          departmentName:departmentName,
          doctorList:doctorList,
          beginDate:beginDate,
          endDate:endDate,
          departmentList:[],
          tempDId: '',
          dId:'',
          dateRange:'',
          week:week,
          checkList: []
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
        /**搜索
         *
         */
        onTapSearch:function () {
          let that = this
          this.dId = this.tempDId
          this.$axios({
            url: 'arrangementRegulation/getArrangementList',
            method: 'post',
            data:{
              dId:that.dId
            }
          }).then(response=>{
            for(let i = 0; i < response.data.length; i++){
              let workingList = that.covertToWorkingList(response.data[i].arPlanList)
              let doctor = {
                uId:response.data[i].uId,
                arName:response.data[i].arName,
                rLName:response.data[i].rLName,
                uName:response.data[i].uName,
                arPlanList:response.data[i].arPlanList,
                workingList:workingList
              }
              that.doctorList.push(doctor)
              that.checkList.push(false)
            }
            console.log(response.data)
          }).catch(err=>{console.log(err)})
        },
        /** 根据arPlan转换成workingList */
        covertToWorkingList:function(arPlanList){
          let workingList = []
          for(let i = 0; i < this.week.length; i++){
            if(arPlanList[i] == 1){
              workingList.push(this.week[i])
            }
          }
          return workingList
        },
        /**转换date*/
        covertDate:function(date){
          let year = date.getFullYear()
          let month = date.getMonth()+1
          let day = date.getDate()
          let result =year+'-'+month+'-'+day
          return result
        },
        /**
         * 点击生成
         */
        onTapAdd:function () {
          let that = this
          let beginDate = this.covertDate(this.dateRange[0])
          let endDate = this.covertDate(this.dateRange[1])

          if(this.generateList()===0){
            this.$message({
              message:"请先选择规则",
              type:'warning'
            })
          }else {
            this.$axios({
              url: 'arrangement/insertArrangement',
              method: 'post',
              data: {
                dId: that.dId,
                plan: that.generateList(),
                beginDate: beginDate,
                endDate: endDate
              }
            })
            this.$message({
              message:"新增排班规则生成成功",
              type:'success'
            })
          }
        },
        /**
         * 生成uId与plan的列表
         */
        generateList:function () {
          let that = this
          let userList = []
          let planList = []
          let resultList = []
          for(let i = 0; i < that.checkList.length; i++){
            //判断是否选择
            if(that.checkList[i]){
              /** user的序号 */
              let index = userList.indexOf(that.doctorList[i].uId)
              //判断是否已经存储了这个user
              if(index == -1){
                userList.push(that.doctorList[i].uId)
                let plan = that.doctorList[i].arPlanList
                planList.push(plan)
              }else{
                planList[index] = this.combinePlanList(that.doctorList[i].arPlanList, planList[index])
              }
            }
          }
          for(let i = 0; i < userList.length; i++){
            let result = {
              uId: userList[i],
              plan:this.calculatePlan(planList[i])
            }
            resultList.push(result)
          }
          return resultList
        },
        /**
         * 两个arPlanList合成一个
         */
        combinePlanList:function (planList1,planList2) {
          /** 最后返回的list */
          let finalPlanList = []
          for(let i = 0; i < 14; i++){
            let final = planList1[i] + planList2[i]
            finalPlanList.push(final)
          }
          return finalPlanList
        },
        /**
         * 计算排班plan的值
         * */
        calculatePlan:function (planList) {
          let result = 0
          for(let i = 0; i < planList.length; i++){
            if(planList[i] != 0){
              result = result + Math.pow(2,13-i)
            }
          }
          return result
        },
        /**
         * 检查时间是否符合规范
         */
        checkTime:function (e) {
          let currentDate = new Date()
          console.log(currentDate.getTime()/(3600*1000*24))
          console.log(this.dateRange[0].getTime()/(3600*1000*24))
          if(Math.floor(currentDate.getTime()/(3600*1000*24)-this.dateRange[0].getTime()/(3600*1000*24))>0){
            alert("开始时间不能早于当前时间,重新选择")
            this.dateRange = ''
          }
        }
      }
    }
</script>

<style scoped>

</style>
