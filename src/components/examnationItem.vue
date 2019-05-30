<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-container>
      <el-header style="text-align: left; font-size: 12px">
        <template>
          项目编码：
          <div style="width: 125px;display: inline-block">
            <el-input
              v-model="searcheIId"
              size="mini"
              placeholder="输入项目编码"
            />
          </div>
          &nbsp&nbsp&nbsp&nbsp项目名称：
          <div style="width: 125px;display: inline-block">
            <el-input
              v-model="searcheIName"
              size="mini"
              placeholder="输入项目名称"
            />
          </div>
          &nbsp&nbsp&nbsp&nbsp规格：
          <div style="width: 125px;display: inline-block">
            <el-input
              v-model="searcheISpecification"
              size="mini"
              placeholder="输入规格"
            />
          </div>
          &nbsp&nbsp&nbsp&nbsp单价：
          <div style="width: 125px;display: inline-block">
            <el-input
              v-model="searcheIFee"
              size="mini"
              placeholder="输入单价"
            /></div>
          &nbsp&nbsp&nbsp&nbsp费用分类：
          <div style="width: 125px;display: inline-block">
            <el-input
              v-model="searcheIFeeTee"
              size="mini"
              placeholder="输入费用分类"
            /></div>
        </template>
        &nbsp&nbsp&nbsp&nbsp
        <el-button width="100" @click="onTapSearch">查询</el-button>
        <el-button width="100"  @click="dialogFormVisible = true">增加</el-button>

      </el-header>

      <el-main>
        <el-dialog title="添加非药品项目" :visible.sync="dialogFormVisible" width="350px" >
          <el-form>
            <el-form-item label="项目编码" :label-width="formLabelWidth">
              <el-input v-model="eIId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目名称" :label-width="formLabelWidth">
              <el-input v-model="eIName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目规格" :label-width="formLabelWidth">
              <el-input v-model="eISpecification" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目单价" :label-width="formLabelWidth">
              <el-input v-model="eIFee" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="收费分类" :label-width="formLabelWidth">
              <el-input v-model="eIFeeType" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="onTapAdd" >确 定</el-button>
          </div>
        </el-dialog>
        <el-table
          :data="examnationItemList"
          stripe
          style="width: 100%">
          <!--<el-table-column-->
          <!--align="right">-->
          <!--<template slot="header" slot-scope="scope">-->
          <!--<el-button width="100" @click="onTapSearch">查询</el-button>-->
          <!--</template>-->
          <!--</el-table-column>-->

          <el-table-column
            label="项目编码"
            width="125">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{scope.row.eIId}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="项目名称"
            width="300">
            <template slot-scope="scope">
              <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input  v-model="eIName"></el-input></span>
              <span  style="margin-left: 10px">{{scope.row.eIName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="项目规格"
            width="150">
            <template slot-scope="scope">
              <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input  v-model="eISpecification"></el-input></span>
              <span style="margin-left: 10px">{{scope.row.eISpecification}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="项目单价"
            width="100">
            <template slot-scope="scope">
              <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input  v-model="eIFee"></el-input></span>
              <span  style="margin-left: 10px">{{scope.row.eIFee}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="费用分类"
            width="150">
            <template slot-scope="scope">
              <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input  v-model="eIFeeType"></el-input></span>
              <span  style="margin-left: 10px">{{scope.row.eIFeeType}}</span>
            </template>
          </el-table-column>


          <el-table-column
            align="right">
            <!--<template slot="header" slot-scope="scope">-->
            <!--<el-button width="100" @click="onTapSearch">查询</el-button>-->
            <!--</template>-->
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
    export default {
        name: "examnationItem",
      data(){
        let examnationItemList=[];
        let searcheIName = '';
        let searcheISpecification = '';
        let searcheIFee = ''
        let searcheIFeeType = '';
        let eIId = '';
        let eIName = '';
        let eISpecification = '';
        let eIFee = '';
        let eIFeeType = '';

        return {
          examnationItemList: examnationItemList,
          searcheIId: searcheIId,
          searcheIName: searcheIName,
          searcheISpecification: searcheISpecification,
          searcheIFee: searcheIFee,
          searcheIFeeType: searcheIFeeType,
          eIId: eIId,
          eIName: eIName,
          eISpecification: eISpecification,
          eIFee: eIFee,
          eIFeeType: eIFeeType,
          dialogFormVisible: false,
          /**当前页面数*/
          currentPage: 1,
          /**页面总数*/
          pageCount: 1,
          /**页面大小*/
          pageSize: 10
        }


      },
      created:function(){
          this.getExamnationItemByPage(1)
          this.getPageCount()
      },

      methods:{
        getExamnationItemByPage:function (pageNum) {
          let that = this;
          pageNum = pageNum - 1;
          pageNum = pageNum * that.pageSize;
          this.$axios({
              url:'examnationItem/getExamnationItemByPage',
              method:'post',
            data:{
                pageNum:pageNum,
                pageSize:that.pageSize
            }

          }).then(response=>{
            console.log(response.data);
            that.examnationItemList = response.data;
          }).catch(err=>{
            console.log(err)
          })


        },
        /**
         * 得到页数
         * */
        getPageCount:function(){
          let that = this;
          this.$axios({
            url:"examnationItem/getPageCount",
            method:"post"
          }).then(response=>{
            console.log(response.data);
            that.pageCount = response.data
          }).catch(err=>{
            console.log(err)
          })
        },
        reSet:function () {
          this.eIId = "";
          this.eIName = "";
          this.eISpecification = "";
          this.eIFee = "";
          this.eIFeeType='';
        },
        /**
         * 分页
         */
        handleSizeChange:function () {

        },
        /**
         * 分页
         */
        handleCurrentChange:function () {
          this.getDepartmentsByPage(this.currentPage)
        },

        handleAdd(index, row){
          let that = this;
          let eIId= this.examnationItemList[index].eIId;
          let department={
            eIId:eIId,
            eIName: this.eIName,
            eISpecification:this.eISpecification,
            eIFee:this.eIFee,
            eIFeeType :this.eIFeeType
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
          let that=this;
          let dId = this.departmentList[index].dId;
          let dName = this.departmentList[index].dName;
          let dType = this.departmentList[index].dType;
          let dCategory = this.departmentList[index].dCategory;
          this.editIndex = index;

          let data={
            dType: that.dType,
            dCategory: that.dCategory,
          }

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

      }
    }
</script>

<style scoped>

</style>
