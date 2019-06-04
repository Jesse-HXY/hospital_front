<template>
  <el-container>
    <el-aside width="70%">
      <el-header style="height: 20px;">
        <el-button type="text" icon="el-icon-circle-plus">新增项目</el-button>
        <el-button type="text" icon="el-icon-delete">删除项目</el-button>
        <el-button type="text" icon="el-icon-circle-check">开立项目</el-button>
        <el-button type="text" icon="el-icon-delete">作废项目</el-button>
        <el-button type="text" icon="el-icon-plus">存为组套</el-button>
      </el-header>
      <el-main>
        <div style="text-align: left;">
          <el-tag>合计金额</el-tag>
          <el-tag type="warning">0元</el-tag>
        </div>
        <el-table
          :data="applicationList">
          <el-table-column
            width="25px"><el-checkbox></el-checkbox></el-table-column>
          <el-table-column
            label="申请名称"
            prop="name"></el-table-column>
          <el-table-column
            label="项目名称"
            prop="eIName"></el-table-column>
          <el-table-column
            label="执行科室"
            prop="dName"></el-table-column>
          <el-table-column
            label="执行状态"
            prop="eStatus"></el-table-column>
          <el-table-column
            label="单价"
            prop="eIFee"></el-table-column>
          <el-table-column
            label="检查结果"
            prop="eResult"></el-table-column>
        </el-table>
      </el-main>
    </el-aside>
    <el-main>
      <el-tabs type="card">
        <el-tab-pane label="常用模版">
          <el-table
          :data="examinationTemplateList">
            <el-table-column
              label="名称"
              prop="eTName"
            ></el-table-column>
            <el-table-column
              label="操作">
              <el-button type="text" size="mini">使用</el-button>
              <el-button type="text" size="mini" @click="centerDialogVisible=true">详细</el-button>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
                 <el-button @click="centerDialogVisible = false">取 消</el-button>
                 <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                </span>
    </el-dialog>
  </el-container>
</template>

<script>
    export default {
        name: "applyExamination",
      data() {
        return {
          applicationList: [{
            name: '模版：腱鞘炎',
            eIName: '一个看不懂还贼老长的名字',
            dName: '检验科',
            eStatus: '暂存',
            eIFee: '50',
            eResult: 'balala'
          }, {name: '模版：腱鞘炎', eIName: '一个看不懂还贼老长的名字', dName: '检验科', eStatus: '暂存', eIFee: '50', eResult: 'balala'}],
          examinationTemplateList: [],
          centerDialogVisible: false,
        }
      },
      created:function () {
          let that = this
          let uId = this.$cookie.get('uId')
        this.$axios({
          url:'',
          method:'post',
          data:{
            uId:uId
          }
        }).then(response=>{
          that.examinationTemplateList = that.examinationTemplateList + response.data
        })
      }
    }
</script>

<style scoped>

</style>
