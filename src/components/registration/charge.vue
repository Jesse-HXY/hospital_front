<template>
  <el-container style="height: 100%; border: 1px solid #eee;">
    <el-header style="text-align: left; font-size: 20px"> 患者信息查询：</el-header>
    <el-header style="text-align: left; font-size: 12px">

      <template style="font-size: 12px">
        病历号
        <div style="width: 200px;display: inline-block ">
          <el-input
            v-model="searchrId"
            size="mini"
            placeholder="输入病历号"
          />
        </div>
      </template>

      <el-button type="primary" icon="el-icon-search" @click="onTapSearch">搜索</el-button>
    </el-header>

    <el-container style="height: 175px; border: 1px solid #eee;font-size: 20px">
      <el-main style="text-align: left">
        患者信息确认:
        <el-table :data="patientList"
                  stripe
                  style="width: 100%">
          <el-table-column
            label="姓名"
            width="300px">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{scope.row.pName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="身份证"
            width="300px">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{scope.row.pId}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="家庭住址"
            width="300px">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{scope.row.pAddress}}</span>
            </template>
          </el-table-column>

        </el-table>
      </el-main>
      <!--</el-main>-->
    </el-container>
    <el-container style="height: 100%; border: 1px solid #eee;font-size: 20px">
      <el-header>
        <el-header style="text-align: left"> 患者挂号信息：</el-header>
      </el-header>

      <el-main>
        <el-table
          stripe
          style="width: 100%">

          <el-table-column
            label="病历号"
            width="150">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{rId}}</span>

            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
            width="50">
            <template slot-scope="scope">
              <span  style="margin-left: 10px">{{pName}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="项目名称"
            width="250">
            <template slot-scope="scope">
              <span   style="margin-left: 10px"></span>
            </template>
          </el-table-column>
          <el-table-column
            label="单价"
            width="50">
            <template slot-scope="scope">
              <span style="margin-left: 10px"></span>
            </template>
          </el-table-column>
          <el-table-column
            label="数量"
            width="50">
            <template slot-scope="scope">
              <span  style="margin-left: 10px"></span>
            </template>
          </el-table-column>
          <el-table-column
            label="开立时间"
            width="250">
            <template slot-scope="scope">
              <span  style="margin-left: 10px"></span>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="250">
            <template slot-scope="scope">
              <span  style="margin-left: 10px"></span>
            </template>
          </el-table-column>
        </el-table>
        <el-button>收费结算</el-button>
        <el-dialog
          title="退号"
          :visible.sync="centerDialogVisible"
          width="30%"
          center>
          <span>应退挂号费 &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<el-tag align="right">0元</el-tag></span>
          <div align="right">
            <el-button type="primary" @click="centerDialogVisible=false">确 定</el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
    export default {
        name: "charge",
      data(){
          return{
            searchrId:'',
            patientList:[],
            pName:'',
            rId: ''
          }
      },
      methods:{
        onTapSearch:function () {
          let that = this;
          this.$axios({
            url:'registration/getRegistrationInfoByrId',
            method:'post',
            data:{
              rId : that.searchrId,
            }
          }).then(response=>{
            console.log(response.data);
            this.patientList = response.data;
            this.pName = response.data[0].pName
            this.rId = this.searchrId
          }).catch(err=>{
            console.log(err)
          })
        }
      },watch:{
          'searchrId':'onTapSearch'
      }
    }
</script>

<style scoped>

</style>
