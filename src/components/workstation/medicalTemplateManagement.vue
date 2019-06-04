<template>
    <el-container>
      <el-aside width="45%" style="margin-top: -20px">
        <el-header style="text-align: left;">
          <el-tag>医技模版：</el-tag>
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
            <!--<template>-->
              类型：
              <div style="width: 100px;display: inline-block">
                <el-select v-model="searchRecordType">
                  <el-option label="检查" value="检查"></el-option>
                  <el-option label="检验" value="检验"></el-option>
                  <el-option label="处置" value="处置"></el-option>
                </el-select>
              </div>
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
            prop="eTName"
            ></el-table-column>
            <el-table-column
              width="165"
              label="创建时间"
              prop="displayTime"
            ></el-table-column>
            <el-table-column
              label="范围"
              prop="eTScope"
            ></el-table-column>
            <el-table-column
              label="类型"
              prop="recordType"
            ></el-table-column>
            <el-table-column
              label="查看"
            ><template slot-scope="scope">
                <el-button @click="viewTemplate(scope.row.eTId)" type="text">查看详情</el-button>
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
        <el-button v-if="recordType===''" size="large" type="primary" style="float:left;" @click="onTapAddExaminationItem" disabled>请先选择类型</el-button>
        <el-button v-else size="large" type="primary" style="float:left;" @click="onTapAddExaminationItem">增加检验项目</el-button>
        <el-table
          :data="examinationItemList">
          <el-table-column
          label="项目编码"
          prop="eIId"
          ></el-table-column>
          <el-table-column
            label="项目名称"
            prop="eIName"
            width="300"
          ></el-table-column>
          <el-table-column
            label="项目规格"
            prop="eISpecification"
            width="85"
          ></el-table-column>
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="danger" size="small" @click="onTapDelete(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-dialog title="添加项目" :visible.sync="dialogFormVisible" width="400px">
        <el-form>
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
        name: "medicalTemplateManagement",
      data(){
          return{
            createTime:'',
            templateList:[],
            itemList:[],
            dialogFormVisible:false,
            examinationItemList:[],
            searchExaminationItemList:[],
            departmentList:'',
            searchScope:'',
            searchDId:'',
            searchRecordType:'',
            displayTime:'',
            searchEIName:'',
            searchEINameList:'',
            searchTemplateName:'',
            templateName:'',
            recordType:'',
            scope:'',
            dId:'',
            showDetail:false,
            isAdd:false,
            eTId:0
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
            recordType:that.searchRecordType,
            eTScope:that.searchScope,
            eTName:that.searchTemplateName,
            uId:uId
          }
          if(that.searchScope === '科室'){
            data.dId = that.searchDId
          }
          this.$axios({
            url:'examnationItem/getExaminationTemplateByCondition',
            method:'post',
            data:data
          }).then(response=>{
            that.templateList = response.data
            for(let i = 0; i < that.templateList.length; i++){
              let eTDate = new Date(that.templateList[i].eTDate * 1000)
              that.templateList[i].displayTime = eTDate.toLocaleDateString().replace(/\//g, "-") + " " + eTDate.toTimeString().substr(0, 8)
            }
          })
        },
        onTapAddExaminationItem:function(){
          this.searchEIName=''
          this.dialogFormVisible=true
        },
        /**
         * 寻找匹配项
         */
        querySearch(queryString, cb) {
          let that = this
          let recordType = ''
          if(that.recordType==='处置'){
            recordType = '治疗费'
          }else{
            recordType = that.recordType + '费'
          }
          this.searchExaminationItemList = []
          this.$axios({
            url:'examnationItem/getExamnationItemByEIName',
            method: 'post',
            data:{
              eIName:that.searchEIName,
              recordType:recordType
            }
          }).then(response=>{
            console.log(response.data)
            for(let i = 0; i < response.data.length; i++){
              this.searchExaminationItemList.push({value:response.data[i].eIName})
            }
            // that.examinationItem = response.data
            let searchExaminationItemList = this.searchExaminationItemList
            cb(searchExaminationItemList);
          })
        },
        handleSelect(item){
          this.searchEIName = item.value
        },
        /**
         * 查看模版细节
         * */
        viewTemplate:function(index){
          console.log(index)
          let that = this
          this.eTId = index
          this.$axios({
            url:'examnationItem/checkDetail',
            method:'post',
            data:{
              eTId:index
            }
          }).then(response=>{
            console.log(response.data)
            that.templateName = response.data.eTName
            that.scope = response.data.eTScope
            let eTDate = new Date()
            that.createTime = response.data.eTDate * 1000
            that.displayTime = eTDate.toLocaleDateString().replace(/\//g, "-") + " " + eTDate.toTimeString().substr(0, 8)
            that.examinationItemList = response.data.examnationItemList
            that.recordType = response.data.recordType
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
            url: 'examnationItem/getExamnationItems',
            method: 'post',
            data: {
              eIName:that.searchEIName
            }
          }).then(response=>{
            console.log(response.data)
            that.examinationItemList.push(response.data[0])
          })
          },
        /**
         * 删除
         */
        onTapDelete:function (index) {
          this.examinationItemList.splice(index,1)
        },
        /**
         *提交模版
         */
        onTapSubmit:function() {
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
          console.log(data)
          this.$axios({
            url: 'examnationItem/insertExaminationTemplate',
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
            url:'examnationItem/deleteExamnationTemplateByPrimaryKey',
            method:'post',
            data:{
              eTId : that.eTId,
              uId: uId,
              dId: that.dId,
              scope:that.scope
            }
          }).then(response=>{
            that.showDetail = false
            for(let i = 0; i < that.examinationItemList.length; i++){
              if(that.examinationItemList[i].rId === that.rId){
                that.examinationItemList.splice(i,1)
                break
              }
            }
          })
        },
        reSet:function () {
          this.displayTime = ''
          this.searchEIName = ''
          this.searchEINameList = ''
          this.searchTemplateName =''
          this.templateName = ''
          this.recordType = ''
          this.scope = ''
          this.dId = ''
          this.examinationItemList = []
        }
      }
    }
</script>

<style scoped>

</style>
