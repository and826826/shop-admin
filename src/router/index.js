import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import welcome from '../components/welcome.vue'
import user from '../components/user/user.vue'
import formdata from '../components/data/form-data.vue'
import rolelist from '../components/permisson/role-list.vue'
import permissonlist from '../components/permisson/permisson-list.vue'
import goodlist from '../components/goods/goods-list.vue'
import sortparameter from '../components/goods/sort-parameter.vue'
import oderlist from '../components/order/order-list.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path:"/login",
      name:'Login',
      component:Login

    },
  {
    path: '/',
    redirect:'/login'
  },
  {
    path:'/home',
    component:Home,
    redirect:'/welcome',
    children:[
      {
        path:'/welcome',
        component:welcome
      },
      {
        path:'/users',
        component:user
      },

      {
        path:'/roles',
        component:rolelist

      },
      {
        path:'/rights',
        component:permissonlist
      },
      {
        path:'/goods',
        component:goodlist
        
      },
      {
        path:'/params',
        component:sortparameter
      },
     
      {
        path:'/categories',
        component:sortparameter

      },
      {
        path:'/orders',
        component:oderlist
      },
      {
        path:'/reports',
        component:formdata
      }


    ]
    
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//挂在路由导航守卫
router.beforeEach((to,from,next)=>{
  if(to.path=='/login'){
    return next();
    
  }
  const token=window.sessionStorage.getItem('token');
  if(!token){
    return next('/login')
  }
  next()

  
})

export default router
