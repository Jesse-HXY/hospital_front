<template>
       
    <el-container>
      <el-header >
        <el-row>
          <el-col :span="3"><div class="grid-content ">患者姓名：</div></el-col>
          <el-col :span="4"><div class="grid-content "><el-input placeholder="输入患者姓名"></el-input>
          </div></el-col>
          <el-col :span="3"><div class="grid-content ">病历号：</div></el-col>
          <el-col :span="4"><div class="grid-content "><el-input placeholder="输入患者病历号"></el-input>
          </div></el-col>
          <el-col :span="8"><div class="grid-content "> <el-button>搜索</el-button></div></el-col>

        </el-row>

      </el-header>
      <el-divider></el-divider>
      <el-main>
        <el-table>
          <el-table-column>

          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {msg: 'vue模板页'}
        }
    }
</script>
<style>
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
