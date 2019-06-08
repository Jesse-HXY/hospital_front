<template>
    <el-container>
      <el-header style="height:auto;">
        <el-card style="width: 700px;" class="box-card">
          <div style="text-align: left;" slot="header" class="clearfix">
            <span>{{diagnosisType}}</span>
          </div>
          <div>
            <el-table :data="diseaseList">
              <el-table-column label="ICD编码" prop="disease.disIcd"></el-table-column>
              <el-table-column label="名称" prop="disease.disName"></el-table-column>
              <el-table-column label="发病时间" prop="diaTime"></el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-header>
      <el-main>
        <el-form :label-position="right" label-width="100px">
          <div v-for="examination in examinationList">
            <el-form-item label="检查项目：" style="text-align: left;">
              <span>{{examination.eIName}}</span>
            </el-form-item>
            <el-form-item label="结果：" style="text-align: left;">
              {{examination.eAResult}}
            </el-form-item>
          </div>
          <el-form-item label="最终结果：">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 5}"
              placeholder="请输入内容"
              v-model="rResult">
            </el-input>
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer>
        <el-button type="primary" icon="el-icon-success" @click="onTapSubmit">提交</el-button>
      </el-footer>
    </el-container>
</template>

<script>
    export default {
    props:["rId"],
        name: "confirmed",
      data(){
          return{
            right:'right',
            rResult:'',
            diagnosisType:'',
            diseaseList:[],
            examinationList:[]
          }
      },created:function() {
      },methods:{
          /**
           * 提交表单
           */
          //TODO
          onTapSubmit:function(){
            this.axios({
              url:'registration/updateRStatus',
              method:'post',
              data:{
                rId:this.rId,
                rStatus:'诊毕',
                rResult: this.rResult
              }
            })
          },
        },
      watch:{
      'rId':function (rId) {
        //TODO
        this.$axios({
          url:'diagnosis/getDiagnosisTypeByrId',
          method:'post',
          data:{
            rId:rId
          }
        }).then(response=>{
          console.log(response.data)
          this.diagnosisType = response.data[0].diaType
          for(let i = 0; response.data.length; i++){
            let displayTime = new Date(response.data[i].diaTime * 1000)
            displayTime = displayTime.toLocaleDateString().replace(/\//g, "-") + " " + displayTime.toTimeString().substr(0, 8)
            this.diseaseList.push({
              diaTime:displayTime,
              disease:{
                disName:response.data[i].disease.disName,
                disIcd:response.data[i].disease.disIcd
              }
            })
          }
        })
        //TODO
        this.$axios({
          url:'diagnosis/getEINameAndEAResult',
          method:'post',
          data:{
            rId:rId
          }
        }).then(response=>{
          console.log(response.data)
          this.examinationList = response.data
        })
      }
      }
    }
</script>

<style scoped>

</style>
