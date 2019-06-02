<template>
  <el-container>
    <el-header style="text-align: left;height: 30px;">
      <el-tag>病历内容</el-tag>
    </el-header>
    <el-main>
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
      <el-card class="box-card">
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
    </el-main>
    <el-footer style="display: inline-block;">
      <el-button type="primary">提交</el-button>
      <el-button type="success">暂存</el-button>
      <el-button type="danger">清空</el-button>
    </el-footer>
  </el-container>
</template>

<script>
    export default {
        name: "registrationMain",
      data() {
        return {
          mChiefComplaint:'',
          mHistoryOfPresentIllness:'',
          mSituation:'',
          mHistoryOfPastIllness:'',
          mAllergy:'',
          mPhysicalExamination:'',
          disease:[{code:'SBS:438',name:'阳痿',time:'2016-9-10'}],
          mSuggestion:'',
          mAttention:''
        };
      },
      methods: {
      }
    }
</script>

<style scoped>

</style>
