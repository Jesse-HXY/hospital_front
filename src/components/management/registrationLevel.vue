<template>

  <el-container>
    <el-header style="text-align: center; font-size: 12px">
      <template>
        别号编号：
        <div style="width: 200px;display: inline-block">
          <el-input
            v-model="searchrLId"
            size="mini"
            placeholder="输入别号编号"
          />
          <!---->
        </div>
        &nbsp&nbsp&nbsp&nbsp号别名称：
        <div style="width: 200px;display: inline-block">
          <el-input
            v-model="searchrLName"
            size="mini"
            placeholder="输入别号名称"
          />
        </div>

      </template>
      &nbsp&nbsp&nbsp&nbsp
      <el-button width="100" @click="onTapSearch">查询</el-button>
      <el-button width="100" @click="dialogFormVisible = true">增加</el-button>

    </el-header>
    <el-main
      style="text-align: center;">
      <el-dialog title="添加挂号" :visible.sync="dialogFormVisible" width="350px">
        <el-form>

          <el-form-item label="别号名称" :label-width="formLabelWidth">
            <el-input v-model="rLName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="挂号限额" :label-width="formLabelWidth">
            <el-input v-model="rLLimitation" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="挂号费" :label-width="formLabelWidth">
            <el-input v-model="rLFee" autocomplete="off"></el-input>
          </el-form-item>


        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onTapAdd">确 定</el-button>
        </div>
      </el-dialog>


      <div style="display: inline-block;">
      <el-table
        :data="registrationLevelList"
        stripe
      >

        <el-table-column
          label="别号编码"
          width="100">
          <template slot-scope="scope">
            <!--<span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input v-model="dId"></el-input></span>-->
            <span style="margin-left: 10px">{{scope.row.rLId}}</span>

          </template>
        </el-table-column>
        <el-table-column
          label="别号名称"
          width="150">
          <template slot-scope="scope">
            <span v-if="scope.$index == editIndex" style="margin-left: 10px"><el-input
              v-model="rLName"></el-input></span>
            <span v-else style="margin-left: 10px">{{scope.row.rLName}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="挂号限额"
          width="150">
          <template slot-scope="scope">
            <span v-if="scope.$index == editIndex" style="margin-left: 10px"><el-input
              v-model="rLLimitation"></el-input></span>
            <span v-else style="margin-left: 10px">{{scope.row.rLLimitation}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="挂号费"
          width="150">
          <template slot-scope="scope">
            <span v-if="scope.$index == editIndex" style="margin-left: 10px"><el-input
              v-model="rLFee"></el-input></span>
            <span v-else style="margin-left: 10px">{{scope.row.rLFee}}</span>
          </template>
        </el-table-column>


        <el-table-column
          width="300">
          <!--<template slot="header" slot-scope="scope">-->
          <!--<el-button width="100" @click="onTapSearch">查询</el-button>-->
          <!--</template>-->
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              @click="handleAdd(scope.$index, scope.row)" v-if="scope.$index == editIndex">添加
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
              @click="handleDelete(scope.$index, scope.row)" v-else>删除
            </el-button>

          </template>
        </el-table-column>
      </el-table>
      </div>
    </el-main>


  </el-container>
</template>

<script>
  export default {
    data() {
      let rLId = '';
      let rLName = '';
      let rLLimitation = "";
      let rLFee = '';
      let registrationLevelList = [];
      let editIndex = -1;


      return {
        rLId: rLId,
        rLName: rLName,
        rLLimitation: rLLimitation,
        rLFee: rLFee,
        registrationLevelList: registrationLevelList,
        dialogFormVisible: false,
        radio: '',
        radioArrange: '',
        searchrLId: '',
        searchrLName: '',
        formLabelWidth: '120px',
        editIndex: editIndex

      }
    },
    created: function () {
      this.getAllRegistrationLevels();
    },

    methods: {
      handleAdd(index, row) {
        let that = this;
        let rLId = this.registrationLevelList[index].rLId;
        let registrationLevel = {
          rLId: rLId,
          rLName: this.rLName,
          rLLimitation: this.rLLimitation,
          rLFee: this.rLFee,
          editIndex: -1
        };
        this.registrationLevelList[index] = registrationLevel;
        this.$axios({
          url: 'registrationLevel/updateRegistrationLevel',
          method: 'post',
          data: {
            rLId: rLId,
            rLName: this.rLName,
            rLLimitation: this.rLLimitation,
            rLFee: this.rLFee,
          }
        }).then(response => {
          that.reSet();
          console.log((response.data));
          console.log(registrationLevel)

        }).catch(err => {
          console.log(err)
        });


        this.editIndex = -1
      },

      onTapAdd: function () {
        this.dialogFormVisible = false

      },
      handleEdit(index, row) {
        let that = this;
        let rLId = this.registrationLevelList[index].rLId;
        let rLName = this.registrationLevelList[index].rLName;
        let rLLimitation = this.registrationLevelList[index].rLLimitation;
        let rLFee = this.registrationLevelList[index].rLFee;
        this.editIndex = index;

        let data = {

          rLName: that.rLName,
          rLLimitation: that.rLLimitation,
          rLFee: that.rLFee
        }

      },
      handleDelete(index, row) {
        let rLId = this.registrationLevelList[index].rLId;

        this.registrationLevelList.splice(index, 1);

        this.$axios({
          url: 'registrationLevel/deleteRegistrationLevel',
          method: 'post',
          data: {rLId: rLId},

        }).then(function (response) {
          console.log(response.data);

        }).catch(function (error) {
          console.log(error)
        })
        console.log(index, row);
      },
      onTapSearch: function () {
        let that = this;
        this.$axios({
          url: "registrationLevel/getRegistrationLevel",
          method: "post",
          data: {
            rLId: that.searchrLId,
            rLName: that.searchrLName,
          }
        }).then(response => {
          that.registrationLevelList = response.data;
          console.log(JSON.stringify(response.data))
        }).catch(err => {
          console.log(err)
        })
      },

      getAllRegistrationLevels: function () {
        let that = this;
        this.$axios({
          url: 'registrationLevel/getAllRegistrationLevel',
          method: 'post'

        }).then(response => {
          that.registrationLevelList = response.data;
          console.log((response.data))
        }).catch(err => {
          console.log(err)
        })
      },
      onTapGiveUp: function () {
        this.editIndex = -1
      },

      onTapAdd: function () {
        this.dialogFormVisible = false;
        let that = this;
        this.getAllRegistrationLevels();
        console.log()
        this.$axios({
          url: "registrationLevel/insertRegistrationLevel",
          method: "post",
          data: {
            rLId: that.rLId,
            rLName: that.rLName,
            rLLimitation: that.rLLimitation,
            rLFee: that.rLFee,
          }
        }).then(response => {
          let registraton = {
            rLId: that.rLId,
            rLName: that.rLName,
            rLLimitation: that.rLLimitation,
            rLFee: that.rLFee,
          };
          console.log(response.data);
          this.registrationLevelList.push(registraton);
          that.reSet()
        }).catch(err => {
          console.log(err)
        })
      },

      reSet: function () {
        this.rLId = ""
        this.rLName = ""
        this.rLLimitation = ""
        this.rLFee = ""
      },
      handleCurrentChange: function () {
        this.getDepartmentsByPage(this.currentPage)
      }
    },
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



