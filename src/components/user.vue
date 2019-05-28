<template>

  <el-container>
    <el-header style="text-align: left; font-size: 12px">
      <template>
        用户编号：
        <div style="width: 200px;display: inline-block">
          <el-input
            v-model="searchdId"
            size="mini"
            placeholder="输入用户编号"
          />
        </div>
        &nbsp&nbsp&nbsp&nbsp登录名：
        <div style="width: 200px;display: inline-block">
          <el-input
            v-model="searchdName"
            size="mini"
            placeholder="输入登录名"
          />
        </div>
        &nbsp&nbsp&nbsp&nbsp真实姓名：
        <div style="width: 200px;display: inline-block">
          <el-input
            v-model="searchdType"
            size="mini"
            placeholder="输入真实姓名"
          />
        </div>
        &nbsp&nbsp&nbsp&nbsp用户类别：
        <div style="width: 200px;display: inline-block">
          <el-input
            v-model="searchdCategory"
            size="mini"
            placeholder="输入用户类别"
          /></div>
      </template>
      &nbsp&nbsp&nbsp&nbsp
      <el-button width="100" @click="onTapSearch">查询</el-button>
      <el-button width="100"  @click="dialogFormVisible = true">增加</el-button>

    </el-header>
        <el-main>
  <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="350px" >
    <el-form>
      <el-form-item label="登录名" :label-width="formLabelWidth">
        <el-input v-model="dName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="dType" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" :label-width="formLabelWidth">
        <el-input v-model="dType" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否是医生" :label-width="formLabelWidth">
        <el-radio v-model="radio" label="1">是</el-radio>
        <el-radio v-model="radio" label="2">否</el-radio>
      </el-form-item>
      <el-form-item label="职称信息" :label-width="formLabelWidth" >
        <el-input disabled v-model="dType" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否排班" :label-width="formLabelWidth">
        <el-radio disabled v-model="radioArrange" label="3">是</el-radio>
        <el-radio disabled v-model="radioArrange" label="4">否</el-radio>
      </el-form-item>
<!---->
      <el-form-item label="用户类别" :label-width="formLabelWidth" >
        <span v-if="radio==2">
        <el-select v-model="dCategory"   placeholder="请选择活动区域">
          <el-option label="挂号收费员" value="挂号收费员"></el-option>
          <el-option label="药房操作员" value="药房操作员"></el-option>
          <el-option label="财务管理员" value="财务管理员"></el-option>
          <el-option label="医院管理员" value="医院管理员"></el-option>
        </el-select>
          </span>
        <span v-else-if="radio==1">
           <el-select v-model="dCategory"   placeholder="请选择活动区域">
           <el-option label="门诊医生" value="门诊医生"></el-option>
          <el-option label="医技医生" value="医技医生"></el-option>
           </el-select>
        </span>
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
      label="用户编号"
      width="150">
      <template slot-scope="scope">
        <!--<span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input v-model="dId"></el-input></span>-->
        <span style="margin-left: 10px">{{scope.row.uId}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="登录名"
      width="300">
      <template slot-scope="scope">
        <!--<span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input v-model="dName"></el-input></span>-->
        <span  style="margin-left: 10px">{{scope.row.dName}}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="密码"
      width="200">
      <template slot-scope="scope">

      </template>
    </el-table-column>
    <el-table-column
      label="真实姓名"
      width="200">
      <template slot-scope="scope">
        <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input  v-model="dType"></el-input></span>
        <span v-else style="margin-left: 10px">{{scope.row.dType}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="是否是医生"
      width="200">
      <template slot-scope="scope">
        <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input  v-model="dType"></el-input></span>
        <span v-else style="margin-left: 10px">{{scope.row.dType}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="用户类别"
      width="200">
      <template slot-scope="scope">
        <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-select v-model="dCategory"  placeholder="请选择活动区域">
              <el-option label="挂号收费员" value="挂号收费员"></el-option>
              <el-option label="门诊医生" value="门诊医生"></el-option>
          <el-option label="医技医生" value="医技医生"></el-option>
          <el-option label="药房操作员" value="药房操作员"></el-option>
          <el-option label="财务管理员" value="财务管理员"></el-option>
          <el-option label="医院管理员" value="医院管理员"></el-option>
            </el-select></span>
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
</el-main>









  </el-container>
</template>

<script>
  export default {
    data() {


      return {
        dialogFormVisible:false,
        radio:'',
        radioArrange:'',
      }
    }
    ,methods:{

      onTapAdd:function(){
        this.dialogFormVisible = false

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
</style>



