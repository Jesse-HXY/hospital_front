<template>

  <el-container>
    <el-header style="text-align: center; font-size: 12px">
      <template>
        别号编号：
        <div style="width: 200px;display: inline-block">
          <el-input
            v-model="searchdId"
            size="mini"
            placeholder="输入别号编号"
          />
          <!---->
        </div>
        &nbsp&nbsp&nbsp&nbsp号别名称：
        <div style="width: 200px;display: inline-block">
          <el-input
            v-model="searchdName"
            size="mini"
            placeholder="输入别号名称"
          />
        </div>

      </template>
      &nbsp&nbsp&nbsp&nbsp
      <el-button width="100" @click="onTapSearch">查询</el-button>
      <el-button width="100"  @click="dialogFormVisible = true">增加</el-button>

    </el-header>
        <el-main>
    <el-dialog title="添加挂号" :visible.sync="dialogFormVisible" width="350px" >
      <el-form>

        <el-form-item label="别号名称" :label-width="formLabelWidth">
          <el-input v-model="dType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="挂号限额" :label-width="formLabelWidth">
          <el-input v-model="dType" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="挂号费" :label-width="formLabelWidth" >
          <el-input v-model="dType" autocomplete="off"></el-input>
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
        label="别号编码"
        width="350">
        <template slot-scope="scope">
          <!--<span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input v-model="dId"></el-input></span>-->
          <span style="margin-left: 10px">{{scope.row.uId}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="别号名称"
        width="350">
        <template slot-scope="scope">
          <!--<span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input v-model="dName"></el-input></span>-->
          <span  style="margin-left: 10px">{{scope.row.dName}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="挂号限额"
        width="350">
        <template slot-scope="scope">

        </template>
      </el-table-column>
      <el-table-column
        label="挂号费"
        width="350">
        <template slot-scope="scope">
          <span v-if="scope.$index == editIndex"  style="margin-left: 10px"><el-input  v-model="dType"></el-input></span>
          <span v-else style="margin-left: 10px">{{scope.row.dType}}</span>
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



