<template>
  <el-container>
    <el-aside width="45%" style="margin-top: -20px">
      <el-header style="text-align: left;">
        <el-tag>中药处方模版：</el-tag>
        <el-button type="text" icon="el-icon-circle-plus-outline" style="float: right;" @click="onTapAddNewTemplate">添加模版</el-button>
      </el-header>
      <el-main>

        <el-header style="text-align: left; font-size: 12px;margin-top: -20px;margin-left: -20px;">
          <template>
            名称：
            <div style="width: 200px;display: inline-block;">
              <el-input v-model="searchTemplateName"></el-input>
            </div>
            &nbsp&nbsp&nbsp&nbsp范围：
            <div style="width: 150px;display: inline-block">
              <el-select v-model="searchScope">
                <el-option label="全院" value="全院"></el-option>
                <el-option label="个人" value="个人"></el-option>
                <el-option label="科室" value="科室"></el-option>
              </el-select>
            </div>
          </template>
        </el-header>
        <el-header style="text-align: left; font-size: 12px;margin-left: -20px;">

          <el-button type="primary" @click="onTapSearch" style="float: right;">查询</el-button>
          <div v-if="searchScope==='科室'" style="display: inline-block;float:right;margin-right:38px;"> &nbsp&nbsp&nbsp科室：
            <div style="width: 150px;display: inline-block;">
              <el-select v-model="searchDId" filterable placeholder="请选择">
                <el-option
                  v-for="department in departmentList"
                  :key="department.dId"
                  :label="department.dName"
                  :value="department.dId">
                </el-option>
              </el-select>
            </div>
          </div>
          <!--</template>-->
        </el-header>
        <!--模版表格-->
        <el-table
          :data="templateList"
        >
          <el-table-column
            label="模版名称"
            prop="datName"
          ></el-table-column>
          <el-table-column
            width="165"
            label="创建时间"
            prop="displayTime"
          ></el-table-column>
          <el-table-column
            label="范围"
            prop="datScope"
          ></el-table-column>

          <el-table-column
            label="查看"
          ><template slot-scope="scope">
            <el-button @click="viewTemplate(scope.row.datId)" type="text">查看详情</el-button>
          </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-aside>
    <!--模版操作-->
    <el-main v-if="showDetail">
      <el-header style="text-align: left;">
        <el-tag>操作</el-tag>
        <div v-if="isAdd" style="float:right;">
          <el-button type="text" icon="el-icon-check" @click="onTapSubmit">提交</el-button>
          <el-button type="text" icon="el-icon-delete" @click="onTapGiveUp">放弃</el-button>
        </div>
        <div v-else style="float:right;">
          <el-button type="text" icon="el-icon-check" @click="onTapUpdate">更新</el-button>
          <el-button type="text" icon="el-icon-delete" @click="onTapDelete">删除</el-button>
        </div>
      </el-header>
      <el-header>模版明细：</el-header>
      <el-form :label-position="right" label-width="120px">
        <el-form-item label="模版名称：">
          <el-input v-model="templateName"></el-input>
        </el-form-item>
        <el-form-item label="创建时间：" style="text-align: left;">{{displayTime}}</el-form-item>
        <el-form-item label="适用范围：" style="text-align: left;">
          <el-select v-model="scope">
            <el-option label="全院" value="全院"></el-option>
            <el-option label="个人" value="个人"></el-option>
            <el-option label="科室" value="科室"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="科室：" v-if="scope==='科室'" style="text-align: left;">
          <el-select v-model="dId" filterable placeholder="请选择">
            <el-option
              v-for="department in departmentList"
              :key="department.dId"
              :label="department.dName"
              :value="department.dId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-button  size="large" type="primary" style="float:left;" @click="onTapAddMedicine">增加中药</el-button>
      <el-table
        :data="medicineList">
        <el-table-column
          label="药品名称"
          prop="mName"
        ></el-table-column>
        <el-table-column
          label="规格"
          prop="mSpecification"
          width="300"
        ></el-table-column>
        <el-table-column
          label="单位"
          prop="mUnit"
          width="85"
        ></el-table-column>
        <el-table-column
          label="用法"
          width="85"
        >
          <template slot-scope="scope">
            <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input  v-model="instruction"></el-input></span>
            <span v-else style="margin-left: 10px">{{scope.row.instruction}}</span>
          </template>

        </el-table-column>
        <el-table-column
          label="用量"
          width="85"
        >
          <template slot-scope="scope">
            <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input  v-model="dosage"></el-input></span>
            <span v-else style="margin-left: 10px">{{scope.row.dosage}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="频次"
          width="85"
        >
          <template slot-scope="scope">
            <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input  v-model="times"></el-input></span>
            <span v-else style="margin-left: 10px">{{scope.row.times}}</span>
          </template>

        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              @click="handleAdd(scope.$index, scope.row)" v-if="scope.$index == editIndex">添加</el-button>
            <el-button
              size="mini" v-else disabled>添加</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="onTapGiveUp" v-if="scope.$index == editIndex">放弃</el-button>
            <el-button type="danger" size="small" @click="onTapDeleteItem(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog title="添加项目" :visible.sync="dialogFormVisible" width="400px">
      <el-form>
        <el-form-item label="输入项目名称">
          <el-autocomplete
            class="inline-input"
            v-model="searchmName"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onTapConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  export default {
    name: "westernMedicine_template",
    data(){
      let editIndex = -1;
      return{
        editIndex:editIndex,
        createTime:'',
        templateList:[],
        itemList:[],
        dialogFormVisible:false,
        medicineList:[],
        searchmedicineList:[],
        departmentList:'',
        searchScope:'',
        searchDId:'',
        searchRecordType:'',
        displayTime:'',
        searchmName:'',
        searchmNameList:'',
        searchTemplateName:'',
        templateName:'',
        recordType:'',
        scope:'',
        dId:'',
        showDetail:false,
        isAdd:false,
        datId:0,
        mType:'',
        instruction:'',
        dosage:'',
        mId:0,
        times:'',
      }
    },created:function(){
      let that = this
      this.$axios({
        url:"department/getAllDepartments",
        method:"post",
      }).then(response=>{
        that.departmentList = response.data
      })
    },
    methods:{
      /**
       * 搜索
       * */
      onTapSearch:function(){
        let that = this
        let uId = this.$cookie.get('uId')
        let data = {

          datScope:that.searchScope,
          datName:that.searchTemplateName,
          uId:uId,
          diaType : '中药',
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
          for(let i = 0; i < that.templateList.length; i++){
            let datTime = new Date(that.templateList[i].datTime * 1000)
            that.templateList[i].displayTime = datTime.toLocaleDateString().replace(/\//g, "-") + " " + datTime.toTimeString().substr(0, 8)
          }
        })
      },
      onTapAddMedicine:function(){
        this.searchmName=''
        this.dialogFormVisible=true
      },
      /**
       * 寻找匹配项
       */
      querySearch(queryString, cb) {
        let that = this;


        this.searchmedicineList = []
        this.$axios({
          url:'medicine/getMedicineByMName',
          method: 'post',
          data:{
            mName:that.searchmName,
            mType:'中药',

          }
        }).then(response=>{
          console.log(response.data)
          for(let i = 0; i < response.data.length; i++){
            this.searchmedicineList.push({value:response.data[i].mName})
          }

          let searchmedicineList = this.searchmedicineList
          cb(searchmedicineList);
        })
      },
      handleSelect(item){
        this.searchmName = item.value
      },
      /**
       * 查看模版细节
       * */
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
          let datTime = new Date()
          that.createTime = response.data.datTime * 1000
          that.displayTime = datTime.toLocaleDateString().replace(/\//g, "-") + " " + datTime.toTimeString().substr(0, 8)
          that.medicineList = response.data.medicines;
          console.log("denifn",that.medicineList);
          if(that.scope === '科室'){
            that.dId = response.data.department.dId
          }
          this.showDetail = true
        })
      },
      /**
       * 添加新模版
       */
      onTapAddNewTemplate:function () {
        this.showDetail = true
        this.isAdd = true
        let currentDate = new Date()
        currentDate =currentDate .toLocaleDateString().replace(/\//g, "-") + " " + currentDate .toTimeString().substr(0, 8)
        let createTime = new Date()
        this.createTime = createTime.getTime()
        this.displayTime = currentDate
      },
      /**
       * 添加确认
       */
      onTapConfirm:function () {
        let that = this
        this.dialogFormVisible = false
        this.$axios({
          url: 'medicine/getMedicine',
          method: 'post',
          data: {
            mName:that.searchmName
          }
        }).then(response=>{
          console.log(response.data)
          that.medicineList.push(response.data[0])
        })
      },
      /**
       * 删除
       */
      onTapDeleteItem:function (index) {
        this.medicineList.splice(index,1)
      },
      /**
       *提交模版
       */
      onTapSubmit:function() {
        let diagnosisTemplateMedicines = [];
        let mIds = []
        for (let i = 0; i < this.medicineList.length; i++) {
          mIds.push(this.medicineList[i].mId)
        }
        let that = this
        console.log("123",that.medicineList);
        let instruction = that.instruction;
        let dosage = that.dosage;
        let times = that.times;
        for(let i=0 ;i<this.templateList.length;i++) {
          let diagnosisTemplateMedicine = {
            mId:1,
            instruction: instruction,
            dosage: dosage,
            times: times,
          };
          diagnosisTemplateMedicines.push(diagnosisTemplateMedicine)

        }

        let data = {

          datName: that.templateName,
          datTime: that.createTime,
          datScope: that.scope,
          datFee:that.datFee,
          diaType:'中药',
          diagnosisTemplateMedicines: that.medicineList,

        }
        if (this.scope === '个人') {
          data.uId = this.$cookie.get('uId')
        } else if (this.scope === '科室') {
          data.dId = this.dId
        }
        console.log(data)
        this.$axios({
          url: 'medicine/insertDiagnosisTemplate',
          method: 'post',
          data: data
        }).then(response => {
          that.onTapGiveUp()
          that.onTapSearch()
        })
      },
      /**
       * 放弃
       */
      onTapGiveUp:function () {
        this.isAdd = false
        this.showDetail = false
        this.reSet()
      },
      /**
       * 更新
       */
      onTapUpdate:function(){
        this.onTapDelete()
        this.onTapSubmit()

      },
      /**
       * 删除
       */
      onTapDelete:function(){
        let that = this
        let uId = this.$cookie.get('uId')
        this.axios({
          url:'medicine/deleteDiagnosisTemplateByPrimaryKey',
          method:'post',
          data:{
            datId : that.datId,
            uId: uId,
            dId: that.dId,
            datScope:that.scope
          }
        }).then(response=>{
          that.showDetail = false
          for(let i = 0; i < that.templateList.length; i++){
            if(that.templateList[i].rId === that.rId){
              that.templateList.splice(i,1)
              break
            }
          }
        })
      },
      reSet:function () {
        this.displayTime = ''
        this.searchmName = ''
        this.searchmNameList = ''
        this.searchTemplateName =''
        this.templateName = ''
        this.scope = ''
        this.dId = ''
        this.medicineList = []
      },
      handleEdit(index, row){
        let that=this;
        let mName = this.medicineList[index].mName;
        let mSpecification = this.medicineList[index].mSpecification;
        let mUnit = this.medicineList[index].mUnit;
        let instruction = this.medicineList[index].instruction;
        let dosage = this.medicineList[index].dosage;
        let times = this.medicineList[index].times;
        this.editIndex = index;

        let data={
          instruction: that.instruction,
          dosage: that.dosage,
          times:that.times
        }

      },
      handleAdd(index, row){
        let that = this
        let mId= this.medicineList[index].mId;
        let mSpecification = this.medicineList[index].mSpecification;
        let mUnit = this.medicineList[index].mUnit;
        let mCode = this.medicineList[index].mCode;
        let mName = this.medicineList[index].mName;
        let medicine={
          mName:mName,
          mSpecification:mSpecification,
          mUnit:mUnit,
          mId : mId,
          instruction:this.instruction,
          dosage:this.dosage,
          times:this.times,
          editIndex :-1
        };
        console.log(medicine)
        this.medicineList[index] = medicine;
        this.$axios({
          url:'medicine/updateDiagnosisTemplateMedicine',
          method:'post',
          data:{
            mId:mId,
            datId:this.datId,
            instruction:this.instruction,
            dosage:this.dosage,
            times:this.times
          }
        }).then(response => {
          //that.reSet()
          console.log(response.data);


        }).catch(err=>{
          console.log(err)
        });


        this.editIndex = -1
       // this.onTapDelete()
       //  this.onTapSubmit()

      },

    }
  }
</script>

<style scoped>

</style>
