import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { router } from 'umi';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login(params, { call, put,select  }) {


      yield select(state => state.todos)

      // yield put({ type: 'getCaptcha' });
      // yield put({
      //   type: 'menu/test1',
      // });

      // props.dispatch('menu/test1', {})
      // console.log('params',params);
      // params.callback('测试>>>');
      // const response = yield call(fakeAccountLogin, payload);
      // yield put({
      //   type: 'changeLoginStatus',
      //   payload: response,
      // });
      // // Login successfully
      // if (response.status === 'ok') {
      //   router.push('/')
      //   callback('测试')
      // }
    },

    *getCaptcha({ payload }, { call }) {
        console.log('getCaptcha');
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      // reloadAuthorized();
      const { redirect } = getPageQuery();

      console.log('getPageQuery',getPageQuery());
      // redirect
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },



  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },

    test(){
      console.log('reducers-test')
    },
  },
};
