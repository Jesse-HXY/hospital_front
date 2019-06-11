<template>
    <el-container>
      <el-header style="text-align: left; font-size: 12px">
      <template>
        发票编号：
        <div style="width: 150px;display: inline-block">
          <el-input
            v-model="searchiId"
            size="mini"
            placeholder="输入发票编号"
          ></el-input>
        </div>
      </template>
        <el-button type="primary" size="mini" @click="onTapSearch">查询</el-button>
      </el-header>
      <el-main>
        <el-table>

        </el-table>
      </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "reprintInvoice",
      data(){
          return{
            searchiId:''
          }
      },
      methods:{
          onTapSearch:function () {

          }
      }
    }
</script>

<style scoped>

</style>
