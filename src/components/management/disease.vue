
<template>

  <el-container style="height: 100%; border: 1px solid #eee">

    <el-aside width="150px" style="background-color: rgb(238, 241, 246)" >
      <el-menu :default-openeds="['1', '3']" >
        <label v-for="(item,index) in type" :key="index">
          <el-menu-item >
            <span width="100" slot="title" @click="getDiseasesByPage(1,item);">{{item}}</span>
          </el-menu-item>
        </label>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">

          <template>
            国际ICD编码：
            <div style="width: 110px;display: inline-block">
              <el-input
                v-model="searchdisIcd"
                size="mini"
                placeholder="国际ICD编码"
              />
            </div>
            &nbsp&nbsp&nbsp&nbsp疾病名称：
            <div style="width: 110px;display: inline-block">
              <el-input
                v-model="searchdisName"
                size="mini"
                placeholder="疾病名称"
              />
            </div>
            &nbsp&nbsp&nbsp&nbsp疾病编码：
            <div style="width: 110px;display: inline-block">
              <el-input
                v-model="searchdisCode"
                size="mini"
                placeholder="疾病编码"
              />
            </div>
            &nbsp&nbsp&nbsp&nbsp疾病所属分类：
            <div style="width: 110px;display: inline-block">
              <el-input
                v-model="searchdisType"
                size="mini"
                placeholder="疾病所属分类"
              /></div>
          </template>
          &nbsp&nbsp&nbsp&nbsp
        <el-button width="100" @click="onTapSearch">查询</el-button>
        <el-button width="100"  @click="dialogFormVisible = true">增加</el-button>


      </el-header>

      <el-main>
        <el-dialog title="添加疾病" :visible.sync="dialogFormVisible" width="350px" >
          <el-form>
            <el-form-item label="国际ICD编码" :label-width="formLabelWidth">
              <el-input v-model="disIcd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="疾病名称" :label-width="formLabelWidth">
              <el-input v-model="disName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="疾病编码" :label-width="formLabelWidth" >
                <el-input v-model="disCode" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="疾病所属分类" :label-width="formLabelWidth" >
                <el-input v-model="disType" autocomplete="off"></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="onTapAdd" >确 定</el-button>
          </div>
        </el-dialog>
        <el-table
          :data="diseaseList"
          stripe
          style="width: 100%">


          <el-table-column
            label="顺序号"
            width="150">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{scope.row.disId}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="国际ICD编码"
            width="200">
            <template slot-scope="scope">
              <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input v-model="disIcd"></el-input></span>
              <span v-else style="margin-left: 10px">{{scope.row.disIcd}}</span>
            </template>
          </el-table-column>

          <el-table-column
          label="疾病名称"
          width="200">
          <template slot-scope="scope">
            <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input  v-model="disName"></el-input></span>
            <span v-else style="margin-left: 10px">{{scope.row.disName}}</span>
          </template>
        </el-table-column>
          <el-table-column
            label="疾病编码"
            width="200">
            <template slot-scope="scope">
              <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input  v-model="disCode"></el-input></span>
              <span v-else style="margin-left: 10px">{{scope.row.disCode}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="疾病所属分类"
            width="200">
            <template slot-scope="scope">
              <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input  v-model="disType"></el-input></span>
              <span  v-else style="margin-left: 10px">{{scope.row.disType}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="right">
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
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)" v-else>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <template>
        <div class="block">
          <span class="demonstration">调整每页显示条数</span>
          <el-pagination

            @size-change="handleSizeChange"
            @current-change="handleCurrentChange(pageType)"
            :current-page.sync="currentPage"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="pageSize"
            layout="sizes, prev, pager, next"
            :total="pageCount">
          </el-pagination>
        </div>
        </template>
      </el-main>
    </el-container>
  </el-container>


</template>


<script>
  export default {

    name:'disease',
    data() {
      let disId = 0;
      let disIcd = '';
      let disName='';
      let disCode='';
      let disType='';
      let navData=[];
      let diseaseList=[];
      let editIndex = -1;
      let type=[];
      let pageType='';



      return {
        disId : disId,
        disIcd:disIcd,
        disName:disName,
        disCode:disCode,
        disType:disType,
        diseaseList:diseaseList,
        editIndex:editIndex,
        formLabelWidth: '120px',
        dialogFormVisible:false,
        searchdisIcd:'',
        searchdisName:'',
        searchdisCode:'',
        searchdisType:'',
        type:type,
        pageType:pageType,


        /**当前页面数*/
        currentPage:1,
        /**页面总数*/
        pageCount:1,
        /**页面大小*/
        pageSize:10,


      };
    },  created: function () {
      this.getDiseaseType();

      this.getPageCount()
    },
    methods: {
      // showDiseaseType: function () {
      //   let that = this;
      //   this.axios({
      //     url: 'disease/getDiseaseByPage',
      //     method: 'post'
      //   }).then(response => {
      //     that.diseaseList = response.data
      //     console.log(response)
      //   }).catch(err => {
      //     console.log(err)
      //   })
      // },
      handleAdd(index, row){
        let that = this
        let disId= this.diseaseList[index].disId;
        let disease={
          disId:disId,
          disIcd:this.disIcd,
          disName:this.disName,
          disCode:this.disCode,
          disType:this.disType,
          editIndex :-1
        };
        this.diseaseList[index] = disease;
        this.$axios({
          url:'disease/updateDisease',
          method:'post',
          data:{
            disId:disId,
            disIcd:this.disIcd,
            disName:this.disName,
            disCode:this.disCode,
            disType:this.disType,
          }
        }).then(response => {
          that.reSet()
          console.log((response.data));
          console.log(disease)

        }).catch(err=>{
          console.log(err)
        });


        this.editIndex = -1
      },
      onTapAdd:function(){
        this.dialogFormVisible = false
        let that= this;
        console.log()
        this.$axios({
          url:"disease/insertDisease",
          method:"post",
          data:{
            disId: that.disId,
            disIcd:that.disIcd,
            disName:that.disName,
            disCode:that.disCode,
            disType:that.disType,

          }
        }).then(response=>{
          let diseaseList={
            disId: that.disId,
            disIcd:that.disIcd,
            disName:that.disName,
            disCode:that.disCode,
            disType:that.disType,

          };
          console.log(response.data);
          that.getDiseasesByPage(that.currentPage,this.getDiseaseType());
          that.getPageCount()
          that.reSet()
        }).catch(err=>{
          console.log(err)
        })
      },
      getDiseaseType:function(){
        let that = this;
        this.$axios({
          url:'disease/getDiseaseType',
          method:'post',

        }).then(response=>{
          console.log(response.data);
          that.type = response.data
        }).catch(err=>{
          console.log(err)
        })
        return that.type

      },

      getDiseasesByPage: function (pageNum,type) {
        let that = this;
        pageNum = pageNum - 1
        pageNum = pageNum * that.pageSize;
        console.log('123',type)
        this.$axios({
          url: 'disease/getDiseaseByPage',
          method: "post",
          data: {
            pageNum: pageNum,
            pageSize: that.pageSize,
            disType:type

          }
        }).then(response => {
          console.log(response.data);
          console.log(type);
          that.diseaseList = response.data
          that.pageType = type
        }).catch(err => {
          console.log(err)
        })

      },
      handleSizeChange: function () {

      },
      handleCurrentChange: function (type) {

        this.getDiseasesByPage(this.currentPage,type)
      },

      onTapSearch: function () {
        let that = this;
        this.$axios({
          url: "disease/getDiseases",
          method: "post",
          data: {
            disIcd: that.searchdisIcd,
            disName: that.searchdisName,
            disCode: that.searchdisCode,
            disType: that.searchdisType,
          }

        }).then(response => {
          that.diseaseList = response.data;
        }).catch(err => {
          console.log(err)
        })
      },
      onTapGiveUp: function () {
        this.editIndex = -1
      },
      handleEdit(index, row) {
        let that = this;
        let disId = this.diseaseList[index].disId;
        let disIcd = this.diseaseList[index].disIcd;
        let disName = this.diseaseList[index].disName;
        let disCode = this.diseaseList[index].disCode;
        let disType = this.diseaseList[index].disType;

        this.editIndex = index;

        let data = {
          disIcd: that.disIcd,
          disName: that.disName,
          disCode: that.disCode,
          disType: that.disType,

        }

      },
      handleDelete(index, row) {
        let disId = this.diseaseList[index].disId;
        let that = this
        this.diseaseList.splice(index, 1)
        this.$axios({
          url: 'disease/deleteDisease',
          method: 'post',
          data: {disId: disId},

        }).then(function (response) {
          that.getPageCount()
          console.log(response.data);

        }).catch(function (error) {
          console.log(error)
        })
        console.log(index, row);
      },
      getPageCount:function(){
        let that = this
        this.$axios({
          url:"disease/getPageCount",
          method:"post"
        }).then(response=>{
          console.log(response.data)
          that.pageCount = response.data
        }).catch(err=>{
          console.log(err)
        })
      },
      reSet:function () {
        this.disId = ""
        this.disIcd=""
        this.disName = ""
        this.disCode = ""
        this.disType = ""

      },
    }
  }
</script>


<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
   .el-header {
     background-color: #B3C0D1;
     color: #333;
     line-height: 60px;
   }

  .el-aside {
    color: #333;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

</style>



