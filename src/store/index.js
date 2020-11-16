import Vue from 'vue';
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'
import {Message} from 'element-ui'
Vue.use(Vuex)

let store=new Vuex.Store({
    state:{
        name:localStorage.getItem("name")?JSON.parse(localStorage.getItem("name")):{}
    },
    getters:{
        username(state){
            return state.name.username
        },
        menus(state){
            return state.name.menus
        }
    },
    mutations:{
        setname(state,res){
            state.name=res
        },
        logout(state){
            localStorage.clear();
            state.name={};
            router.replace("/login")
        }
    },
    actions:{
        login(context,formdata){
            axios.post("/api/userlogin",formdata).then((res)=>{
                if(res.data.code==200){
                    console.log(res);
                    localStorage.setItem("name",JSON.stringify(res.data.list))
                    context.commit("setname",res.data.list)
                    router.replace("/")
                }else{
                    Message.error(res.data.msg); 
                }
            })
        }
    }
})
export default store