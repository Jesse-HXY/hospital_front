<template>
       
   <el-container>
  <el-header align="left">
    <el-tag>门诊诊断：</el-tag>
    <el-tag type="warning">【西医诊断】流行性腮腺炎</el-tag>
    <el-row :gutter="20" class=" bg-purple-light">
      <el-col :span="16" align="center">
        <div class="grid-content ">
        <el-button type="text" icon="el-icon-circle-plus">新增项目</el-button>
        <el-button type="text" icon="el-icon-delete">删除项目</el-button>
        <el-button type="text" icon="el-icon-circle-check">开立项目</el-button>
        <el-button type="text" icon="el-icon-delete">作废项目</el-button>
        <el-button type="text" icon="el-icon-plus">存为组套</el-button>
       </div>
      </el-col>
        <el-col :span="8">
          <div class="grid-content ">
            <el-button type="text" icon="el-icon-circle-plus-outline">增药</el-button>
            <el-button type="text" icon="el-icon-remove-outline" disabled>删药</el-button>
        </div></el-col>
    </el-row>
  </el-header>
     <el-main>
       <el-container>
         <el-aside width="200px"  style="border: 1px solid #eee"> <!--<el-tag type="info">门诊处方：</el-tag>-->
           <el-table
           :data="prescriptionList">
           <el-table-column
           width="25px"><el-checkbox></el-checkbox></el-table-column>
           <el-table-column
           label="名称"
           prop="prescriptionName">
           </el-table-column>
           <el-table-column
           label="状态"
           prop="prescriptionState">
           </el-table-column>
           </el-table>
         </el-aside>
         <el-main align="left">
           <el-tag>本处方金额合计：</el-tag>
           <el-tag type="warning">21.9元</el-tag>
           <el-table  :data="medicineList">
             <el-table-column
               width="25px"><el-checkbox></el-checkbox></el-table-column>
           <el-table-column
           label="药品名称"
           prop="medicineName">
           </el-table-column>
             <el-table-column
               label="规格"
               prop="specification">
             </el-table-column>
             <el-table-column
               label="单价"
               prop="singlePrice">
             </el-table-column>
             <el-table-column
               label="用法"
               prop="usage">
             </el-table-column>
             <el-table-column
               label="用量"
               prop="dosage">
             </el-table-column>
             <el-table-column
               label="频次"
               prop="times">
             </el-table-column>
             <el-table-column
               label="数量"
               prop="number">
             </el-table-column>
           </el-table>
         </el-main>
       </el-container>
     </el-main>

       <el-tabs type="border-card">
         <el-tab-pane label="处方模板">
           <el-container>
             <el-aside width="400px"  style="border: 1px solid #eee">
               <el-header>
               <el-row>
                 <el-col :span="4"><div class="grid-content ">名称：</div></el-col>
                 <el-col :span="12">
                   <div class="grid-content ">
                   <el-input v-model="searchTemplate" placeholder="请输入内容" width="50%">
                   </el-input>
                 </div>
                 </el-col>
                 <el-col :span="6"><div class="grid-content ">
                   <el-button type="primary">查询</el-button>
                 </div></el-col>
               </el-row>
               </el-header>
               <el-main>
                 <el-table :data="prescriptionTemplateList">
                   <el-table-column
                   label="模板名称"
                   prop="prescriptionTemplateName">
                   </el-table-column>
                   <el-table-column
                     label="范围"
                   prop="category">
                   </el-table-column>
                 </el-table>
               </el-main>

             </el-aside>
             <el-main align="left">

                <el-header>
                 <el-row>
                   <el-col :span="12"><div class="grid-content ">模板明细</div></el-col>
                   <el-col :span="12" align="right"><div class="grid-content "><el-button type="text">使用该模板</el-button></div></el-col>
                 </el-row>
                 <el-divider></el-divider>
               <el-table :data="templateDetailList">

                 <el-table-column
                   label="药品名称"
                 prop="templateMedicineName">
                 </el-table-column>
                 <el-table-column
                   label="规格"
                   prop="templateSpecification">
                 </el-table-column>
                 <el-table-column
                   label='单位'
                   prop="templateUnit">
                 </el-table-column>
                 <el-table-column
                   label="用法"
                   prop="templateUsage">
                 </el-table-column>
                 <el-table-column
                   label="用量"
                   prop="templateDosage">
                 </el-table-column>
                 <el-table-column
                   label="频次"
                   prop="templateTimes">
                 </el-table-column>

               </el-table>
                </el-header>
             </el-main>
           </el-container>
         </el-tab-pane>
         <el-tab-pane label="常用药品">常用药品</el-tab-pane>
         <el-tab-pane label="建议方案">建议方案</el-tab-pane>
         <el-tab-pane label="历史处方">历史处方</el-tab-pane>
       </el-tabs>

   </el-container>
</template>
<script>
    export default {
        data() {
          /** prescription **/
          let prescriptionName='';
          let prescriptionState='';
          let prescriptionList=[];
          /** **/

          /** prescriptionTemplateList **/
          let prescriptionTemplateList=[];
          let prescriptionTemplateName='';
          let category='';
          /** **/

          /** templateDetailList **/
          let templateDetailList=[];
          let templateMedicineName='';
          let templateSpecification='';
          let templateUnit='';
          let templateUsage=''; //用法
          let templateDosage = '';
          let templateTimes = '';


          /** **/
          /** medicine **/
          let medicineList= [];
          let medicineName='';
          let specification='';
          let singlePrice=0;
          let usage=''; //用法
          let dosage = '';
          let times = '';
          let number =0;
          /** **/
            return {
              prescriptionList:[{prescriptionName:'念珠菌性皮炎',prescriptionState:'已开立'}],
              medicineList:[{medicineName:'氯化钠',specification:'0.9g',singlePrice:6.34,usage:'静脉注射',dosage:'100 ml',times:'一日一次',number:1}],
              templateDetailList:[{templateMedicineName:'氯化钠',templateSpecification:'0.9g',
                                    templateUnit:'g',templateUsage:'静脉注射',templateDosage:'100 ml',templateTimes:'一日一次'}],
              prescriptionTemplateList:[{prescriptionTemplateName:'春季感冒',category:'全院'}],
              searchTemplate:''
            }
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
