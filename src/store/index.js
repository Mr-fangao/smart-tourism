import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // 定义一个name，以供全局使用
        name: '张三',
        // 定义一个number，以供全局使用
        number: 0,
        // 定义一个list，以供全局使用
        alldatacount: {
            scenic:'',
            comment:'',
            travels:'',
        }
    },
    mutations: { // 增加nutations属性
        setAlldatacount(state,num) {  // 增加一个mutations的方法，方法的作用是让num从0变成5，state是必须默认参数
            state.alldatacount.scenic = num.scenic;
            state.alldatacount.comment = num.comment;
            state.alldatacount.travels = num.travel;
        }
    },
});

export default store;