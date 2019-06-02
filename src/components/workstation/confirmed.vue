<template>
    <el-container>
      <el-header style="height:auto;">
        <el-card style="width: 700px;" class="box-card">
          <div style="text-align: left;" slot="header" class="clearfix">
            <span>西医诊断</span>
          </div>
          <div>
            <el-table :data="disease">
              <el-table-column width="25px"><el-checkbox></el-checkbox></el-table-column>
              <el-table-column label="ICD编码" prop="code"></el-table-column>
              <el-table-column label="名称" prop="name"></el-table-column>
              <el-table-column label="发病时间" prop="time"></el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-header>
      <el-main>
        <el-form :label-position="right" label-width="100px">
          <div v-for="examination in examinationList">
            <el-form-item label="检查项目：" style="text-align: left;">
              <span>{{examination.eName}}</span>
            </el-form-item>
            <el-form-item label="结果：">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="eResult">
              </el-input>
            </el-form-item>
          </div>
          <el-form-item label="最终结果：">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 5}"
              placeholder="请输入内容"
              v-model="eResult">
            </el-input>
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer>
        <el-button type="primary" icon="el-icon-success">保存</el-button>
      </el-footer>
    </el-container>
</template>

<script>
    export default {
        name: "confirmed",
      data(){
          return{
            disease:[{code:'SBS:438',name:'阳痿',time:'2016-9-10'}],
            examinationList:[{eName:'aaaaa',eResult:''},{eName:'aaaaa',eResult:''},{eName:'aaaaa',eResult:''}]
          }
      }
    }
</script>

<style scoped>

</style>
