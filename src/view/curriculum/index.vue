<template>
    <div class="curriculum-index">
        <div class="curriculum-picture" @click="$router.push('/map')">
            <!-- 做在图片上比较好 -->
            <span v-if="false" class="start">进入学习</span>
        </div>
        <div class="curriculum-info">
            <div class="base-info">
                <span class="chapter-count">已更新{{chaptersCount}}章</span>
                <span class="chapter-current">已学习到第{{currentChapter}}章</span>
                <span class="teacher-name">授课老师：{{teacherName}}</span>
            </div>
            <div class="chapter-info">
                <span>课程时间：{{courseTime}}</span>
            </div>
        </div>
        <div class="curriculum-tab">时光轴</div>
        <div class="curriculum-time-axis">
            <van-steps direction="vertical" :active="list.length - 1" >
                <van-step v-for="(item, index) in list" :key="index" >
                  <div class="list-item" @click="show = true">
                    <img :src="item.src || require('@/asset/image/icon/test2.png')">
                    <div class="list-item-info">
                        <p>{{item.time}}</p>
                        <p><span class="keynote">{{item.operation}}</span>了{{item.worksType}}《{{item.worksName}}》</p>
                    </div>
                  </div>
                </van-step>
            </van-steps>
        </div>
        <div class="curriculum-btn">
            <span class="btn btn-works" @click="toWorks">作品集</span>
            <span class="btn btn-works" @click="toCreate">动态创作</span>
        </div>
        <!-- 弹框 -->
        <van-popup class="van-popup-public" v-model="show">
            <popup-title @goBack="show = false"/>
            <p class="title">小小宇航员</p>
            <van-image src="/myqcloud/koolearn/template/2-海边度假风/content-10.jpg" radius="10"  width="269" height="377"/>
            <span class="btn-small" @click="save">保存相册</span>
            <popup-share class="share"/>
        </van-popup>
    </div>
</template>
<script>

