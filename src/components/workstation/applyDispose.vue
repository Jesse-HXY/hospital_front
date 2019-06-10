<template>
  <el-container>
    <el-aside width="70%">
      <el-header style="height: 20px;">
        <el-button type="text" icon="el-icon-circle-plus" @click="onTapAddItem" >新增项目</el-button>
        <el-button type="text" icon="el-icon-delete" @click="onTapDelete">删除项目</el-button>
        <el-button type="text" icon="el-icon-circle-check" @click="onTapBegin">开立项目</el-button>
        <el-button type="text" icon="el-icon-delete" @click="onTapAbandon">作废项目</el-button>
        <el-button type="text" icon="el-icon-plus" @click="onTapAddTemplate">存为组套</el-button>
      </el-header>
      <el-main>
        <div style="text-align: left;">
          <el-tag>合计金额</el-tag>
          <el-tag type="warning">{{totalFee}}元</el-tag>
        </div>
        <el-table
          :data="examinationItemList">
          <el-table-column
            width="25px">
            <template slot-scope="scope">
              <el-checkbox v-model="checkList[scope.$index]"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            label="申请名称"
            prop="appName"></el-table-column>
          <el-table-column
            label="项目名称"
            prop="eIName"></el-table-column>
          <el-table-column
            label="执行科室"
            prop="dName"
          ></el-table-column>
          <el-table-column
            label="执行状态"
            prop="eAStatus"></el-table-column>
          <el-table-column
            label="单价"
            prop="eIFee"></el-table-column>
          <el-table-column
            label="检查结果"
          ></el-table-column>
        </el-table>
      </el-main>
    </el-aside>
    <el-main>
      <el-tabs type="card">
        <el-tab-pane label="常用模版">
          <el-table
            :data="examinationTemplateList">
            <el-table-column
              label="名称"
              prop="eTName"
            ></el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="onTapUse(scope.row.eTId)">使用</el-button>
                <el-button type="text" size="mini" @click="onTapShowDetail(scope.row.eTId)">详细</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <!----------------------------------显示模版详细内容对话框------------------------------------------------------------>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <el-form :label-position="right" label-width="120px">
        <el-form-item label="模版名称：">{{examinationTemplate.templateName}}
        </el-form-item>
        <el-form-item label="创建时间：" style="text-align: left;">{{examinationTemplate.displayTime}}</el-form-item>
        <el-form-item label="适用范围：" style="text-align: left;">
          {{examinationTemplate.scope}}
        </el-form-item>
        <el-form-item label="记录类型：" style="text-align: left;">
          {{examinationTemplate.recordType}}
        </el-form-item>
        <el-form-item label="科室：" v-if="examinationTemplate.scope ==='科室'" style="text-align: left;">
        </el-form-item>
      </el-form>
      <el-table
        :data="examinationTemplate.examinationItemList">
        <el-table-column
          label="项目编码"
          prop="eIId"
          width="80"
        ></el-table-column>
        <el-table-column
          label="项目名称"
          prop="eIName"
          width="200"
        ></el-table-column>
        <el-table-column
          label="项目规格"
          prop="eISpecification"
          width="80"
        ></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
       <el-button @click="centerDialogVisible = false">取 消</el-button>
       <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!----------------------------------------------------增加项目弹窗-------------------------------------------------->
    <el-dialog title="添加项目" :visible.sync="dialogFormVisible" :label-position="right" width="400px">
      <el-form>
        <el-form-item label="输入申请名称">
          <el-input v-model="eAName"></el-input>
        </el-form-item>
        <el-form-item label="输入项目名称">
          <el-autocomplete
            class="inline-input"
            v-model="searchEIName"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="选择执行科室">
          <el-select style="width: 100px;" v-model="executeDId" filterable placeholder="请选择科室">
            <el-option
              v-for="department in departmentList"
              :key="department.dId"
              :label="department.dName"
              :value="department.dId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onTapConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <!----------------------------------------------选择科室------------------------------------------------------------>
    <el-dialog title="添加项目" :visible.sync="departmentChooseDialogVisible" :label-position="right" width="400px">
      <el-form>
        <el-form-item label="科室选择">
          <el-select style="width: 100px;" v-model="executeDId" filterable placeholder="请选择科室">
            <el-option
              v-for="department in departmentList"
              :key="department.dId"
              :label="department.dName"
              :value="department.dId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="departmentChooseDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onTapChooseDepartmentConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-----------------------------------------------存为组套----------------------------------------------------------->
    <el-dialog
      title="存为组套"
      :visible.sync="createTemplateDialogVisible"
      width="30%"
      center>
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
        <el-form-item label="记录类型：" style="text-align: left;">
          <el-select v-model="recordType">
            <el-option label="检查" value="检查"></el-option>
            <el-option label="检验" value="检验"></el-option>
            <el-option label="处置" value="处置"></el-option>
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
      <el-table
        :data="examinationItemList">
        <el-table-column
          label="项目编码"
          prop="eIId"
          width="80"
        ></el-table-column>
        <el-table-column
          label="项目名称"
          prop="eIName"
          width="200"
        ></el-table-column>
        <el-table-column
          label="项目规格"
          prop="eISpecification"
          width="80"
        ></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
       <el-button @click="createTemplateDialogVisible = false">取 消</el-button>
       <el-button type="primary" @click="onTapConfirmCreateTemplate">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
  export default {
    props:["dId","rId"],
    name: "applyDispose",
    data() {
      return {
        examinationItemList:[],
        examinationTemplateList: [],
        centerDialogVisible: false,
        dialogFormVisible:false,
        orginalExaminationTemplateList:[],
        examinationItem:{},
        examinationTemplate:{},
        searchExaminationItemList:[],
        searchEIName:'',
        eAName:'',
        departmentChooseDialogVisible:false,
        executeDId:'',
        departmentList:[],
        executeDName:'',
        eTId:0,
        checkList:[],
        createTemplateDialogVisible:false,
        templateName: '',
        scope: '',
        recordType:'',
        totalFee:0.0,
        displayTime:'',
        right:'right'
      }
    },
    created:function () {
      let that = this;
      that.orginalExaminationTemplateList = [];
      let uId = this.$cookie.get('uId');
      this.$axios({
        url: 'examnationItem/getExaminationTemplateByCondition',
        method: 'post',
        data: {
          uId:uId,
          eTScope:'个人',
          eTName:'',
          recordType:'处置'
        }
      }).then(response => {
        that.orginalExaminationTemplateList = that.orginalExaminationTemplateList.concat(response.data)
        this.$axios({
          url: 'examnationItem/getExaminationTemplateByCondition',
          method: 'post',
          data: {
            uId:uId,
            eTScope:'全院',
            eTName:'',
            recordType:'处置'
          }
        }).then(response => {
          that.orginalExaminationTemplateList = that.orginalExaminationTemplateList.concat(response.data);
          that.examinationTemplateList = that.orginalExaminationTemplateList
        });
        this.$axios({
          url:"department/getAllDepartments",
          method:"post",
        }).then(response=>{
          that.departmentList = response.data
        })
      });
    },methods:{
      /**
       * 点击使用
       */
      onTapUse:function (eTId) {
        this.eTId = eTId
        this.executeDId = ''
        this.departmentChooseDialogVisible = true
      },
      /**
       * 点击确认科室选择
       * */
      onTapChooseDepartmentConfirm:function(){
        let that = this;
        let eTId = this.eTId
        this.$axios({
          url:'examnationItem/checkDetail',
          method:'post',
          data:{
            eTId:eTId
          }
        }).then(response=>{
          let examinationItemList = response.data.examnationItemList;
          let templateName = response.data.eTName;
          for(let i = 0; i < examinationItemList.length; i++){
            let examinationItem = {
              eIFee: examinationItemList[i].eIFee,
              eISpecification:examinationItemList[i].eISpecification,
              eIId:examinationItemList[i].eIId,
              eIName: examinationItemList[i].eIName,
              eAStatus:'暂存',
              appName:"模版："+templateName,
              dId:that.executeDId
            };
            this.getDNamebyDIdAndInsertIntoEaminaitonItemList(this.executeDId,examinationItem);
          }
          this.departmentChooseDialogVisible = false
        })
      },
      /**
       * 显示细节
       */
      onTapShowDetail:function (eTID) {
        this.centerDialogVisible=true;
        let that = this;
        this.$axios({
          url:'examnationItem/checkDetail',
          method:'post',
          data:{
            eTId:eTID
          }
        }).then(response=>{
          let eTDate = new Date();
          that.createTime = response.data.eTDate * 1000;
          let examinationTemplate = {
            templateName : response.data.eTName,
            scope : response.data.eTScope,
            createTime : response.data.eTDate * 1000,
            displayTime : eTDate.toLocaleDateString().replace(/\//g, "-") + " " + eTDate.toTimeString().substr(0, 8),
            examinationItemList : response.data.examnationItemList,
            recordType : response.data.recordType
          };
          if(examinationTemplate.scope === '科室'){
            examinationTemplate.dId = response.data.department.dId
          }
          that.examinationTemplate = examinationTemplate
        })
      },
      /**
       * 添加项目
       */
      onTapAddItem:function () {
        this.eAName = '';
        this.searchEIName='';
        this.dialogFormVisible = true
      },
      /**
       * 寻找匹配项
       */
      querySearch(queryString, cb) {
        let that = this;
        let recordType = '';
        if(that.recordType==='处置'){
          recordType = '治疗费'
        }else{
          recordType = that.recordType + '费'
        }
        this.searchExaminationItemList = [];
        this.$axios({
          url:'examnationItem/getExamnationItemByEIName',
          method: 'post',
          data:{
            eIName:that.searchEIName,
            recordType:'处置'
          }
        }).then(response=>{
          for(let i = 0; i < response.data.length; i++){
            this.searchExaminationItemList.push({value:response.data[i].eIName})
          }
          let searchExaminationItemList = this.searchExaminationItemList;
          cb(searchExaminationItemList);
        })
      },
      handleSelect(item){
        this.searchEIName = item.value
      },
      /**
       * 点击选择检查项目的添加
       */
      onTapConfirm:function () {
        let that = this;
        this.dialogFormVisible = false;
        this.$axios({
          url: 'examnationItem/getExamnationItems',
          method: 'post',
          data: {
            eIName:that.searchEIName
          }
        }).then(response => {
          let examinationItem = {
            eIFee: response.data[0].eIFee,
            eISpecification: response.data[0].eISpecification,
            eIId: response.data[0].eIId,
            eIName: response.data[0].eIName,
            eAStatus: '暂存',
            appName: that.eAName,
            dId:that.executeDId
          };
          this.getDNamebyDIdAndInsertIntoEaminaitonItemList(this.executeDId,examinationItem);
        })
      },
      /**
       * 根据dId得到dName
       */
      getDNamebyDIdAndInsertIntoEaminaitonItemList:function (dId,examinationItem) {
        let that = this
        this.$axios({
          url:'department/getDepartments',
          method:'post',
          data:{
            dId
          }
        }).then(response=>{
          examinationItem.dName = response.data[0].dName
          this.insertExamination(examinationItem)
        })
      },
      /**
       * 将examinationItem插入数据库
       */
      insertExamination:function (examinationItem) {
        let that = this
        this.$axios({
          url:'diagnosis/insertAndGet',
          method:'post',
          data:{
            eAName:examinationItem.appName,
            eIId:examinationItem.eIId,
            dId:examinationItem.dId,
            eAStatus:examinationItem.eAStatus,
            rId:that.rId
          }
        }).then(response=>{
          examinationItem.eAId = response.data.eAId
          that.examinationItemList.push(examinationItem);
          that.checkList.push(false)
        })
      },
      /**
       * 删除项目
       */
      onTapDelete:function () {
        let that = this
        let eAIdList = []
        for(let i = this.checkList.length - 1; i > -1; i--){
          if(this.checkList[i]){
            if(this.examinationItemList[i].eAStatus === '开立'){
              alert("开立项目不能删除")
            }else {
              eAIdList.push(this.examinationItemList[i].eAId)
              this.examinationItemList.splice(i, 1)
            }
          }
        }
        this.$axios({
          url:'diagnosis/deleteExaminationApplication',
          method:'post',
          data:{
            eAIdList:eAIdList
          }
        })
      },
      /**
       * 开立项目
       */
      onTapBegin:function () {
        let eAIdList = []
        for(let i = this.checkList.length - 1; i > -1; i--){
          if(this.checkList[i]){
            this.examinationItemList[i].eAStatus = '开立'
            eAIdList.push(this.examinationItemList[i].eAId)
          }
        }
        this.$axios({
          url:'diagnosis/updateStatus',
          method:'post',
          data:{
            eAIdList:eAIdList,
            eAStatus: '开立'
          }
        })
      },
      /**
       * 废除项目
       */
      onTapAbandon:function () {
        let eAIdList = []
        for(let i = this.checkList.length- 1; i > -1; i--){
          if(this.checkList[i]){
            this.examinationItemList[i].eAStatus = '废除'
            eAIdList.push(this.examinationItemList[i].eAId)
          }
        }
        this.$axios({
          url:'diagnosis/updateStatus',
          method:'post',
          data:{
            eAIdList:eAIdList,
            eAStatus: '废除'
          }
        })
      },
      /**
       * 存为组套
       */
      onTapAddTemplate:function () {
        let that = this
        let eTDate = new Date()
        that.createTime = eTDate * 1000
        that.displayTime = eTDate.toLocaleDateString().replace(/\//g, "-") + " " + eTDate.toTimeString().substr(0, 8)
        this.createTemplateDialogVisible = true
      },
      /**
       * 点击确认创建模版
       */
      onTapConfirmCreateTemplate:function () {
        let eIIds = []
        for (let i = 0; i < this.examinationItemList.length; i++) {
          eIIds.push(this.examinationItemList[i].eIId)
        }
        let that = this
        let data = {
          eTName: that.templateName,
          eTDate: that.createTime,
          eTScope: that.scope,
          recordType: that.recordType,
          eIds: eIIds
        }
        if (this.scope === '个人') {
          data.uId = this.$cookie.get('uId')
        } else if (this.scope === '科室') {
          data.dId = this.dId
        }
        this.$axios({
          url: 'examnationItem/insertExaminationTemplate',
          method: 'post',
          data: data
        }).then(response=>{

        })
      }
    },watch:{
      'dId':function (dId) {
        let that = this;
        let uId = this.$cookie.get('uId');
        this.$axios({
          url: 'examnationItem/getExaminationTemplateByCondition',
          method: 'post',
          data: {
            uId:uId,
            eTScope:'科室',
            dId:this.dId,
            eTName:'',
            recordType:'处置'
          }
        }).then(response => {
          that.examinationTemplateList = that.orginalExaminationTemplateList.concat(response.data);
        })
      },
      'rId':function (rId) {
        let that = this
        this.$axios({
          url:'diagnosis/selectByrIdAndEIFeeType',
          method:'post',
          data:{
            rId:rId,
            eIFeeType:'治疗费'
          }
        }).then(response=>{
          for(let i = 0; i < response.data.length; i++){
            const tempCounter = i
            const examination = {
              dId:response.data[tempCounter].dId,
              eAId:response.data[tempCounter].eAId,
              appName:response.data[tempCounter].eAName,
              eAResult:response.data[tempCounter].eAResult,
              eAStatus:response.data[tempCounter].eAStatus,
              eIId:response.data[tempCounter].eIId,
              eIName:response.data[tempCounter].examnationItem.eIName,
              eIFee:response.data[tempCounter].examnationItem.eIFee,
              eISpecification:response.data[tempCounter].examnationItem.eISpecification
            }
            this.$axios({
              url:'department/getDepartments',
              method:'post',
              data:{
                dId: examination.dId
              }
            }).then(response=>{
              examination.dName = response.data[0].dName
              this.examinationItemList.push(examination)
            })
          }
        })
      },
      'examinationItemList':function (examinationItemList) {
        let totalFee = 0.0
        for(let i = 0; i < examinationItemList.length; i++){
          totalFee = totalFee + examinationItemList[i].eIFee
        }
        this.totalFee = Math.round(totalFee * 100) / 100
      }
    }
  }
</script>

<style scoped>

</style>
