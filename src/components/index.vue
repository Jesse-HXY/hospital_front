<template>
    <el-container>
      <el-header>
        <span style="font-size:25px;font-weight: bold;font-family: 'STKaiti'">
          欢迎来到东软云医院
        </span>
      </el-header>
      <el-carousel indicator-position="outside" height="505px" style="width: 1370px;">
        <el-carousel-item v-for="picture in imageList" :key="picture">
          <el-image :src="picture"></el-image>
        </el-carousel-item>
      </el-carousel>
      <el-footer>

        <div>
              地　　址：
              浑南新区新秀街2号东软集团A9楼
          服务热线： 000-1234567
        <div>
            Copyright 2019 东软云医院 All Rights Reserved.
            <br/>
            辽ICP 备 012345678号-1 文保网安备案号：012345678 辽卫网审字【2019】第39号
        </div>
        </div>
      </el-footer>
    </el-container>
</template>

<script>
  import picture1 from '../assets/1.jpg'
  import picture2 from '../assets/2.jpg'
  import picture3 from '../assets/3.jpg'
  import picture4 from '../assets/4.jpg'
    export default {
        name: "index",
      data(){
          return{
            imageList:[],
            picture1:picture1,
            picture2:picture2,
            picture3:picture3,
            picture4:picture4
          }
      },created:function () {
        this.imageList.push(this.picture1)
        this.imageList.push(this.picture2)
        this.imageList.push(this.picture3)
        this.imageList.push(this.picture4)
      }
    }
</script>

<style scoped>

</style>
