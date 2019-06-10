<template>
       
  <el-container>
    <el-header>
      <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content ">
          <el-input placeholder="请输入药品助记码" v-model="searchmCode"></el-input>
        </div></el-col>
      <el-col :span="6"><div class="grid-content "><el-button type="primary" icon="el-icon-view" @click="onTapSearch">查询药品</el-button></div></el-col>
      <el-col :span="6"><div class="grid-content "><el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible = true">新增药品</el-button></div></el-col>
      <el-col :span="6"><div class="grid-content "><el-button type="primary" icon="el-icon-sell" @click="onTapInput">导入药品</el-button></div></el-col>
    </el-row>
    </el-header>
    <el-main>
      <el-table :data="medicineList">
        <el-table-column
          width="25px"><el-checkbox></el-checkbox></el-table-column>
        <el-table-column
        label="药品编码"
        prop="mCode"></el-table-column>
        <el-table-column
          label="药品名称"
          prop="mName"></el-table-column>
        <el-table-column
          label="药品规格"
          prop="mSpecification">
          <template slot-scope="scope">
            <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input  v-model="mSpecification"></el-input></span>
            <span v-else style="margin-left: 10px">{{scope.row.mSpecification}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="药品单位"
         >
          <template slot-scope="scope">
            <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input  v-model="mUnit"></el-input></span>
            <span v-else style="margin-left: 10px">{{scope.row.mUnit}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="药品单价"
         >
          <template slot-scope="scope">
            <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input  v-model="mFee"></el-input></span>
            <span v-else style="margin-left: 10px">{{scope.row.mFee}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="药品剂型"
      >
          <template slot-scope="scope">
            <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input  v-model="mFormulation"></el-input></span>
            <span v-else style="margin-left: 10px">{{scope.row.mFormulation}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="药品类型"
        >
          <template slot-scope="scope">
            <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input  v-model="mType"></el-input></span>
            <span v-else style="margin-left: 10px">{{scope.row.mType}}</span>
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
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)" v-else>删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-dialog title="添加药剂" :visible.sync="dialogFormVisible" width="350px" >
        <el-form>
          <el-form-item label="药品编码" :label-width="formLabelWidth">
            <el-input v-model="mCode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="药品名称" :label-width="formLabelWidth">
            <el-input v-model="mName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="药品拼音" :label-width="formLabelWidth">
            <el-input v-model="mSpell" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="药品规格" :label-width="formLabelWidth">
            <el-input v-model="mSpecification" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="单位" :label-width="formLabelWidth">
            <el-input v-model="mUnit" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="单价" :label-width="formLabelWidth">
            <el-input v-model="mFee" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="生产者" :label-width="formLabelWidth">
            <el-input v-model="mProducer" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="药品剂型" :label-width="formLabelWidth">

            <el-select v-model="mFormulation" autocomplete="off">
              <el-option label="针剂" value="针剂"></el-option>
              <el-option label="片剂" value="片剂"></el-option>
              <el-option label="中药饮片" value="中药饮片"></el-option>
              <el-option label="胶囊" value="胶囊"></el-option>
              <el-option label="颗粒剂" value="颗粒剂"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="药品类型" :label-width="formLabelWidth" >
            <el-select v-model="mType"   placeholder="请选择活动区域">
              <el-option label="中药" value="中药"></el-option>
              <el-option label="西药" value="西药"></el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onTapAdd" >确 定</el-button>
        </div>
      </el-dialog>
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
</template>
<style></style>
<script>
    export default {

        data() {
          let mCode='';
          let mName='';
          let mSpecification='';
          let mUnit='';
          let mFee=0;
          let mFormulation=''; // 药品剂型
          let mType=''; //药品类型
          let mSpell='';
          let mProducer='';

          let editIndex = -1

            return {
               dialogFormVisible:false,
               mCode:mCode,
               mName:mName,
               mSpell:mSpell,
               mProducer:mProducer,
               mSpecification:mSpecification,
               mUnit:mUnit,
               mFee:mFee,
               mFormulation:mFormulation,// 药品剂型
               mType:mType, //药品类型
               medicineList:[],
               editIndex:editIndex,
              formLabelWidth: '120px',
              searchmCode:'',
              /**当前页面数*/
              currentPage:1,
              /**页面总数*/
              pageCount:1,
              /**页面大小*/
              pageSize:10
            }
        },created:function(){
          this.showMedicine(1)
          this.getPageCount()
      },

      methods:{

          showMedicine:function (pageNum) {
            let that = this
            pageNum = pageNum - 1
            pageNum = pageNum * that.pageSize
                this.$axios({
                  url:'medicine/getMedicineByPage',
                  method:'post',
                  data:{
                    pageNum:pageNum,
                    pageSize:that.pageSize
                  }
                }).then(response=>{
                  console.log(response.data)
                  that.medicineList = response.data
                }).catch(err=>{
                  console.log(err)
                })
          },
        onTapAdd:function(){
          this.dialogFormVisible = false
          let that= this;
          console.log()
          this.$axios({
            url:"medicine/insertMedicine",
            method:"post",
            data:{
              mCode:that.mCode,
              mName:that.mName,
              mSpell:that.mSpell,
              mSpecification:that.mSpecification,
              mUnit:that.mUnit,
              mProducer:that.mProducer,
              mFormulation:that.mFormulation,
              mType:that.mType,
              mFee:that.mFee,

            }
          }).then(response=>{
            console.log(response.data)
            that.showMedicine(that.currentPage)
            that.getPageCount()
            that.reSet()
          }).catch(err=>{
            console.log(err)
          })
        },
        handleAdd(index, row){
          let that = this
          let mId= this.medicineList[index].mId;
          let mName  = this.medicineList[index].mName;
          let mCode = this.medicineList[index].mCode;
          let medicine={
            mId:mId,
            mName:mName,
            mCode:mCode,
            mSpecification:this.mSpecification,
            mUnit:this.mUnit,
            mFee:this.mFee,
            mFormulation:this.mFormulation,
            mType:this.mType,
            editIndex :-1
          };
          this.medicineList[index] = medicine;
          this.$axios({
            url:'medicine/updateMedicine',
            method:'post',
            data:{
              mId:mId,
              mName:mName,
              mCode:mCode,
              mSpecification:this.mSpecification,
              mUnit:this.mUnit,
              mFee:this.mFee,
              mFormulation:this.mFormulation,
              mType:this.mType,
            }
          }).then(response => {
            that.reSet()
            console.log((response.data));
            console.log(medicine)

          }).catch(err=>{
            console.log(err)
          });
          this.editIndex = -1
        },
        reSet:function () {
            this.mId='';
            this.mName='';
            this.mSpecification='';
            this.mUnit='';
            this.mFee=0;
            this.mFormulation='';
            this.mType='';
        },
        /**
         * 得到页数
         * */
        getPageCount:function(){
          let that = this
          this.$axios({
            url:"medicine/getMedicineCount",
            method:"post"
          }).then(response=>{
            console.log(response.data)
            that.pageCount = response.data
          }).catch(err=>{
            console.log(err)
          })
        },
        handleEdit(index, row){
          let that=this;
          let mId= this.medicineList[index].mId;
          let mName  = this.medicineList[index].mName;
          let mCode = this.medicineList[index].mCode;
          let mSpecification = this.medicineList[index].mSpecification;
          let mUnit = this.medicineList[index].mUnit;
          let mFee = this.medicineList[index].mFee;
          let mFormulation = this.medicineList[index].mFormulation;
          let mType = this.medicineList[index].mType;
          this.editIndex = index;

          let data={
            mSpecification: that.mSpecification,
            mUnit:that.mUnit,
            mFee:that.mFee,
            mFormulation:that.mFormulation,
            mType:that.mType,

          }

        },
        onTapSearch:function(){
          let that = this;
          this.$axios({
            url: "medicine/getMedicine",
            method:"post",
            data:{
              mCode:that.searchmCode
            }

          }).then(response => {
            that.medicineList = response.data;
          }).catch(err=>{
            console.log(err)
          })
        },
        handleDelete(index,row) {
          let mId = this.medicineList[index].mId;
          let that = this
          this.medicineList.splice(index,1)
          this.$axios({
            url:'medicine/deleteMedicine',
            method:'post',
            data: {mId:mId},

          }).then(function (response) {
            that.getPageCount()
            console.log(response.data);

          }).catch(function (error) {
            console.log(error)
          })
          console.log(index,row);
        },
        onTapGiveUp:function () {
          this.editIndex = -1
        },
        /**
         * 分页
         */
        handleSizeChange:function () {
          this.showMedicine(this.currentPage)
        },
        /**
         * 分页
         */
        handleCurrentChange:function () {
          this.showMedicine(this.currentPage)
        },
        /**
         * 导入
         */
        onTapInput:function () {
          
        }
      }
    }
</script>
