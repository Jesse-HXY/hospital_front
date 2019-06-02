<script src="../../js/pinyin.js"></script>
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


      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </el-header>

    <el-container style="height: 100%; border: 1px solid #eee;font-size: 20px">
     <el-main style="text-align: left">
       <!--<el-header style="text-align: left; font-size: 20px">-->
         <!--患者信息确认:-->
       <!--</el-header>-->
       <!--<el-main>-->
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
            :data="patientList"
            stripe
            style="width: 100%">

            <el-table-column
              label="病历号"
              width="250">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{scope.row.rId}}</span>

              </template>
            </el-table-column>
            <el-table-column
              label="姓名"
              width="250">
              <template slot-scope="scope">
                <span  style="margin-left: 10px">{{scope.row.pName}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="身份证号"
              width="250">
              <template slot-scope="scope">
                <span   style="margin-left: 10px">{{scope.row.pId}}</span>
              </template>
            </el-table-column>
            <el-table-column
            label="挂号日期"
            width="250">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{scope.row.rTime}}</span>
            </template>
          </el-table-column>
            <el-table-column
              label="挂号午别"
              width="250">
              <template slot-scope="scope">
                <span  style="margin-left: 10px">{{scope.row.MorningOrEvening}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="看诊科室"
              width="250">
              <template slot-scope="scope">
                <span  style="margin-left: 10px">{{scope.row.dName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="看诊状态"
              width="250">
              <template slot-scope="scope">
                <span  style="margin-left: 10px">{{scope.row.rState}}</span>
              </template>
            </el-table-column>


            <el-table-column
              align="right"
            label="操作">

              <template slot-scope="scope">
<!---->
                <el-button
                  v-if="scope.row.rState=='未诊断'"
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">
                  退号
                </el-button>
                <el-button v-else disabled  size="mini"
                           type="primary">退号</el-button>
              </template>
            </el-table-column>
          </el-table>





        </el-main>
      </el-container>

  </el-container>


</template>

<script>


  export default {

    name: 'department',

    data(){


      let rId='';
      let pName='';
      let pId='';
      let rTime='';
      let MorningOrEvening='';
      let dName='';
      let rState='';
      let pAddress='';
      let patientList=[{rId:123,pName:"韩子豪",pId:131321,rTime:'2019/01/01',MorningOrEvening:'上午',dName:'艾滋病科',rState:'未诊断',pAddress:'妓院'},
                       {rId:456,pName:"大傻逼",pId:1313214234,rTime:'2019/01/01',MorningOrEvening:'上午',dName:'艾滋病科',rState:'已诊断',pAddress:'美国'}];

      return{
        rId :rId,
        pName : pName,
        pId : pId,
        rTime: rTime,
        MorningOrEvening:MorningOrEvening,
        dName:dName,
        rState:rState,
        pAddress:pAddress,
        patientList:patientList,
        searchrId:'',
      }
    },
    methods:{



       searchByrId:function () {
         let that = this;
         this.$axios({
           url:'',
           method:'post',
           data:{
             pId : that.pId,
           }
         }).then(response=>{
           console.log(response.data)
         }).catch(err=>{
           console.log(err)
         })
       },

      handleDelete(index,row) {
        let rId = this.patientList[index].rId;
        let rState = this.patientList[index].rState;
        let that = this;
        this.patientList.splice(index,1);
        this.$axios({
          url:'',
          method:'post',
          data:
            {
              rId:rId,
              rState:rState


            },

        }).then(function (response) {
          that.getPageCount()
          console.log(response.data);

        }).catch(function (error) {
          console.log(error)
        })
        console.log(index,row);
      },

    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