export default {
    data() {
        return {
            courseName: '暑假AI课程班', // 课程名称
            teacherName: '周优秀', // 老师名称
            chaptersCount: 5, // 章节数
            currentChapter: 1, // 当前章节
            courseTime: '2023-07-01 ~ 2023-09-01',
            show: false,
            list: [
                {
                    src: '', // 图片地址
                    time: '2023-01-01 10:30', // 时间
                    worksType: '作品集', // 作品集/章节/作品等
                    worksName: '聪明的一休', // 作品名称
                    operation: '创建', // 操作的动作 创建/学习/DIY/专家点评了
                    id: '', // 模板id
                },
                {
                    src: '', 
                    time: '2023-01-01 10:30',
                    worksType: '作品集',
                    worksName: '聪明的一休',
                    operation: '创建',
                },
                {
                    src: '', 
                    time: '2023-01-01 10:30',
                    worksType: '作品集',
                    worksName: '聪明的一休',
                    operation: '创建',
                },
                {
                    src: '', 
                    time: '2023-01-01 10:30',
                    worksType: '作品集',
                    worksName: '聪明的一休',
                    operation: '创建',
                },
                {
                    src: '', 
                    time: '2023-01-01 10:30',
                    worksType: '作品集',
                    worksName: '聪明的一休',
                    operation: '创建',
                },
                {
                    src: '', 
                    time: '2023-01-01 10:30',
                    worksType: '作品集',
                    worksName: '聪明的一休',
                    operation: '创建',
                },
                {
                    src: '', 
                    time: '2023-01-01 10:30',
                    worksType: '作品集',
                    worksName: '聪明的一休',
                    operation: '创建',
                },
                {
                    src: '', 
                    time: '2023-01-01 10:30',
                    worksType: '作品集',
                    worksName: '聪明的一休',
                    operation: '创建',
                },
                {
                    src: '', 
                    time: '2023-01-01 10:30',
                    worksType: '作品集',
                    worksName: '聪明的一休',
                    operation: '创建',
                },
                {
                    src: '', 
                    time: '2023-01-01 10:30',
                    worksType: '作品集',
                    worksName: '聪明的一休',
                    operation: '创建',
                },
                {
                    src: '', 
                    time: '2023-01-01 10:30',
                    worksType: '作品集',
                    worksName: '聪明的一休',
                    operation: '创建',
                },
                {
                    src: '', 
                    time: '2023-01-01 10:30',
                    worksType: '作品集',
                    worksName: '聪明的一休',
                    operation: '创建',
                },
                {
                    src: '', 
                    time: '2023-01-01 10:30',
                    worksType: '作品集',
                    worksName: '聪明的一休',
                    operation: '创建',
                }
            ], // 时间轴数据列表
        }
    },
    components:{
    },
    methods: {
        // 去作品集
        toWorks() {
            this.$router.push('/template')
        },
        // 去创作
        toCreate() {
            this.$router.push('/timeaxis')
            // this.$router.push('/create')
        },
        save(){
            
        }
    }
}
</script>
<style lang="less" scoped>
@import './popup.less';
.curriculum-index {
    background: #f5f5f5;
    .curriculum-picture {
        height: 174px;
        width: 100%;
        margin: 0 auto;
        background: url('../../asset/image/icon/test.png');
        background-size: 100% 100%;
        .start{
            display: block;
            width: 30vw;
            height: 30px;
            line-height: 30px;
            background: #40d19a;
            color: #fff;
            margin: 0 auto;
        }
    }
    .curriculum-info {
        padding: 9px 16px 27px 16px;
        font-size: 13px;
        background: #f5f5f5;
        .base-info {
            margin-top: 0 !important;
            height: 22px;
            line-height: 22px;
            .course-name {

            }
            .teacher-name {
                color: #b1b1b1;
                float: right;
            }
            margin-top: 1vh;
            .chapter-count {
                color: #333;
                font-size: 15px;
            } 
            .chapter-current {
                margin-left: 20px;
                color: #F15B38;
            }
        }
        .chapter-info {
            margin-top: 1px;
            height: 17px;
            line-height: 17px;
            color: #ccc;
            font-size: 12px;
        }
    }
    .curriculum-tab{
        height: 20px;
        line-height: 20px;
        background: #f5f5f5;
        margin-bottom: 10px;
        &:before{
            float: left;
            content: '';
            width: 3px;
            height: 20px;
            background: #47d292;
            margin-right: 10px;
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;

        }
    }
    .curriculum-time-axis {
        overflow-y: auto;
        height: calc(100% - 280px);
        
        /deep/.van-steps{
            background: transparent;
            padding-bottom: 80px;
            .van-step__title{
                background: #ffffff;
                padding:10px;
                height: 68px;
                border-radius: 5px;
            }
            .van-step__circle-container{
                top: 50px;
                .van-step__circle{
                    background: #fe724e;
                    width: 6px;
                    height: 6px;
                }
            }
            .van-step__line{
                width: 2px;
                top: 50px;
                background: #e3e3e3;
                left: -16px;
            }
            .van-step--vertical{
                padding: 8px 16px 8px 7px;
            }
            .van-step:last-child{
                .van-step__line{
                    display: none;
                }
            }
        }
        .list-item {
            img {
                width: 68px;
                height: 68px;
                border-radius: 5px;
            }
            .list-item-info {
                display: inline-block;
                vertical-align: top;
                p {
                    padding: 0 10px;
                    color: #666666;
                    font-size: 12px;
                    font-weight: 400;
                }
                p:first-child{
                    height: 37px;
                    padding-top: 8px;
                    font-size: 15px;
                    font-weight: bold;
                    color: #333;

                }
                .keynote {
                    // color: red;
                }
            }
        }
    }
    .curriculum-btn {
        text-align: center;
        font-size: 16px;
        position: fixed;
        bottom: 25px;
        width: 100%;
        .btn-works {
           
            width: 156px;
            margin-left: 27px;
            float: left;
            &:first-child{
                margin-left: 18px;
            }
        }

    }
}

.share{
    position: fixed;
    bottom: 69px;
}

</style>
