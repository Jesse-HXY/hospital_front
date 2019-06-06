<template>
  <el-container>
    <el-header style="text-align: left">
        患者姓名：
      <div style="display: inline-block;">
        <el-input v-model="searchPName"></el-input>
      </div>
      &nbsp&nbsp&nbsp病历号：
      <div style="display: inline-block;">
        <el-input v-model="searchRId"></el-input>
      </div>
      &nbsp&nbsp&nbsp<el-button @click="onTapSearch" type="primary" icon="el-icon-search">查询</el-button>
    </el-header>
    <el-header style="text-align: left">
      患者信息确认:
      <el-tag>姓名</el-tag>
      <el-tag>身份证号</el-tag>
      <el-tag>病历号</el-tag>
    </el-header>
    <el-dialog :visible.sync="patientChooseDialogVisible" width="1000px">
      <el-table
      :data="patientList">
        <el-table-column
        width="30">
          <el-radion></el-radion>
        </el-table-column>
        <el-table-column
          label="病历号"
          prop="rId"
          width="100"
        ></el-table-column>
        <el-table-column
          label="患者姓名"
          prop="pName"
          width="80"
        ></el-table-column>
        <el-table-column
          label="患者身份证号"
          prop="pId"
          ></el-table-column>
        <el-table-column
          label="患者性别"
          prop="pSex"
          width="80"
        >
        </el-table-column>
        <el-table-column
          label="患者生日"
          prop="pBirth"
          width="150"
        >
        </el-table-column>
        <el-table-column
          label="家庭住址"
          prop="pAddress"
          width="300"
        >
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="patientChooseDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onTapAdd" >确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
    export default {
        name: "medicalLaboratory",
      data(){
          return{
            viewPatient:false,
            searchPName:'',
            searchRId:'',
            patient:{},
            patientList:[],
            patientChooseDialogVisible:false
          }
      },methods:{
        onTapSearch:function () {
          this.patientChooseDialogVisible = true
          this.$axios({
            url:'',
            method:'post',
            data:{
              rId:this.searchRId,
              pName:this.searchPName
            }
          }).then(response=>{

          })
        }
      }
    }
</script>

<style scoped>

</style>
