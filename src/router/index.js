import Vue from 'vue'
import Router from 'vue-router'

const index = () => import("@/views/index")
const login = () => import("@/views/login")

const main=()=>import("@/views/one/main")
const menu=()=>import("@/views/one/menu")
const role=()=>import("@/views/one/role")
const user=()=>import("@/views/one/user")

const category=()=>import("@/views/two/category")

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: "/",
      component: index,
      children:[
        {
          path:"main",
          component:main
        },
        {
          path:"menu",
          component:menu
        },
        {
          path:"role",
          component:role
        },
        {
          path:"user",
          component:user
        },
        {
          path:"category",
          component:category
        },
        {
          path:"/",
          redirect:"/main"
        }
      ]
    },
    {
      path: "/login",
      component: login
    }
  ]
})

router.beforeEach((to,from,next)=>{
  if(localStorage.getItem("name")){
      if(to.path=="/login"){
        next(false)
      }else{
        next()
      }
  }else{
    if(to.path=="/login"){
      next()
    }else{
      next("/login")
    }
  }
})

export default router
