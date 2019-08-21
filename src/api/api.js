import axios from 'axios';
import qs from 'qs'
let base = 'http://106.12.76.69:8060'
let base_2 = 'http://106.12.76.69:8062'


//登录
export const login = (params) => { return axios.post(`${base}/user/login`, params) };

//首页
export const Layouts = (params) => { return axios.get(`${base}/resource/selectByUserId`, { params: params }) };
//机构管理
// let base = 'http://192.168.0.105:8060/organization';
export const select_organizationName = (params) => { return axios.get(`${base}/organization/queryOrgInfoByUserId`, { params: params }) };

export const selectAll = (params) => { return axios.get(`${base}/organization/selectAll`, { params: params }) };

export const edit = params => {
  return axios.put(`${base}/organization/updateOrganization`, params, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
};

export const add = params => { return axios.post(`${base}/organization/insertOrganization`, params) };

export const remove = params => { return axios.delete(`${base}/organization/deleteOrganization`, { params: params }); };

//用户管理
export const User_selectAll = (params) => { return axios.get(`${base}/user/page`, { params: params }) };

export const User_edit = params => {
  return axios.post(`${base}/user/edit`, params, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
};

export const User_add = params => { return axios.post(`${base}/insertOrganization`, Object.values(params)[0]) };

export const User_remove = params => { return axios.get(`${base}/user/delete`, { params: params }); };

//给用户添加角色
export const add_User_role = params => { return axios.post(`${base}/user/insertUserRole`,  params); };

//角色管理
export const Role_selectAll = (params) => { return axios.get(`${base}/role/selectAll`, { params: params }) };

export const Role_add = params => { return axios.post(`${base}/role/insertRole`, params) };

export const Role_edit = params => {
  return axios.put(`${base}/role/updateRole`, params, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
};
export const Role_remove = params => { return axios.delete(`${base}/role/deleteRole`, { params: params }); };

//权限分配
export const Auth_selectAll = (params) => { return axios.get(`${base}/resource/selectAll`, { params: params }) };

export const Auth_commit = params => { return axios.get(`${base}/roleResource/insert`, { params: params }) };

// 资产台账
export const ZC_selectAll = (params) => { return axios.get(`${base_2}/assets/selectAll`, { params: params }) };
export const ZC_remove = params => { return axios.delete(`${base_2}/assets/deleteById`, { params: params }); };
export const ZC_edit = params => {
  return axios.put(`${base_2}/assets/updateAssets`, params, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
};
export const ZC_add = params => { return axios.post(`${base_2}/assets/insertAssets`, params) };

// 机柜管理
export const JG_selectAll = (params) => { return axios.get(`${base_2}/equipMent/selectAll`, { params: params }) };
export const JG_remove = params => { return axios.delete(`${base_2}/equipMent/deleteById`, { params: params }); };
export const JG_edit = params => {
  return axios.put(`${base_2}/equipMent/updateEquipMentModules`, params, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
};
export const JG_add = params => { return axios.post(`${base_2}/equipMent/insertModule`, params) };

//资产历史
export const History_selectAll = (params) => { return axios.get(`${base_2}/assets/selectAssetsHistory`, { params: params }) };


//资产统计
export const Count_selectAll = (params) => { return axios.get(`${base_2}/assets/selectAssetsManage`, { params: params }) };

//资产盘点
export const Check_selectAll = (params) => { return axios.get(`${base_2}/assetsCheck/selectCheck`, { params: params }) };

export const Check_insert = (params) => { return axios.post(`${base_2}/assetsCheck/insertCheck`, { params: params }) };


//资产盘点下的详情查询
export const Details_selectAll = (params) => { return axios.get(`${base_2}/assetsCheck/selectDetail`, { params: params }) };

//资产警告
export const Warning_selectAll = (params) => { return axios.get(`${base_2}/assets/getAlarmInfo`, { params: params }) };
//告警信息改变状态
export const change_status = (params) => { return axios.put(`${base_2}/assets/updateStatus`, params) };

//首页铃铛告警接口
export const alarm_selectAll = (params) => { return axios.get(`${base_2}/assets/selectList`) };

export const alarm_selectAll_comein = (params) => { return axios.get(`${base_2}/assets/selectAllCount`) };

export const alarm_update = (params) => { return axios.get(`${base_2}/assets/updateSign`, { params: params }) };


//权限分配
// export const Auth_selectAll = (params) => { return axios.get(`${base_2}/assets/getAlarmInfo`, { params: params }) };

//资产监控
//sockjs接口
export const url = `http://192.168.0.112/sock-js?equipModuleId`
//默认查询
export const ZCJK_selectAll = (params) => { return axios.get(`${base_2}/equip/info?equipModuleId=16`, { params: params }) };
//动态查询
export const Action_selectAll = (params) => { return axios.get(`${base_2}/equip/info?equipModuleId=${params}`) };

//查询数据中心
export const Data_selectAll = (params) => { return axios.get(`${base_2}/equipArea/nav`, { params: params }) };
//查询机柜总数
export const Cabinet_selectAll = (params) => { return axios.get(`${base_2}/equip/count`, { params: params }) };


//区域查询
export const Area_selectAll = (params) => { return axios.get(`${base_2}/areaManage/getAreaDate`, { params: params }) };

export const Area_delete = (params) => { return axios.delete(`${base_2}/areaManage/deleteById`, { params: params }) };

export const Area_add = (params) => { return axios.post(`${base_2}/areaManage/insertAreaDate`, params) };
export const Area_edit = (params) => {
  return axios.put(`${base_2}/areaManage/updateAreaMapsDate`, qs.stringify(params), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
};


//区域导航部分添加时查询数据中心
export const dbCenter_selectAll = (params) => { return axios.get(`${base_2}/areaManage/getAreaManageDate`, { params: params }) };

export const dbCenter_selectAll_s = (params) => { return axios.get(`${base_2}/areaManage/queryAreaMapsDate`, { params: params }) };

export const dbCenter_delete = (params) => { return axios.delete(`${base_2}/areaManage/deleteAreaMapsDate`, { params: params }) };

export const dbCenter_add = (params) => { return axios.post(`${base_2}/areaManage/insertAreaMapsDate`, params) };

export const dbCenter_edit = (params) => { return axios.put(`${base_2}/areaManage/updateDAreaMapsDate`, params) };

//项目管理立项报表查询
export const project_select = (params) => { return axios.get(`${base_2}/item/list?page=1`, params) };

//处理权限
export const distr_anth = (res) => {
  res = res || []
  let obj_0 = {}
  let obj_1 = {}
  let obj_2 = {}
  let arr_0 = []
  let arr_1 = []
  let arr_2 = []
  res.map(v => {
    // console.log(v)
    v.parentId = String(v.parentId)
    //提取一级菜单
    if (v.parentId.length==1) {
      let key = v.name
      obj_0[key] = v.parentId      
    }
    //提取二级菜单
    if (v.parentId.length == 2) {
      let key = v.name
      obj_1[key] = v.parentId      
    }
    //提取按钮
    if (v.parentId.length == 3) {
      let key = v.name;
      if(obj_2[key]) {
        obj_2[key+"_"+v.parentId] = v.parentId
      }else{
        obj_2[key] = v.parentId 
      }     
    }
  })
  arr_0.push(obj_0)
  arr_1.push(obj_1)
  arr_2.push(obj_2)
  console.log(arr_0, arr_1, arr_2)
  //将分别取出的再进行匹配
  for ( let key_0 in arr_0[0]) {
    let len_0 = arr_0[0][key_0]
    for (let key_1 in arr_1[0]) {
      let len_1 = arr_1[0][key_1]
      if (parseInt(len_1/10) == len_0) {
        arr_0[0][key_0] += key_1
      }
      for (let key_2 in arr_2[0]) {
        let len_2 = arr_2[0][key_2] 
        //计算按钮是否在二级菜单下
        if (parseInt(len_2/10)==len_1) {
          arr_1[0][key_1] += key_2//将按钮放入二级
        }
      }
    }
  }
  arr_0.push(arr_1[0])
  return (arr_0)
}
