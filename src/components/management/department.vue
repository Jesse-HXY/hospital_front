<template>

  <el-container style="height: 100%; border: 1px solid #eee">


    <el-container>
      <el-header style="text-align: left; font-size: 12px">
        <template>
          科室编号：
          <div style="width: 150px;display: inline-block">
            <el-input
              v-model="searchdId"
              size="mini"
              placeholder="输入科室编号"
            />
          </div>
          &nbsp&nbsp&nbsp&nbsp科室名称：
          <div style="width: 150px;display: inline-block">
            <el-input
              v-model="searchdName"
              size="mini"
              placeholder="输入科室名称"
            />
          </div>
          &nbsp&nbsp&nbsp&nbsp科室分类：
          <div style="width: 150px;display: inline-block">
            <el-input
              v-model="searchdType"
              size="mini"
              placeholder="输入科室分类"
            />
          </div>
          &nbsp&nbsp&nbsp&nbsp科室类型：
          <div style="width: 150px;display: inline-block">
            <el-input
              v-model="searchdCategory"
              size="mini"
              placeholder="输入科室类别"
            /></div>
        </template>
        &nbsp&nbsp&nbsp&nbsp
        <el-button width="100" @click="onTapSearch">查询</el-button>
        <el-button width="100"  @click="dialogFormVisible = true">增加</el-button>
        <el-button width="100" v-if="canImport" @click="onTapImport">导入</el-button>
        <el-button width="100" v-else disabled>导入</el-button>

      </el-header>

      <el-main>
        <el-dialog title="添加科室" :visible.sync="dialogFormVisible" width="350px" >
          <el-form>
            <el-form-item label="科室名称" :label-width="formLabelWidth">
              <el-input v-model="dName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="科室分类" :label-width="formLabelWidth">
              <el-input v-model="dType" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="科室类型" :label-width="formLabelWidth" >
              <el-select v-model="dCategory"   placeholder="请选择活动区域">
                <el-option label="医技" value="医技"></el-option>
                <el-option label="临床" value="临床"></el-option>
              </el-select>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="onTapAdd" >确 定</el-button>
          </div>
        </el-dialog>
        <el-table
          :data="departmentList"
          stripe
          style="width: 100%">
          <!--<el-table-column-->
          <!--align="right">-->
          <!--<template slot="header" slot-scope="scope">-->
          <!--<el-button width="100" @click="onTapSearch">查询</el-button>-->
          <!--</template>-->
          <!--</el-table-column>-->

          <el-table-column
            label="科室编号"
            width="150">
            <template slot-scope="scope">
              <!--<span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input v-model="dId"></el-input></span>-->
              <span style="margin-left: 10px">{{scope.row.dId}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="科室名称"
            width="300">
            <template slot-scope="scope">
              <!--<span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input v-model="dName"></el-input></span>-->
              <span  style="margin-left: 10px">{{scope.row.dName}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="科室分类"
          width="200">
            <template slot-scope="scope">
              <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input  v-model="dType"></el-input></span>
              <span v-else style="margin-left: 10px">{{scope.row.dType}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="科室类型"
            width="200">
            <template slot-scope="scope">
                <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-select v-model="dCategory"  placeholder="请选择活动区域">
              <el-option label="医技" value="医技"></el-option>
              <el-option label="临床" value="临床"></el-option>
            </el-select></span>
              <span  v-else style="margin-left: 10px">{{scope.row.dCategory}}</span>
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
        <div class="block">
          <span class="demonstration">调整每页显示条数</span>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="pageSize"
            layout="sizes, prev, pager, next"
            :total="pageCount">
          </el-pagination>
        </div>
      </el-main>
    </el-container>
  </el-container>


</template>

<script>
  import{getPinYinFirstCharacter} from '../../js/pinyin'
  export default {

    name: 'department',
    data () {
      let dId = '';
      let dName='';
      let dCategory='';
      let dType = '';
      let departmentList=[];
      let editIndex = -1;


      return {
        departmentList:departmentList,
        dId:dId,
        dName:dName,
        dCategory:dCategory,
        dType:dType,
        editIndex:editIndex,
        searchdId : '',
        searchdName :'',

        searchdType : "",
        searchdCategory :'',
        formLabelWidth: '120px',
        dialogFormVisible:false,
        /**当前页面数*/
        currentPage:1,
        /**页面总数*/
        pageCount:1,
        /**页面大小*/
        pageSize:10,
        canImport:true
      }

    },
    created:function(){
      this.getDepartmentsByPage(1)
      this.getPageCount()
    },
    methods:{
      handleAdd(index, row){
        let that = this
        let dId= this.departmentList[index].dId;
        let dName  = this.departmentList[index].dName;
        let department={
          dId:dId,
          dName:dName,
          dCategory:this.dCategory,
          dType:this.dType,
          editIndex :-1
        };
        this.departmentList[index] = department;
        this.$axios({
          url:'department/updateDepartment',
          method:'post',
          data:{
            dId:dId,
            dName:dName,
            dCategory:this.dCategory,
            dType:this.dType,
          }
        }).then(response => {
          that.reSet()
          console.log((response.data));
          console.log(department)

        }).catch(err=>{
          console.log(err)
        });


        this.editIndex = -1
      },
      handleEdit(index, row){
        let dId = this.departmentList[index].dId;
        let dName = this.departmentList[index].dName;
        this.dType = this.departmentList[index].dType;
        this.dCategory = this.departmentList[index].dCategory;
        this.editIndex = index;

      },
      handleDelete(index,row) {
        let dId = this.departmentList[index].dId;
        let that = this
        this.departmentList.splice(index,1)
        this.$axios({
          url:'department/deleteDepartment',
          method:'post',
          data: {dId:dId},

        }).then(function (response) {
          that.getPageCount()
          console.log(response.data);

        }).catch(function (error) {
          console.log(error)
        })
        console.log(index,row);
      },

      /**
       * 搜索
       */
      onTapSearch:function(){
        let that = this;
        this.$axios({
          url: "department/getDepartments",
          method:"post",
          data:{
            dId:that.searchdId,
            dName:that.searchdName,
            dType:that.searchdType,
            dCategory:that.searchdCategory,
          }

        }).then(response => {
          that.departmentList = response.data;
        }).catch(err=>{
          console.log(err)
        })
      },

      /**
       * 得到页数
       * */
      getPageCount:function(){
        let that = this
        this.$axios({
          url:"department/getDepartmentCount",
          method:"post"
        }).then(response=>{
          console.log(response.data)
          that.pageCount = response.data
        }).catch(err=>{
          console.log(err)
        })
      },
      /**
       * 分页得到departments
       * */
      getDepartmentsByPage:function (pageNum) {
        let that = this;
        pageNum = pageNum - 1
        pageNum = pageNum * that.pageSize
        this.$axios({
          url: 'department/getDepartmentByPage',
          method:"post",
          data:{
            pageNum:pageNum,
            pageSize:that.pageSize
          }
        }).then(response => {
          that.departmentList = response.data
        }).catch(err=>{
          console.log(err)
        })
      },

      onTapGiveUp:function () {
        this.editIndex = -1
      },
      onTapAdd:function(){
        this.dialogFormVisible = false
        let that= this;
        this.dId = this.getDId();
        console.log()
        this.$axios({
          url:"department/insertDepartment",
          method:"post",
          data:{
            dId: that.dId,
            dName:that.dName,
            dType:that.dType,
            dCategory:that.dCategory,
          }
        }).then(response=>{
          console.log(response.data)
          that.getDepartmentsByPage(that.currentPage)
          that.getPageCount()
          that.reSet()
        }).catch(err=>{
          console.log(err)
        })
      },
      getDId:function () {
        return getPinYinFirstCharacter(this.dName, "", true);
      },
      reSet:function () {
        this.dId = ""
        this.dName = ""
        this.dType = ""
        this.dCategory = ""
      },
      /**
       * 分页
       */
      handleSizeChange:function () {
        this.getDepartmentsByPage(this.currentPage)
      },
      /**
       * 分页
       */
      handleCurrentChange:function () {
        this.getDepartmentsByPage(this.currentPage)
      },
      onTapImport:function () {
        this.$axios({
          url:'department/importDepartment',
          method:'post'
        }).then(response=>{
          this.getDepartmentsByPage(1)
          this.getPageCount()
          this.canImport = false
        })
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
