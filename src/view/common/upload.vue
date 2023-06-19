<template>
    <span>
        <span color="" native-type="file" @click="uploadFileClick" round >{{ btnText }}</span>
        <input type="file" style="display: none;" @change="uploadChange" class="file-select"/>
        
    </span>
</template>
<script>
export default {
    data() {
        return {
            popup: false, // 弹框
            name: '',
            cos: null,
            Bucket: 'pre-wall-e-1253017550', /* 存储桶 */
            Region: 'ap-nanjing',  /* 存储桶所在地域，必须字段 */
            // show: true,
            // value: '',
            list: null
        }
    },
    props:['btnText'],
    mounted () {
        
    },
    methods : {
        continueAction () {

        },
        confirm () {

        },
        exit () {

        },
        getCos () {
            this.$http.get('/api/v1/util/cos', {
                headers: {
                    Client: 'WALLE'
                }
            }).then (res => {
                console.log(res)
                /* eslint-disable */
                this.cos = new COS({
                    getAuthorization: function (options, callback) {
                        callback ({
                            TmpSecretId: res.data.credentials.tmpSecretId,
                            TmpSecretKey: res.data.credentials.tmpSecretKey,
                            SecurityToken: res.data.credentials.sessionToken,
                            StartTime: res.data.startTime,
                            ExpiredTime: res.data.expiredTime
                        })
                    }
                    
                });
            }).catch (() => {
                console.error('获取cos失败')
            })
        },
        // 上传文件
        uploadFileClick() {
            this.getCos();
            document.querySelectorAll('.file-select')[0].click();
        },
        // 上传
        uploadChange(events) {
            let that = this
            const files = events.currentTarget.files;
            const uploadFileList = [...files].map((file) => {
                const path = file.webkitRelativePath || file.name;
                return {
                Bucket: this.Bucket,
                Region: this.Region,
                Key: path,
                Body: file,
                }
            });
            console.log(this.cos)
            this.cos.uploadFiles({
                files: uploadFileList,
                SliceSize: 1024 * 1024 * 10,    /* 设置大于10MB采用分块上传 */
                onProgress: function (info) {
                    var percent = parseInt(info.percent * 10000) / 100;
                    var speed = parseInt(info.speed / 1024 / 1024 * 100) / 100;
                    console.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;');
                },
                onFileFinish: function (err, data, options) {
                    console.log(options.Key + '上传' + (err ? '失败' : '完成'));
                    that.$emit('callback',data)
                },
            }, (err,) => {
                if (err) {
                console.log('上传失败', err);
                return;
                }
                // 刷新列表前初始化
                this.hasMore = false;
                this.Marker = '';
            });
        }
    }
}
    
</script>
<style lang="less">
.create-index {
  .popup-modal {
    width: 80vw;
    height: 60vw;
    .popup-top {
      padding: 20px;
      border: 1px solid #f1f1f1;
      .popus-input {
        background: #f6f9fd;
        border-radius: 5px;
      }
    }
    .popup-bottom {
      padding: 20px;
      .popus-btn {
        width: 100%;
        background: linear-gradient(to right, #52d484, #29cfb8);
        border: none;
        color: #fff;
        border-radius: 20px;
        margin-bottom: 15px;
        &.continue {
            background: #fff;
            color: #29cfb8;
            border:1px solid #29cfb8;
        }
      }
      .popup-exit {
        display: block;
        font-size: 12px;
        color: #999;
        text-align: center;
        width: 100%;
        cursor: pointer;
      }
    }
  }
  .isNone {
        text-align: center;
        font-size: 12px;
        color:#666;
        background: #eee;
        height:100vh;
        .none-content{
            margin-top: 15px;
        }
        button {
            background: linear-gradient(to bottom, #52d484, #29cfb8);
            margin: 15px;
            padding: 0 20px;
            border:none
        }
    }
}
// .create-index {
//     position: relative;
    // width: 100vh;
    // height: 100vw;
    // margin-top: calc(-100vw - 46px);
    // transform: rotate(90deg);
    // transform-origin: bottom left;
    // .create-sidebar {
    //     position: absolute;
    //     bottom: 0;
    //     height: 44px;
    //     width: 100vh;
    //     background: #f2f2f2;
    // }
    // .create-btn {
    //     text-align: center;
    //     .btn-item {
    //         // transform: rotate(90deg);
    //         width: max-content;
    //     }
    // }
// }
</style>
