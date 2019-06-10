<template>
       
    <el-container>
      <el-header >
        <el-row>
          <el-col :span="3"><div class="grid-content ">患者姓名：</div></el-col>
          <el-col :span="4"><div class="grid-content "><el-input v-model="pName" placeholder="输入患者姓名"></el-input>
          </div></el-col>
          <el-col :span="3"><div class="grid-content ">病历号：</div></el-col>
          <el-col :span="4"><div class="grid-content "><el-input v-model="rId" placeholder="输入患者病历号"></el-input>
          </div></el-col>
          <el-col :span="8"><div class="grid-content "> <el-button @click="onTapSearch">搜索</el-button></div></el-col>

        </el-row>

      </el-header>
      <el-divider></el-divider>
      <el-main>
        <el-table
        :data="itemList"
        >
          <el-table-column
          label="名称"
          prop="name"
          >
          </el-table-column>
          <el-table-column
            label="金额"
            prop="fee"
          ></el-table-column>
          <el-table-column
            label="数量"
            prop="number"
          ></el-table-column>
          <el-table-column
            label="类型"
            prop="type"
          ></el-table-column>
          <el-table-column
            label="合计"
            prop="total"
          >
          </el-table-column>
        </el-table>
      </el-main>
      合计：{{totalFee}}
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
              pName:'',
              rId:'',
              itemList:[],
              totalFee:0.0
            }
        },
      methods:{
          onTapSearch:function () {
            this.itemList = []
            let statusList = ["执行中","执行结束","已收费","取消执行"]
            for(let i = 0; i < statusList.length; i++){
              this.$axios({
                url:'diagnosis/selectByrIdAndStatus',
                method:'post',
                data:{
                  rId:this.rId,
                  eAStatus: statusList[i]
                }
              }).then(response=>{
                for(let i = 0; i <response.data.length; i++){
                  this.itemList.push({
                    name:response.data[i].examnationItem.eIName,
                    fee:response.data[i].examnationItem.eIFee,
                    type:response.data[i].examnationItem.eIFeeType,
                    number:1,
                    total:response.data[i].examnationItem.eIFee
                  })
                }
              })
              this.$axios({
                url:'diagnosis/getDetailByrId',
                method:'post',
                data:{
                  rId:this.rId,
                  mState:statusList[i]
                }
              }).then(response=>{
                for(let i = 0; i <response.data.length; i++){
                  this.itemList.push({
                    name:response.data[i].mName,
                    fee:response.data[i].mFee,
                    number:response.data[i].mAmount,
                    total:response.data[i].mFee * response.data[i].mAmount,
                    type:response.data[i].mType
                  })
                }
              })
            }
          }
      },watch:{
          'itemList':function (itemList) {
            let totalFee = 0.0
            for(let i = 0; i < itemList.length; i++){
              totalFee = totalFee + itemList[i].total
            }
            this.totalFee = (Math.round(totalFee * 100)) / 100
          }
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
