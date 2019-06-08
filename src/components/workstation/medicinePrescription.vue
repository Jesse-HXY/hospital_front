<template>
       
   <el-container>
  <el-header align="left">
    <el-tag>门诊诊断：</el-tag>
    <el-tag type="warning">【西医诊断】流行性腮腺炎</el-tag>
    <el-row :gutter="20" class=" bg-purple-light">
      <el-col :span="16" align="center">
        <div class="grid-content ">
        <el-button type="text" icon="el-icon-circle-plus" @click="onTapAddItem">增方</el-button>
        <el-button type="text" icon="el-icon-delete" @click="onTapDelete">删方</el-button>
        <el-button type="text" icon="el-icon-circle-check" @click="onTapBegin">开立</el-button>
        <el-button type="text" icon="el-icon-delete" @click="onTapAbandon">作废</el-button>
        <el-button type="text" icon="el-icon-plus">刷新</el-button>
       </div>


        <el-dialog
          title="提示"
          :visible.sync="centerDialogVisible"
          width="30%"
          center>
          <el-row>
            <el-col :span="4"><div class="grid-content ">处方名称：</div></el-col>
            <el-col :span="16"><div class="grid-content "><el-input placeholder="请输入处方名称" v-model="inputdiaName"></el-input></div></el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addPrescription">确 定</el-button>
  </span>
        </el-dialog>

      </el-col>
        <el-col :span="8">
          <div class="grid-content ">
            <el-button type="text" icon="el-icon-circle-plus-outline" @click="addMedicine" :disabled="controlAdd">增药</el-button>
            <el-button type="text" icon="el-icon-remove-outline" @click="deleteMedicine" :disabled="controlDelete">删药</el-button>
        </div></el-col>
    </el-row>
  </el-header>
     <el-dialog title="添加药品" :visible.sync="addmedicineVisible" width="700px">
       <el-form>
         <el-form-item label="输入药品编码">
           <el-autocomplete
             class="inline-input"
             v-model="searchmCode"
             :fetch-suggestions="querySearchBymCode"
             placeholder="请输入内容"
             :trigger-on-focus="false"
             @select="handleSelectBymCode"
           ></el-autocomplete>
         </el-form-item>
         <el-form-item label="输入药品拼音">
           <el-autocomplete
             class="inline-input"
             v-model="searchmSpell"
             :fetch-suggestions="querySearchBymSpell"
             placeholder="请输入内容"
             :trigger-on-focus="false"
             @select="handleSelectBymSpell"
           ></el-autocomplete>
         </el-form-item>
         <el-table :data="medicineDetailList">
           <el-table-column
           label="药品编码"
           prop="mCode">

         </el-table-column>
           <el-table-column
             label="药品名称"
             prop="mName">

           </el-table-column>
           <el-table-column
             label="药名拼音"
             prop="mSpell">

           </el-table-column>
           <el-table-column
             label="药品规格"
             prop="mSpecification">

           </el-table-column>
           <el-table-column
             label="单位"
             prop="mUnit">

           </el-table-column>
           <el-table-column
             label="生产者"
             prop="mProducer">

           </el-table-column>
           <el-table-column
             label="药品类型"
             prop="mType">
           </el-table-column>
           <el-table-column
             label="单价"
             prop="mFee">

           </el-table-column>
         </el-table>
          <div align="left">
         <el-row >
           <el-col :span="11"><div class="grid-content ">用法</div></el-col>
           <el-col :span="7"><div class="grid-content "><el-input placeholder="请输入用法" v-model="inputInstruction"></el-input></div></el-col>
         </el-row>
         <el-row>
           <el-col :span="11"><div class="grid-content ">用量</div></el-col>
           <el-col :span="7"><div class="grid-content "><el-input placeholder="请输入用量" v-model="inputDosage"></el-input></div></el-col>
         </el-row>
         <el-row>
           <el-col :span="11"><div class="grid-content ">频次</div></el-col>
           <el-col :span="7"><div class="grid-content "><el-input placeholder="请输入频次" v-model="inputTimes"></el-input></div></el-col>
         </el-row>
         <el-row>
           <el-col :span="11"><div class="grid-content ">数量</div></el-col>
           <el-col :span="7"><div class="grid-content "><el-input placeholder="请输入数量" v-model="inputmAmount"></el-input></div></el-col>
         </el-row>
          </div>

       </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button @click="addmedicineVisible = false">取 消</el-button>
         <el-button type="primary" @click="onTapConfirm">确 定</el-button>
       </div>
     </el-dialog>


     <!-------------------------------------------------------------------------------------------------------------->
     <el-main>
       <el-container>
         <el-aside width="200px"  style="border: 1px solid #eee"> <!--<el-tag type="info">门诊处方：</el-tag>-->
           <el-table :data="diagnosisList">
           <el-table-column
           width="25px">
             <template slot-scope="scope">
               <el-checkbox v-model="checkList[scope.$index]"></el-checkbox>
             </template>
           </el-table-column>

           <el-table-column
           label="名称"
           prop="diaName">
           </el-table-column>
           <el-table-column
           label="状态"
           prop="diaState">
           </el-table-column>
           </el-table>
         </el-aside>
         <el-main align="left">
           <el-tag>本处方金额合计：</el-tag>
           <el-tag type="warning">{{totalMoney}}</el-tag>
           <el-table  :data="medicinePrescriptionList">
             <el-table-column
               width="25px">
               <template slot-scope="scope">
               <el-checkbox v-model="checkMedicineList[scope.$index]"></el-checkbox>
               </template>
             </el-table-column>

           <el-table-column
           label="药品名称"
           prop="mName">
           </el-table-column>
             <el-table-column
               label="规格"
               prop="mSpecification">
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
     </el-main>

       <el-tabs type="border-card">
         <el-tab-pane label="处方模板">
           <el-container>
             <el-aside width="400px"  style="border: 1px solid #eee">
               <el-header>
               <el-row>
                 <el-col :span="4"><div class="grid-content ">名称：</div></el-col>
                 <el-col :span="12">
                   <div class="grid-content ">
                   <el-input v-model="searchTemplateName" placeholder="请输入内容" width="50%">
                   </el-input>
                 </div>
                 </el-col>
                 <el-col :span="6"><div class="grid-content ">
                   <el-button type="primary" @click="onTapSearch">查询</el-button>
                 </div></el-col>
               </el-row>
               </el-header>
               <el-main>
                 <el-table :data="templateList">
                   <el-table-column
                   label="模板名称"
                   prop="datName">
                   </el-table-column>
                   <el-table-column
                     label="范围"
                   prop="datScope">
                   </el-table-column>
                   <el-table-column
                   label="操作">
                     <template slot-scope="scope">

                     <el-button @click="viewTemplate(scope.row.datId)">详情</el-button>

                     </template>
                   </el-table-column>
                 </el-table>
               </el-main>

             </el-aside>
             <el-main align="left">

                <el-header>
                 <el-row>
                   <el-col :span="12"><div class="grid-content ">模板明细</div></el-col>
                   <el-col :span="12" align="right"><div class="grid-content ">
                     <el-button type="text" @click="useTemplate" :disabled="controlAdd">使用该模板</el-button></div></el-col>
                 </el-row>
                 <el-divider></el-divider>
               <el-table :data="medicineList">

                 <el-table-column
                   label="药品名称"
                 prop="mName">
                 </el-table-column>
                 <el-table-column
                   label="规格"
                   prop="mSpecification">
                 </el-table-column>
                 <el-table-column
                   label='单位'
                   prop="mUnit">
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

               </el-table>
                </el-header>
             </el-main>
           </el-container>
         </el-tab-pane>
         <el-tab-pane label="常用药品">常用药品</el-tab-pane>
         <el-tab-pane label="建议方案">建议方案</el-tab-pane>
         <el-tab-pane label="历史处方">历史处方</el-tab-pane>
       </el-tabs>

   </el-container>
