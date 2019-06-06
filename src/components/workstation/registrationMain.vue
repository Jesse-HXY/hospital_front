<!--病历首页-->
<template>
  <el-container>
    <el-header style="height: 20px;margin-top:-10px;">
      <el-button type="text" icon="el-icon-document">暂存</el-button>
      <el-button type="text" icon="el-icon-success" @click="onTapSubmit">提交</el-button>
      <el-button type="text" icon="el-icon-delete" @click="onTapClean">清空</el-button>
      <el-button type="text" icon="el-icon-refresh">刷新</el-button>
    </el-header>
    <el-header style="text-align: left;height: 30px;margin-top: 7px;">
      <el-tag>病历内容</el-tag>
    </el-header>
    <el-main style="margin-top: -15px">
      <el-form :label-position="right" label-width="100px">
        <el-form-item label="主诉：">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="mChiefComplaint">
          </el-input>
        </el-form-item>
        <el-form-item label="现病史：">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="mHistoryOfPresentIllness">
          </el-input>
        </el-form-item>
        <el-form-item label="现病治疗情况：">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
            placeholder="请输入内容"
            v-model="mSituation">
          </el-input>
        </el-form-item>
        <el-form-item label="既往史：">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="mHistoryOfPastIllness">
          </el-input>
        </el-form-item>
        <el-form-item label="过敏史：">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="mAllergy">
          </el-input>
        </el-form-item>
        <el-form-item label="体检：">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="mPhysicalExamination">
          </el-input>
        </el-form-item>
        <el-card v-if="hasDiagnosis" class="box-card">
          <div style="text-align: left;" slot="header" class="clearfix">
            <span>西医诊断</span>
          </div>
          <div>
            <el-table :data="diseaseList">
              <el-table-column width="25px">
                <el-checkbox></el-checkbox>
              </el-table-column>
              <el-table-column label="ICD编码" prop="disIcd"></el-table-column>
              <el-table-column label="名称" prop="disName"></el-table-column>
              <el-table-column label="发病时间" prop="time"></el-table-column>
            </el-table>
          </div>
        </el-card>
        <el-card v-else class="box-card">
          <div style="text-align: left;" slot="header" class="clearfix">
            <span style="font-size: 60px">未诊断</span>
          </div>
          <div style="text-align: left;">
            <el-button @click="startDiagnosis">进行诊断</el-button>
          </div>
        </el-card>
        <br><br>
        <el-form-item label="检查建议：">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="mSuggestion">
          </el-input>
        </el-form-item>
        <el-form-item label="注意事项：">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="mAttention">
          </el-input>
        </el-form-item>
      </el-form>
      <el-dialog
        title="添加诊断"
        :visible.sync="dialogVisible"
        width="30%">
        <el-form :label-position="right" label-width="100px">
          <el-form-item style="text-align: left;" label="诊断方式：">
            <el-select v-model="diagnosisType">
              <el-option label="西医诊断" value="西医诊断"></el-option>
              <el-option label="中医诊断" value="中医诊断"></el-option>
            </el-select>
          </el-form-item>
          <div v-for="disease in diseaseList">
            <el-form-item label="ICD编码：">{{disease.disIcd}}</el-form-item>
            <el-form-item label="疾病名称：">{{disease.disName}}</el-form-item>
            <el-form-item label="发病时间：">{{disease.time}}</el-form-item>
          </div>
          <div v-if="addDisease">
            <el-form-item label="疾病：">
              <el-input v-model="disease.name" @blur="getDisName($event)"></el-input>
            </el-form-item>
            <el-form-item label="发病时间：">
              <div class="block">
                <el-date-picker
                  v-model="disease.time"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                  :picker-options="pickerOptions1">
                </el-date-picker>
              </div>
            </el-form-item>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button v-if="addDisease" @click="onTapAddDisease">添加</el-button>
          <el-button v-if="addDisease" @click="addDisease = false">放弃</el-button>
          <el-button v-else @click="addDisease = true">添加疾病</el-button>
          <el-button v-if="!addDisease" @click="dialogVisible = false">取 消</el-button>
          <el-button v-if="!addDisease" type="primary" @click="onTapFinishDiagnosis">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
    <el-footer style="display: inline-block;">
      <el-button type="primary" @click="onTapSubmit">提交</el-button>
    </el-footer>
  </el-container>
