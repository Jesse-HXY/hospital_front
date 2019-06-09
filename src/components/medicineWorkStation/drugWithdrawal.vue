<template>
     
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content ">
          <el-tag>门诊退药</el-tag>
        </div></el-col>
        <el-col :span="6"><div class="grid-content ">
          <el-input placeholder="请输入病历号" v-model="searchrId"></el-input>
        </div></el-col>
        <el-col :span="6"><div class="grid-content ">
          <el-input placeholder="请输入时间" v-model="searchDate"></el-input>
        </div></el-col>
        <el-col :span="6"><div class="grid-content ">
          <el-button @click="onTapSearch">查询</el-button>
          <el-button>发药</el-button>
        </div></el-col>

      </el-row>
    </el-header>
    <el-main>
      <el-table>
        <el-table-column
          label="药品编码"
          prop="">

        </el-table-column>
        <el-table-column
          label="药品名称"
          prop="">

        </el-table-column>
        <el-table-column
          label="药品拼音"
          prop="">

        </el-table-column>
        <el-table-column
          label="规格"
          prop="">

        </el-table-column>
        <el-table-column
          label="单位"
          prop="">

        </el-table-column>
        <el-table-column
          label="产家"
          prop="">

        </el-table-column>

        <el-table-column
          label="类型"
          prop="">

        </el-table-column>
        <el-table-column
          label="单价"
          prop="">

        </el-table-column>
        <el-table-column
          label="用法"
          prop="">

        </el-table-column>
        <el-table-column
          label="用量"
          prop="">

        </el-table-column>
        <el-table-column
          label="频次"
          prop="">

        </el-table-column>
        <el-table-column
          label="数量"
          prop="">

        </el-table-column>


      </el-table>
    </el-main>
  </el-container>

</template>

<script>
  export default {
    data() {
      return {
        searchrId:'',
        searchDate:'',
        searchResult:[],
      }
    },
    methods:{
      onTapSearch:function(){
        let that = this;
        this.$axios({
          url: "",
          method:"post",
          data:{
            searchrId:that.searchrId,
            searchDate:that.searchDate,
          }
        }).then(response => {
          that.searchResult = response.data;
        }).catch(err=>{
          console.log(err)
        })
      },
    }
  }
</script>
<style>
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
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
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
