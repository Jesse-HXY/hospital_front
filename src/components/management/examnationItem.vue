<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-container>
      <el-header style="text-align: left; font-size: 12px">
        <template>
          项目编码：
          <div style="width: 125px;display: inline-block">
            <el-input
              v-model="searcheICode"
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
              v-model="searcheIFeeType"
              size="mini"
              placeholder="输入费用分类"
            /></div>
          &nbsp&nbsp&nbsp&nbsp执行科室：
          <div style="width: 125px;display: inline-block">
            <el-input
              v-model="searchdId"
              size="mini"
              placeholder="输入执行科室Id"
            /></div>
        </template>
        &nbsp&nbsp&nbsp&nbsp
        <el-button width="100" @click="onTapSearch">查询</el-button>
        <el-button width="100"  @click="dialogFormVisible = true">增加</el-button>

      </el-header>

      <el-main>
        <el-dialog title="添加非药品项目" :visible.sync="dialogFormVisible" width="350px" >
          <el-form>

            <el-form-item label="执行科室" :label-width="formLabelWidth">
              <el-input v-model="dId" autocomplete="off"></el-input>
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
            <el-form-item label="项目编码" :label-width="formLabelWidth">
              <el-input v-model="eICode" autocomplete="off"></el-input>
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
            label="序号"
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
              <span  v-else style="margin-left: 10px">{{scope.row.eIName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="项目规格"
            width="150">
            <template slot-scope="scope">
              <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input  v-model="eISpecification"></el-input></span>
              <span v-else style="margin-left: 10px">{{scope.row.eISpecification}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="项目单价"
            width="100">
            <template slot-scope="scope">
              <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input  v-model="eIFee"></el-input></span>
              <span  v-else style="margin-left: 10px">{{scope.row.eIFee}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="费用分类"
            width="150">
            <template slot-scope="scope">
              <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input  v-model="eIFeeType"></el-input></span>
              <span  v-else style="margin-left: 10px">{{scope.row.eIFeeType}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="执行科室"
            width="150">
            <template slot-scope="scope">
              <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input  v-model="dId"></el-input></span>
              <span  v-else style="margin-left: 10px">{{scope.row.dId}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="项目编码"
            width="125">
            <template slot-scope="scope">
              <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input  v-model="eICode"></el-input></span>
              <span v-else style="margin-left: 10px">{{scope.row.eICode}}</span>
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
        let eIId = '';
        let eIName = '';
        let eISpecification = '';
        let eIFee = '';
        let eIFeeType = '';
        let dId = '';
        let eICode='';
        let editIndex=-1;


        return {
          editIndex:editIndex,
          examnationItemList: examnationItemList,
          searcheICode:'',
          searcheIName: '',
          searcheISpecification: '',
          searcheIFee: '',
          searcheIFeeType:'',
          searchdId:'',
          dId:dId,
          eIId: eIId,
          eIName: eIName,
          eISpecification: eISpecification,
          eIFee: eIFee,
          eIFeeType: eIFeeType,
          eICode: eICode,
          dialogFormVisible: false,
          formLabelWidth: '120px',
          /**当前页面数*/
          currentPage: 1,
          /**页面总数*/
          pageCount: 1,
          /**页面大小*/
          pageSize: 10
        }


      },
      created:function(){
          this.getExamnationItemByPage(1);
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
          this.dId='';
          this.eIName = "";
          this.eISpecification = "";
          this.eIFee = "";
          this.eIFeeType='';
          this.eICode='';

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
          this.getExamnationItemByPage(this.currentPage)
        },

        handleAdd(index, row){
          let that = this;
          let eIId= this.examnationItemList[index].eIId;
          let examination={
            eIId:eIId,
            dId : this.dId,
            eIName: this.eIName,
            eISpecification:this.eISpecification,
            eIFee:this.eIFee,
            eIFeeType :this.eIFeeType,
            eICode:this.eICode,
          };
          this.examnationItemList[index] = examination;
          this.$axios({
            url:'examnationItem/updateExamnationItem',
            method:'post',
            data:{
              eIId:eIId,
              dId : this.dId,
              eIName:this.eIName,
              eISpecification:this.eISpecification,
              eIFee:this.eIFee,
              eIFeeType:this.eIFeeType,
              eICode:this.eICode,
            }
          }).then(response => {
            that.reSet()
            console.log((response.data));
            console.log(examination)

          }).catch(err=>{
            console.log(err)
          });


          this.editIndex = -1
        },
        handleEdit(index, row){
          let that=this;
          let eIId = this.examnationItemList[index].eIId;
          let dId  = this.examnationItemList[index].dId;
          let eIName = this.examnationItemList[index].eIName;
          let eISpecification = this.examnationItemList[index].eISpecification;
          let eIFee = this.examnationItemList[index].eIFee;
          let eIFeeType = this.examnationItemList[index].eIFeeType;
          let eICode = this.examnationItemList[index].eICode;
          this.editIndex = index;

          let data={
            dId : that.dId,
            eIName:that.eIName,
            eISpecification:that.eISpecification,
            eIFee:that.eIFee,
            eIFeeType:that.eIFeeType,
            eICode:that.eICode,

          }

        },
        handleDelete(index,row) {
          let eIId = this.examnationItemList[index].eIId;
          let that = this
          this.examnationItemList.splice(index,1)
          this.$axios({
            url:'examnationItem/deleteExamnationItem',
            method:'post',
            data: {eIId:eIId},

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
            url: "examnationItem/getExamnationItems",
            method:"post",
            data:{
              eICode:that.searcheICode,
              eIName:that.searcheIName,
              eISpecification:that.searcheISpecification,
              eIFee:that.searcheIFee,
              eIFeeType:that.searcheIFeeType,
              dId:that.searchdId,


            }

          }).then(response => {
            that.examnationItemList = response.data;
          }).catch(err=>{
            console.log(err)
          })
        },
        onTapAdd:function(){
          this.dialogFormVisible = false
          let that= this;

          console.log()
          this.$axios({
            url:"examnationItem/insertExamnationItem",
            method:"post",
            data:{
              dId:that.dId,
              eIName: that.eIName,
              eISpecification:that.eISpecification,
              eIFee:that.eIFee,
              eIFeeType:that.eIFeeType,
              eICode:that.eICode,
            }
          }).then(response=>{
            console.log(response.data)
            that.getExamnationItemByPage(that.currentPage)
            that.getPageCount()
            that.reSet()
          }).catch(err=>{
            console.log(err)
          })
        },
        onTapGiveUp:function () {
          this.editIndex = -1
        },


      }
    }
</script>

<style scoped>

</style>