</template>

<script>
  export default {
    name: "registrationMain",
    data() {
      return {
        rId:'',
        mChiefComplaint: '',
        mHistoryOfPresentIllness: '',
        mSituation: '',
        mHistoryOfPastIllness: '',
        mAllergy: '',
        mPhysicalExamination: '',
        diseaseList: [],
        disease:{},
        mSuggestion: '',
        mAttention: '',
        //是否进行过初步诊断
        hasDiagnosis: false,
        dialogVisible: false,
        diagnosisType:'',
        addDisease:false,
        diagnosisTypes:[]
      };
    },created:function(){
    },
    methods: {
      /**
       * 开始初步诊断
       * */
      startDiagnosis:function(){
        this.dialogVisible = true
        this.rId = Number(this.$cookie.get('rId'))
        console.log(this.rId)
      },
      /**
       * 点击确定添加疾病
       */
      onTapAddDisease:function () {
        let currentDate = new Date()
        if((this.disease.time.getTime()-currentDate.getTime())>0){
          alert("大哥你穿越了吗")
          return
        }
        let tempTime = this.disease.time
        this.disease.time=this.disease.time.toLocaleDateString().replace(/\//g, "-") + " " + this.disease.time.toTimeString().substr(0, 8)
        this.disease.diaTime=tempTime.getTime()
        this.diseaseList.push(this.disease)
        this.disease = {}
        console.log(this.diseaseList)
        this.addDisease=false
      },
      /**
       * 点击确定完成诊断
       */
      onTapFinishDiagnosis:function () {
        for(let i = 0; i < this.diseaseList.length; i++){
          let diagnosisType = {
            rId:this.rId,
            diaType:this.diagnosisType,
            disId:this.diseaseList[i].disId,
            diaTime:this.diseaseList[i].diaTime
          }
          this.diagnosisTypes.push(diagnosisType)
        }
        this.dialogVisible=false
        this.hasDiagnosis=true
      },
      /**
       * 得到疾病名称
       */
      getDisName:function (e) {
        let that = this
        this.$axios({
          url:'disease/getDiseases',
          method:'post',
          data:{
            disName:that.disease.name
          }
        }).then(response=>{
          console.log(response.data)
          that.disease.disName = response.data[0].disName
          that.disease.disIcd = response.data[0].disIcd
          that.disease.disId = response.data[0].disId
        }).catch(err=>{
          console.log(err)
        })
      },
      /**
       * 点击提交
       */
      onTapSubmit:function () {
        let pId = this.$cookie.get('pId')
        let that = this
        this.$axios({
          url:'diagnosis/insertMedicalRecord',
          method:'post',
          data:{
            pId:pId,
            rId:that.rId,
            mChiefComplaint: that.mChiefComplaint,
            mHistoryOfPresentIllness: that.mHistoryOfPresentIllness,
            mSituation: that.mSituation,
            mHistoryOfPastIllness: that.mHistoryOfPastIllness,
            mAllergy: that.mAllergy,
            mPhysicalExamination: that.mPhysicalExamination,
            mAttention: that.mAttention,
            mSuggestion: that.mSuggestion
          }
        }).then(response=>{
        }).catch(err=>{
          console.log(err)
        })
        this.$axios({
          url:'diagnosis/insertDiagnosisTypes',
          method:'post',
          data:{
            diagnosisTypes:this.diagnosisTypes
          }
        }).then(response=>{}).catch(err=>{
          console.log(err)
        })
      },
      /**
       * 清除
       */
      onTapClean:function () {
        this.diagnosisTypes = []
        this.mChiefComplaint = ''
        this.mHistoryOfPresentIllness = ''
        this.mSituation = ''
        this.mHistoryOfPastIllness = ''
        this.mAllergy = ''
        this.mPhysicalExamination = ''
        this.mAttention = ''
        this.mSuggestion = ''
      }
    },watch:{

    }
  }
</script>

<style scoped>

</style>
