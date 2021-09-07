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

const newCoffe = {
  template: `
  <form>
    <div class="form-group">
      <label for="name">Nombre</label>
      <input v-model="coffe.name" type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Digite nombre">
    </div>
    <div class="form-group">
      <label for="coffeInput">Café</label>
      <input v-model="coffe.type" type="text" class="form-control" id="coffeInput" placeholder="Tipo de café">
    </div>
    <button @click.prevent="saveCoffe" class="btn btn-primary">Guardar</button>
  </form>
  `,
  components: {
    statusValidation
  },
  setup() {
    const coffe = vue.ref({
      name: 'Kevin Méndez',
      type: 'Expreso'
    });

    const saveCoffe = async () => {
      const coffee = await axios.post('/api/v1/coffee', {
        ...coffe.value
      });
      console.log(coffee);
    };
    return { coffe, saveCoffe };
  }
};

const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/new-coffe',
    component: newCoffe
  }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

const app = vue.createApp({});
app.use(router);
app.mount('#app');
