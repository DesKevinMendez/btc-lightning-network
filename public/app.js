const vue = Vue;
const statusValidation = {
  template: `
    <div class="alert" :class="[status === 200 ? 'alert-success' : 'alert-danger']" role="alert">
      Nodo: {{ status === 200 ? 'activo' : 'inactivo' }}
    </div>
`,
  setup() {
    let status = vue.ref(404);

    vue.onMounted(async () => {
      const info = await axios.get('/api/v1/lnd/info');
      status.value = info.status;
    });
    return { status };
  }
};

const Main = {
  template: `
    <status-validation />
  `,
  components: {
    statusValidation
  },
  setup() {
    return {};
  }
};

const routes = [
  {
    path: '/',
    component: Main
  }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

const app = vue.createApp({});
app.use(router);
app.mount('#app');
