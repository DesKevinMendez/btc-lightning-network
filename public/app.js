const Main = {
  template: '<div @click="click">Hellow from main</div>',
  setup() {
    const click = ()=>{
      console.log('Click');
    }
    return {click}
  }
}

const routes = [
  {
    path: "/",
    component: Main,
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
})

const app = Vue.createApp({})
app.use(router)
app.mount('#app')