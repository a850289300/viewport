<template>
    <div>

        <p class="bg"></p>
        <p class="text">请选择一副个人作品，开始创作</p>
        <p class="btn-line"><span class="btn-small btn-upload">上传作品</span></p>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.bg{
    width: 100%;
    height: 81px;
    background:url('../../asset/image/icon/empty.png') no-repeat center center;
    background-size: 102px 81px;
    margin-top: 201px;
}
.text{
    font-size: 14px;
    font-weight: normal;
    color: #999999;
    margin-top: 19px;
    margin-bottom: 21px;
    text-align: center;
}
.btn-line{
    text-align: center;
}
.btn-small.btn-upload{
    width: 100px;
    font-size: 14px;
    height: 34px !important;
    line-height: 34px !important;
    margin:0;
}
</style>
