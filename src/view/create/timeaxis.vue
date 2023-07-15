<template>
    <div class="timeline">
        <div class="timeline-item" v-for="i in 10" :key="i">
            <div class="box img">
                <img :src="require('@/asset/image/icon/test2.png')" alt="">
                <span class="play" @click="toMap"></span>
            </div>
            
            <div class="box text">
                <p class="title">森林Party森林Party森林Party森林Party森林Party森林Party森林Party森林Party森林Party森林Party森林Party森林Party</p>
                <p class="updateTime">2023-01-01 10:30</p>
            </div>	
        </div>	
    </div>
</template>
<script>
// import {stuCreationTimeline} from '@/api'
export default {
    data(){
        return{
            stuCreationTimelineList:{}
        }
    },
    mounted () {
        // this.CreationTimeline()
    },
    methods:{
        toMap(){
            this.$router.push('/map')
        },
        // async CreationTimeline(){
        //     this.stuCreationTimelineList = await stuCreationTimeline('LY50351','10','1')
        // }
    }
}
</script>
<style lang="less">
.timeline {
    padding: 16px 12px ;
    .timeline-item{
        margin-bottom: 10px;
        
        &:nth-child(2n + 1){
            .img{
                float: left;
            }
            .text{
                margin-left: 23px;
            }
        }
        &:nth-child(2n){
            .img{
                margin-left: 23px;
            }
            .text{
                float: left;
                p{
                    text-align: right;
                }
            }
        }
        img{
            width: 160px;
            height: 160px;
            background: #FFFFFF;
            box-shadow: 0px 1px 8px 1px rgba(206,223,241,0.2);
            border-radius: 10px 10px 10px 10px;
            opacity: 1;
            border: 1px solid rgba(237,240,247,0.7);
        }
        .box{
            width: 160px;
            height: 160px;
            display: inline-block;
            position: relative;
            .play{
                display: inline-block;
                width: 20px;
                height: 20px;
                border-radius: 10px;
                background: url('../../asset/image/icon/card_icon_play@2x.png') no-repeat center center;
                background-size: 20px 20px;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: calc(100% - 10px);
            }
           
            p.title{
                font-size: 15px;
                font-weight: bold;
                color: #333333;
                line-height: 16px;
                margin-top: 59px;
                overflow:hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 3;
                display: -webkit-box;
                -webkit-box-orient: vertical;
            }
            p.updateTime{
                font-size: 12px;
                font-weight: 400;
                color: #666666;
                line-height: 16px;
                margin-top: 5px;
            }
        }
        
    }
}
</style>
