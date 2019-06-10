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
          <el-input size="mini"></el-input>
        </div>
        <el-button type="primary" size="mini">查询</el-button>
      </el-header>
      <el-header>
        <span style="font-size: 20px;">东软云医院日结清单</span>
      </el-header>
      <el-main style="text-align: center;margin-top: -50px;">
        <table style="width: 1000px;text-align: left;display: inline-block;" border="1" cellspacing="0">
          <tr>
            <td>日结时间范围</td>
            <td colspan="12"></td>
          </tr>
          <tr>
            <td>制表人</td>
            <td colspan="3"></td>
            <td>收费人</td>
            <td colspan="5"></td>
            <td>制表时间</td>
            <td colspan="2" ></td>
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
            <td width="13%">发票汇总</td>
            <td width="7%">总金额</td>
            <td width="7%"></td>
            <td width="7%">自费金额</td>
            <td width="7%"></td>
            <td width="7%">自付金额</td>
            <td width="7%"></td>
            <td width="7%">报销金额</td>
            <td width="7%"></td>
            <td width="7%">优惠金额</td>
            <td width="7%"></td>
            <td width="10%">四舍五入金额</td>
            <td width="7%"></td>
          </tr>
          <tr>
            <td width="13%">药费</td>
            <td width="7%">西药费</td>
            <td width="7%"></td>
            <td width="7%">中药费</td>
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
            dates:[]
          }
      }
    }
</script>

<style scoped>

</style>
