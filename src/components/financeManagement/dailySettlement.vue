<template>
    <el-container>
      <el-header style="height: auto;">
        <div class="block">
          <el-date-picker
            v-model="dates"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </div>
        <br>
        收款员ID:
        <div style="display: inline-block;">
          <el-input size="mini" v-model="cId"></el-input>
        </div>
        <el-button type="primary" size="mini" @click="onTapGenerate">生成</el-button>
      </el-header>
      <el-header>
        <span style="font-size: 20px;">东软云医院日结清单</span>
      </el-header>
      <el-main style="text-align: center;margin-top: -50px;">
        <table style="width: 1000px;text-align: left;display: inline-block;" border="1" cellspacing="0">
          <tr>
            <td>日结时间范围</td>
            <td colspan="12">{{dateRange}}</td>
          </tr>
          <tr>
            <td>制表人</td>
            <td colspan="3">{{uName}}</td>
            <td>收费人</td>
            <td colspan="5">{{cName}}</td>
            <td>制表时间</td>
            <td colspan="2" >{{currentTime}}</td>
          </tr>
          <tr>
            <td>起始发票号</td>
            <td colspan="10"></td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td>作废发票号</td>
            <td colspan="10"></td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td>重打发票号</td>
            <td colspan="10"></td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td width="130px">发票汇总</td>
            <td width="70px">总金额</td>
            <td width="70px"></td>
            <td width="70px">自费金额</td>
            <td width="70px"></td>
            <td width="70px">自付金额</td>
            <td width="70px"></td>
            <td width="70px">报销金额</td>
            <td width="70px"></td>
            <td width="70px">优惠金额</td>
            <td width="70px"></td>
            <td width="100px">四舍五入金额</td>
            <td width="70px"></td>
          </tr>
          <tr>
            <td>药费</td>
            <td>西药费</td>
            <td></td>
            <td>中药费</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td width="13%">共计</td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="10%"></td>
            <td width="7%"></td>
          </tr>
          <tr>
            <td width="13%">医疗费用</td>
            <td width="7%">挂号费</td>
            <td width="7%"></td>
            <td width="7%">检查费</td>
            <td width="7%"></td>
            <td width="7%">检验费</td>
            <td width="7%"></td>
            <td width="7%">治疗费</td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="10%"></td>
            <td width="7%"></td>
          </tr>
          <tr>
            <td width="13%">共计</td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="10%"></td>
            <td width="7%"></td>
          </tr>
          <tr>
            <td width="13%">总收入</td>
            <td width="7%"></td>
            <td width="7%">现金</td>
            <td width="7%"></td>
            <td width="7%">医保卡</td>
            <td width="7%"></td>
            <td width="7%">新农合</td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="10%"></td>
            <td width="7%"></td>
          </tr>
          <tr>
            <td width="13%">共计</td>
            <td width="7%">（大写）</td>
            <td colspan="5"></td>
            <td width="7%">（小写）</td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="7%"></td>
            <td width="10%"></td>
            <td width="7%"></td>
          </tr>
        </table>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "dailySettlement",
      data(){
          return{
            dates:[],
            dateRange:'',
            currentTime:'',
            cId:'',
            uName:'',
            cName:''
          }
      },methods:{
        /**
         * 点击生成
         */
        onTapGenerate:function () {
          this.generateTime()
          this.getUNameByUId(this.cId, true)
          this.getUNameByUId(Number(this.$cookie.get('uId')), false)
        },
        /**
         * 获得时间范围与制表时间
         */
        generateTime:function () {
          let beginTime = this.dates[0].toLocaleDateString().replace(/\//g, "-") + " " + this.dates[0].toTimeString().substr(0, 8)
          let endTime = this.dates[1].toLocaleDateString().replace(/\//g, "-") + " " + this.dates[1].toTimeString().substr(0, 8)
          this.dateRange = beginTime + '-' + endTime
          let currentTime = new Date()
          this.currentTime = currentTime.toLocaleDateString().replace(/\//g, "-") + " " + currentTime.toTimeString().substr(0, 8)
        },
        /**
         * 根据uId获取uName
         */
        getUNameByUId:function (uId, isCollector) {
          this.$axios({
            url:'user/getUserById',
            method:'post',
            data:{
              uId:uId
            }
          }).then(response=>{
            if(isCollector){
              this.cName = response.data.uName
            }else{
              this.uName = response.data.uName
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
