import request from "../utils/request";
// 课程详情接口
export const reqgetClassInfo = (data) => request({ 
    url:`/art/stuClient/getClassInfo`,
    method:'get',
    params: data
}) 
// 首页时光轴(分页)
export const reqhomePageTimeline = (data) => request({
    url:'/art/stuClient/homePageTimeline',
    method:'get',
    params: data
})
// 作品集查看详情
export const reqgetStuProductionSet = (productionSetId,data) => request({
    url:'/art/stuClient/getStuProductionSet',
    method:'POST',
    data:{productionSetId},
    
})
// 作品集保存
export const reqAddStuProductionSet = (data) => request({
    url:'/art/stuClient/addStuProductionSet',
    method:'post',
    data
})
// 创作时光轴（分页，iteach老师上传的作品）
export const reqStuCreationTimeline = (data) => request({
    url:'/art/stuClient/stuCreationTimeline',
    method:'get',
    params: data,
})
// 创作时光轴列信息详情
export const getStuCtreationProduction = (productionId,data) => request({
    url:'/art/stuClient/getStuCtreationProduction',
    method:'get',
    params:{productionId},
    data
})
// 新增动态创作
export const reqaddStuCreation = (data) => request({
    url:'/art/stuClient/addStuCreation',
    method:'post',
    data
})
// 动态创作保存（对新增的动态创作保存相关具体信息）
export const reqsaveCreationInfo = (data) => request({
    url:'/art/stuClient/saveCreationInfo',
    method:'post',
    data
})
// 动态创作详情
export const reqgetCreationInfo = (creationId,data) => request({
    url:'/art/stuClient/getCreationInfo',
    method:'get',
    params:{creationId},
    data
})
// 课程地图接口
export const classLessonMap = (cityId, classCode,data) => request({ 
    url:`/art/stuClient/classLessonMap`,
    method:'get',
    params:{cityId,classCode},
    data
}) 
// 腾讯云-获取临时key
export const getTempKey = () => request({ 
    url:`/tx/getTempKey`,
    method:'get',
}) 