import Vue from 'vue'
import VueRouter from 'vue-router'

const Home=()=>import('views/home/Home.vue')
const Category=()=>import('views/category/Category.vue')
const ShopCart=()=>import('views/shopcart/ShopCart.vue')
const Profile=()=>import('views/profile/Profile.vue')
const Detail=()=>import('views/detail/Detail.vue')
const Login=()=>import('views/profile/Login.vue')
const Register=()=>import('views/profile/Register.vue')
Vue.use(VueRouter)

const routes=[
    {
      path:'/',
      redirect: '/home'
    },
    {
      path:'/home',
      component:Home
    },
    {
      path:'/category',
      component:Category
    },
    {
      path:'/shopcart',
      component:ShopCart
    },
    {
      path:'/profile',
      component:Profile
    },
    {
      path:'/detail/:iid',
      component:Detail
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/register',
      component:Register
    }
]

const router=new VueRouter({
  routes,
})

export default router