</template>
<script>
    export default {
      props:["dId","rId"],
        data() {
          let editIndex=-1;
          let totalMoney=0;
            return {
              searchmSpell:'',
              searchmCode:'',
              searchTemplateName:'',
              editIndex:editIndex,
              createTime:'',
              templateList:[],
              medicineDetailList:[],
              dialogFormVisible:false,
              medicineList:[],
              searchmedicineList:[],
              medicinePrescriptionList:[],
              searchScope:'',
              searchDId:'',
              searchMedicineList:[],
              diagnosisList:[],
              searchmName:'',
              searchmNameList:'',
              centerDialogVisible:false,
              templateName:'',
              recordType:'',
              scope:'',
              inputdiaName:'',
              showDetail:false,
              isAdd:false,
              datId:0,
              mType:'',
              instruction:'',
              dosage:'',
              mId:0,
              times:'',
              diaName:'',
              checkList:[],
              checkMedicineList:[],
              addmedicineVisible:false,
              inputInstruction: '',
              inputDosage: '',
              inputTimes: '',
              inputmAmount: 0,
              datId:0,
              totalMoney:totalMoney,
              controlDelete:false,
              controlAdd:false
            }
        },
      created:function(){
          this.showPrescription()

          this.onTapSearch()



      },

      methods:{



        showPrescriptionDetail:function(){
          let diaId=0;
          this.reSetMoney()
          let that = this
          for(let i = this.checkList.length - 1; i > -1; i--) {
            if (this.checkList[i]) {
              // const tempCounter = i
              console.log("cnm", typeof this.diagnosisList[i].diaId)
              diaId = this.diagnosisList[i].diaId
              if(this.diagnosisList[i].diaState ==='废除'){
                that.controlDelete = true;
              }
              else{
                that.controlDelete = false;
              }
              this.$axios({
                url: 'diagnosis/selectMedicineDetail',
                method: 'post',
                data: {
                  diaId:diaId
                }
              }).then(response => {
                console.log('12334',response.data)
              this.medicinePrescriptionList = response.data.medicines;
                console.log("length",response.data.medicines.length);
                if(response.data.medicines.length >= 5  ){
                  that.controlDelete = false;
                  that.controlAdd = true;
                }
                else if(this.diagnosisList[i].diaState==='废除'){
                  that.controlDelete = true;
                  that.controlAdd = true;
                }
                else{
                  that.controlAdd = false;
                }

                for(let i =0;i<response.data.medicines.length;i++){
                  that.totalMoney += response.data.medicines[i].mFee * response.data.medicines[i].mAmount
                }
              }).catch(err => {
                console.log(err)
              })
            }

          }


        },



        addMedicine:function(){
          let that = this

          for(let i = this.checkList.length - 1; i > -1; i--) {
            if (this.checkList[i]) {
              console.log("123",this.diagnosisList[i])

            }
            if(this.diagnosisList[i].diaState==='废除'){
              that.controlDelete = true;
              that.controlAdd = true;
            }else {
              this.controlDelete = false;
              this.addmedicineVisible = true;

            }
          }

        },
          onTapConfirm(){
            // medicineList
            let that= this
            let  diaId = 0;
            for(let i = this.checkList.length - 1; i > -1; i--) {
              if (this.checkList[i]) {
                diaId = this.diagnosisList[i].diaId
              }
            }

            let prescription= {
              mId:that.medicineDetailList[0].mId,
              instruction: that.inputInstruction,
              dosage: that.inputDosage,
              times: that.inputTimes,
              mAmount: Number(that.inputmAmount)
              }
            let prescriptionList = []
              prescriptionList.push(prescription)
            ;
            console.log( '12345',that.inputInstruction)
            this.$axios({
              url:'diagnosis/insertDiagnosisMedicine',
              method:'post',

              data:{
                diaId: diaId,
                diagnosisMedicine:prescriptionList
              }
            }).then(res=>{
              console.log('4334',res.data)

            }).catch(err=>
            {
              console.log(err)
            })
           this.addmedicineVisible = false
            this.reSet()


          },
          showPrescription:function(){
            this.$axios({
              url:'diagnosis/selectByCondition',
              method:'post',
              data:{}
            }).then(response=>{
              console.log(response.data)
              this.diagnosisList=response.data

              console.log(this.diagnosisList)
            }).catch(err=>{
              console.log(err)
            })

          },
        querySearchBymCode(queryString, cb) {
          let that = this

          this.searchMedicineList = []
          this.$axios({
            url:'medicine/getMedicine',
            method: 'post',
            data:{
              mCode:that.searchmCode,


            }
          }).then(response=>{
            console.log(response.data)
            for(let i = 0; i < response.data.length; i++){
              this.searchMedicineList.push({value:response.data[i].mCode})

            }
            // that.examinationItem = response.data
            let searchMedicineList = this.searchMedicineList
            cb(searchMedicineList);
          })
        },
        querySearchBymSpell(queryString, cb) {
          let that = this

          this.searchMedicineList = []
          this.$axios({
            url:'medicine/getMedicine',
            method: 'post',
            data:{
              mSpell:that.searchmSpell,
            }
          }).then(response=>{
            console.log(response.data)
            for(let i = 0; i < response.data.length; i++){
              this.searchMedicineList.push({value:response.data[i].mSpell})

            }
            // that.examinationItem = response.data
            let searchMedicineList = this.searchMedicineList
            cb(searchMedicineList);
          })
        },
        handleSelectBymCode(item){
            let that = this
          this.searchmCode = item.value
          this.$axios({
            url:'medicine/getMedicine',
            method: 'post',
            data:{
              mCode:this.searchmCode
            }
          }).then(response=>{
            console.log(response.data)
            this.searchmSpell = response.data[0].mSpell
            this.medicineDetailList = response.data
          }).catch(err=>{
            console.log(err)
          })

        },
        handleSelectBymSpell(item){
          let that = this
          this.searchmSpell = item.value
          this.$axios({
            url:'medicine/getMedicine',
            method: 'post',
            data:{
              mSpell:this.searchmSpell
            }
          }).then(response=>{
            console.log(response.data)
            this.searchmCode = response.data[0].mCode
            this.medicineDetailList = response.data
          }).catch(err=>{
            console.log(err)
          })

        },

          addPrescription:function(){

            let that = this;
            console.log("123",that.rId);
            this.$axios({
              url:'diagnosis/insertDiagnosis',
              method:'post',
              data:{
                diaName:that.inputdiaName,
                diaType:'西药',
                rId:that.rId,
              }
            }).then(response=>{
              console.log(response)
              this.diagnosisList.push(response.data)
            }).catch(err=>{
              console.log(err)
            })

            that.centerDialogVisible = false;
            that.checkList.push(false)

          },
        /**
         * 删除项目
         */
        onTapDelete:function () {
          let that = this
          let diaIdList = []
          for(let i = this.checkList.length - 1; i > -1; i--){
            if(this.checkList[i]){
              if(this.diagnosisList[i].diaState === '开立'){
                alert("开立项目不能删除")
               }
               else{
                diaIdList.push(this.diagnosisList[i].diaId);
                this.diagnosisList.splice(i,1)
              }
              }

            }
          this.$axios({
            url:'diagnosis/deleteDiagnosis',
            method:'post',
            data:{
              diaIdList:diaIdList
            }
          })

        },
        onTapAddItem:function () {
          this.diaName='';
          this.centerDialogVisible = true
        },
        /**
         * 开立项目
         */
        onTapBegin:function () {

          let diaIdList = []
          for(let i = this.checkList.length - 1; i > -1; i--){
            if(this.checkList[i]){
              if(this.diagnosisList[i].diaState ==='废除'){
                alert("该项目已废除不能开立")
              }
              else {
                this.diagnosisList[i].diaState = '开立'
                console.log(this.diagnosisList[i])
                diaIdList.push(this.diagnosisList[i].diaId)
              }
            }
          }
          console.log(this.diagnosisList)


            this.$axios({
              url: 'diagnosis/updateDiagnosisState',
              method: 'post',
              data: {
                diaIdList: diaIdList,
                diaState: '开立'
              }
            })

        },
        /**
            作废
              **/
        onTapAbandon:function () {
          let diaIdList = []
          for(let i = this.checkList.length- 1; i > -1; i--){
            if(this.checkList[i]){
              if(this.diagnosisList[i].diaState === '开立'){

                this.diagnosisList[i].diaState = '废除'
                diaIdList.push(this.diagnosisList[i].diaId)
              }else{
                alert("只有开立项目才能废除")
              }
            }
          }
          this.$axios({
            url:'diagnosis/updateDiagnosisState',
            method:'post',
            data:{
              diaIdList:diaIdList,
              diaState: '废除'
            }
          })
        },
          onTapSearch:function () {
            let that = this
            let uId = this.$cookie.get('uId')
            let data = {

              datScope:that.searchScope,
              datName:that.searchTemplateName,
              uId:uId,
              diaType : '西药',
            }
            if(that.searchScope === '科室'){
              data.dId = that.searchDId
            }
            this.$axios({
              url:'medicine/getDiagnosisTemplateByCondition',
              method:'post',
              data:data
            }).then(response=>{
              that.templateList = response.data;
              // for(let i = 0; i < that.templateList.length; i++){
              //   let datTime = new Date(that.templateList[i].datTime * 1000)
              //   that.templateList[i].displayTime = datTime.toLocaleDateString().replace(/\//g, "-") + " " + datTime.toTimeString().substr(0, 8)
              // }
            })
          },
        viewTemplate:function(index){
          console.log(index)
          let that = this
          this.datId = index
          this.$axios({
            url:'medicine/checkDetail',
            method:'post',
            data:{
              datId:index
            }
          }).then(response=>{
            console.log(response.data)
            that.templateName = response.data.datName
            that.scope = response.data.datScope
            that.instruction = response.data.instruction
            that.dosage = response.data.dosage
            that.times = response.data.times
            that.datId = response.data.datId
            // let datTime = new Date()
            // that.createTime = response.data.datTime * 1000
            // that.displayTime = datTime.toLocaleDateString().replace(/\//g, "-") + " " + datTime.toTimeString().substr(0, 8)
            that.medicineList = response.data.medicines;
            console.log("denifn",that.medicineList);
            // if(that.scope === '科室'){
            //   that.dId = response.data.department.dId
            // }
            this.showDetail = true
          })
        },
        deleteMedicine:function(){
          let that =this
          let diaId = 0;
          let mId = 0;
          let mIdList=[]
          for(let i = this.checkList.length - 1; i > -1; i--) {
            if (this.checkList[i]) {
              diaId = this.diagnosisList[i].diaId;
              console.log("123",this.diagnosisList[i].diaId)

            }
          }

          for(let i = this.checkMedicineList.length - 1; i > -1; i--) {
            if (this.checkMedicineList[i]) {
              mId = this.medicinePrescriptionList[i].mId
              console.log("123",this.medicinePrescriptionList[i].mId)
              mIdList.push(this.medicinePrescriptionList[i].mId)
            }
          }
          this.$axios({
            url:'diagnosis/deleteMedicineFromDiagnosis',
            method:'post',
            data:{
              diaId:diaId,
              mIds:mIdList
            }
          }).then(response=>{
            console.log(response.data)
            for(let i = 0; i < that.medicinePrescriptionList.length; i++){
              if(that.medicinePrescriptionList[i].mId === mId){
                that.medicinePrescriptionList.splice(i,1)
                break
              }
            }
          }).catch(err=>{
            console.log(err)
          })
        },
        useTemplate:function(){
          let diaId = 0;
          let medicineAddList=[];
          let that = this
          for(let i = this.checkList.length - 1; i > -1; i--) {
            if (this.checkList[i]) {
              // const tempCounter = i
              console.log("cnm", this.diagnosisList[i].diaId)
              diaId = this.diagnosisList[i].diaId
            }
          }
            if(that.datId == 0 || diaId ==0){
            alert("请先选择模板和处方")
            }
            else {
              this.$axios({
                url: 'medicine/checkDetail',
                method: 'post',
                data: {
                  datId: that.datId
                }
              }).then(response => {
                console.log(response.data)
                medicineAddList = response.data.medicines;

                console.log('23213123', medicineAddList);
                console.log('4343', diaId)

                this.insertTemplateMedicine(diaId, medicineAddList)
              }).catch(err => {
                console.log(err)
              })
            }

        },
        //将模板药品放入到处方中
        insertTemplateMedicine:function(diaId, medicineAddList){
          this.$axios({
            url:'diagnosis/insertDiagnosisMedicine',
            method:'post',
            data:{
              diaId:diaId,
              diagnosisMedicine:medicineAddList
            }
          }).then(response=>{
            console.log(response.data)
            console.log('fewfewfewfweef',medicineAddList)
          }).catch(err=>
          {
            console.log(err)
          })
        },

        reSet:function () {
          this.searchmCode='';
          this.searchmSpell='';
          this.inputmAmount=0;
          this.inputTimes='';
          this.inputDosage='';
          this.inputInstruction='';

        },
        reSetMoney:function () {
          this.totalMoney=0
          this.controlAdd=false
          this.controlDelete=false
        }
      },
      //

      watch:{
        'checkList':'showPrescriptionDetail',



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
