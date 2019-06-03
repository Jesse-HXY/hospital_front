<!--病历首页-->
<template>
  <el-container>
    <el-header style="height: 20px;margin-top:-10px;">
      <el-button type="text" icon="el-icon-document">暂存</el-button>
      <el-button type="text" icon="el-icon-success">提交</el-button>
      <el-button type="text" icon="el-icon-delete">清空</el-button>
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
              <el-table-column label="ICD编码" prop="code"></el-table-column>
              <el-table-column label="名称" prop="name"></el-table-column>
              <el-table-column label="发病时间" prop="time"></el-table-column>
            </el-table>
          </div>
        </el-card>
        <el-card v-else class="box-card">
          <div style="text-align: left;" slot="header" class="clearfix">
            <span style="font-size: 60px">未诊断</span>
          </div>
          <div style="text-align: left;">
            <el-button @click="dialogVisible = true">进行诊断</el-button>
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
            <el-form-item label="ICD编码：">{{disease.code}}</el-form-item>
            <el-form-item label="疾病名称：">{{disease.name}}</el-form-item>
            <el-form-item label="发病时间：">{{disease.time}}</el-form-item>
          </div>
          <div v-if="addDisease">
            <el-form-item label="疾病：">
              <el-input v-model="disease.name"></el-input>
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
          <el-button v-if="!addDisease" type="primary" @click="onTapFininshDiagnosis">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
    <el-footer style="display: inline-block;">
      <el-button type="primary">提交</el-button>
    </el-footer>
  </el-container>
</template>

<script>
  export default {
    name: "registrationMain",
    data() {
      return {
        mChiefComplaint: '',
        mHistoryOfPresentIllness: '',
        mSituation: '',
        mHistoryOfPastIllness: '',
        mAllergy: '',
        mPhysicalExamination: '',
        diseaseList: [{code: 'SBS:438', name: '阳痿', time: '2016-9-10'}],
        disease:{},
        mSuggestion: '',
        mAttention: '',
        //是否进行过初步诊断
        hasDiagnosis: false,
        dialogVisible: false,
        diagnosisType:'',
        addDisease:false
      };
    },
    methods: {
      /**
       * 点击确定添加疾病
       */
      onTapAddDisease:function () {
        this.diseaseList.push(this.disease)
        this.addDisease=false
      },
      /**
       * 点击确定完成诊断
       */
      onTapFininshDiagnosis:function () {
        this.dialogVisible=false
        this.hasDiagnosis=true
      }
    }
  }
</script>

<style scoped>

</style>
