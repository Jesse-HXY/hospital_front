<template>
  <el-container>
    <el-header style="text-align: left; font-size: 12px">
      <template>
        用户编号：
        <div style="width: 150px;display: inline-block">
          <el-input
            v-model="searchuId"
            size="mini"
            placeholder="输入用户编号"
          />
        </div>
        &nbsp&nbsp&nbsp&nbsp登录名：
        <div style="width: 150px;display: inline-block">
          <el-input
            v-model="searchuNickName"
            size="mini"
            placeholder="输入登录名"
          />
        </div>
        &nbsp&nbsp&nbsp&nbsp真实姓名：
        <div style="width: 150px;display: inline-block">
          <el-input
            v-model="searchuName"
            size="mini"
            placeholder="输入真实姓名"
          />
        </div>
        &nbsp&nbsp&nbsp&nbsp用户类别：
        <div style="width: 150px;display: inline-block">
          <el-input
            v-model="searchuCategory"
            size="mini"
            placeholder="输入用户类别"
          />
        </div>
      </template>
      &nbsp&nbsp&nbsp&nbsp
      <el-button width="100" @click="onTapSearch">查询</el-button>
      <el-button width="100" @click="onTapRequestAdd">增加</el-button>

    </el-header>
    <el-main>
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="350px">
        <el-form>
          <el-form-item label="登录名" :label-width="formLabelWidth">
            <el-input v-model="uNickName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="uPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" :label-width="formLabelWidth">
            <el-input v-model="uName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否是医生" :label-width="formLabelWidth">
            <el-radio v-model="radio" label="1">是</el-radio>
            <el-radio v-model="radio" label="2">否</el-radio>
          </el-form-item>
          <el-form-item label="职称信息" :label-width="formLabelWidth">
            <el-input v-if="radio==1" v-model="dVacation" autocomplete="off"></el-input>
            <el-input v-else disabled v-model="dVacation" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否排班" :label-width="formLabelWidth">
            <el-radio v-if="radio==1" v-model="radioArrange" label="3">是</el-radio>
            <el-radio v-if="radio==1" v-model="radioArrange" label="4">否</el-radio>
            <el-radio v-else disabled v-model="radioArrange" label="3">是</el-radio>
            <el-radio v-else disabled v-model="radioArrange" label="4">否</el-radio>
          </el-form-item>
          <!---->
          <el-form-item label="用户类别" :label-width="formLabelWidth">
        <span v-if="radio==2">
        <el-select v-model="uCategory" placeholder="请选择活动区域">
          <el-option label="挂号收费员" value="挂号收费员"></el-option>
          <el-option label="药房操作员" value="药房操作员"></el-option>
          <el-option label="财务管理员" value="财务管理员"></el-option>
          <el-option label="医院管理员" value="医院管理员"></el-option>
        </el-select>
          </span>
            <span v-else-if="radio==1">
           <el-select v-model="uCategory" placeholder="请选择活动区域">
           <el-option label="门诊医生" value="门诊医生"></el-option>
          <el-option label="医技医生" value="医技医生"></el-option>
           </el-select>
        </span>
          </el-form-item>
          <el-form-item label="请选择科室">
            <template>
            <el-select v-model="chosenDepartmentList" multiple filterable placeholder="请选择">
              <div v-for="item in departmentList">
                <el-option :key="item.dId" :value="item.dId" :label="item.dName"></el-option>
              </div>
            </el-select>
            </template>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onTapAdd">确 定</el-button>
        </div>
      </el-dialog>
      <el-table
        :data="userList"
        stripe
        style="width: 100%">
        <el-table-column
          label="用户编号"
          width="150">
          <template slot-scope="scope">
            <!--<span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input v-model="dId"></el-input></span>-->
            <span style="margin-left: 10px">{{scope.row.uId}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="登录名"
          width="200">
          <template slot-scope="scope">
            <span v-if="scope.$index == editIndex" style="margin-left: 10px"><el-input
              v-model="uNickName"></el-input></span>
            <span v-else style="margin-left: 10px">{{scope.row.uNickName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="密码"
          width="200">
          <template slot-scope="scope">
            <span v-if="scope.$index == editIndex" style="margin-left: 10px"><el-input
              v-model="uPassword"></el-input></span>
            <span v-else style="margin-left: 10px">{{scope.row.uPassword}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="真实姓名"
          width="200">
          <template slot-scope="scope">
            <span v-if="scope.$index == editIndex" style="margin-left: 10px"><el-input
              v-model="uName"></el-input></span>
            <span v-else style="margin-left: 10px">{{scope.row.uName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否是医生"
          width="200">
          <template slot-scope="scope">
            <span v-if="scope.$index == editIndex" style="margin-left: 10px">
              <el-select v-model="isDoctor" placeholder="请选择是否是医生">
              <el-option label="是" value="true"></el-option>
              <el-option label="否" value="false"></el-option>
            </el-select>
            </span>
            <span v-else style="margin-left: 10px">{{scope.row.isDoctor}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户类别"
          width="200">
          <template slot-scope="scope">
        <span v-if="scope.$index == editIndex" style="margin-left: 10px"><el-select v-model="uCategory"
                                                                                    placeholder="请选择活动区域">
              <el-option label="挂号收费员" value="挂号收费员"></el-option>
              <el-option label="门诊医生" value="门诊医生"></el-option>
          <el-option label="医技医生" value="医技医生"></el-option>
          <el-option label="药房操作员" value="药房操作员"></el-option>
          <el-option label="财务管理员" value="财务管理员"></el-option>
          <el-option label="医院管理员" value="医院管理员"></el-option>
            </el-select></span>
            <span v-else style="margin-left: 10px">{{scope.row.uCategory}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="所属科室"
          width="300">
          <template slot-scope="scope">
          <div v-for="department in scope.row.departments" style="display: inline-block">
            <el-tag type="danger">{{department.dName}}</el-tag>&nbsp&nbsp
          </div>
          </template>
        </el-table-column>
        <el-table-column width="300px"
          align="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="onTapUpdate(scope.$index)">编辑
            </el-button>
            <el-button
              size="mini"
              @click="onTapConfirm(scope.$index,scope.row)" v-if="scope.$index == editIndex">添加
            </el-button>
            <el-button
              size="mini" v-else disabled>添加
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="onTapGiveUp" v-if="scope.$index == editIndex">放弃
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="onTapDelete(scope.$index, scope.row)" v-else>删除
            </el-button>

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
</template>

<script>
  export default {
    data() {
      return {
        formLabelWidth: '120px',
        dialogFormVisible: false,
        radio: '',
        radioArrange: '',
        searchuId: '',
        searchuNickName: '',
        searchuCategory: '',
        searchuName: '',
        uNickName: '',
        uPassword: '',
        uCategory: '',
        uName: '',
        dVacation: '',
        // userList: [{uName:'a',uNickName:'a',uPassword:'a',uCategory:'a',departmentList:[{dName:'妇产科'},{dName:'艾滋病科'}]}],
        userList:[],
        /**当前页面数*/
        currentPage: 1,
        /**页面总数*/
        pageCount: 1,
        /**页面大小*/
        pageSize: 10,
        editIndex: -1,
        departmentList: [],
        chosenDepartmentList: []
      }
    },created:function(){
      let that = this
      this.$axios({
      url:"department/getAllDepartments",
        method:"post",
    }).then(response=>{
      that.departmentList = response.data
      })
      this.getUserCount()
      this.getUserByPage(1)
    }, methods: {
      /*****************************************************添加**************************************************************/
      /**
       * 点击首页添加按钮
       */
      onTapRequestAdd: function () {
        this.resetUser()
        this.dialogFormVisible = true
      },

      /**
       * 点击添加确认按钮
       */
      onTapAdd: function () {
        let isDoctor = false
        let isDue = false
        if (this.radio == 1) {
          isDoctor = true
          if (this.radioArrange == 3) {
            isDue = true
          }
        }
        let dIdList = this.chosenDepartmentList
        var that = this
        this.$axios({
          url: "user/insertUser",
          method: "post",
          data: {
            uNickName: that.uNickName,
            uPassword: that.uPassword,
            uCategory: that.uCategory,
            uName: that.uName,
            isDoctor: isDoctor,
            dVacation: that.dVacation,
            isDue: isDue,
            dIdList:dIdList
          }
        }).then(respones => {
          that.pageCount = that.pageCount + 1
          that.getUserByPage(that.currentPage)
        }).catch(err => {
          console.log(err)
        })
        this.dialogFormVisible = false
      },

      resetUser: function () {
        this.uNickName = ''
        this.uPassword = ''
        this.uCategory = ''
        this.uName = ''
        this.dVacation = ''
        this.radio = ''
        this.radioArrange = ''
        this.chosenDepartmentList = []
      },
      /*****************************************************更新**************************************************************/
      /***
       * 点击编辑
       */
      onTapUpdate: function (index) {
        this.resetUser()
        this.editIndex = index
      },
      /**
       * 点击确认
       * */
      onTapConfirm: function (index, row) {
        let uId = row.uId
        this.editIndex = -1
        this.$axios({
          uNickName: that.uNickName,
          uPassword: that.uPassword,
          uCategory: that.uCategory,
          uName: that.uName,
          isDoctor: isDoctor,
          dVacation: that.dVacation,
          isDue: isDue
        })
      },

      /**
       * 点击放弃
       * */
      onTapGiveUp:function(){
        this.editIndex = -1
      },
      /*****************************************************查询**************************************************************/
      onTapSearch: function () {

      },
      /*****************************************************分页**************************************************************/
      /**
       * 分页
       */
      handleSizeChange: function () {
        this.getUserByPage(this.currentPage)
      },
      /**
       * 分页
       */
      handleCurrentChange: function () {
        this.getUserByPage(this.currentPage)
      },

      /**
       * 分页得到user
       * */
      getUserByPage: function (pageNum) {
        let that = this;
        pageNum = pageNum - 1
        pageNum = pageNum * that.pageSize
        this.$axios({
          url: 'user/getUserByPage',
          method: "post",
          data: {
            pageNum: pageNum,
            pageSize: that.pageSize
          }
        }).then(response => {
          console.log(response.data)
          that.userList = response.data
        }).catch(err => {
          console.log(err)
        })
      },

      /**
       * 得到用户的数量
       * */
      getUserCount:function () {
        let that = this
        this.$axios({
          url:'user/getUserCount',
          method:'post',
        }).then(response=>{
          that.pageCount = response.data
        }).catch(err=>{
          console.log(err)
        })
      },
      /*****************************************************删除**************************************************************/
      /**点击删除按钮*/
      onTapDelete:function (index,row){
        console.log(row)
        let uId = row.uId
        let that = this
        this.$axios({
          url:'user/deleteUser',
          method:'post',
          data:{
            uId:uId
          }
        }).then(response=>{
          that.pageCount = that.pageCount - 1
          that.getUserByPage(that.currentPage)
        }).catch(err=>{
          console.log(err)
        })
      }
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
</style>
