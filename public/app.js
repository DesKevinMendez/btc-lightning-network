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

const coffeList = {
  template: `
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Café</th>
        <th scope="col">Total pagar</th>
        <th scope="col">Pagado</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(coffe, index) in coffees" :key="coffe.id">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ coffe.name }}</td>
        <td>{{ coffe.content }}</td>
        <td>{{ coffe.tokens }}</td>
        <td>{{ coffe.paid ? 'Pagado' : 'Pendiente' }}</td>
        <td><button @click="payInvoice(coffe.request, coffe.tokens)" type="button" class="btn btn-primary">Pagar</button></td>
      </tr>
    </tbody>
  </table>
`,
  setup() {
    let coffees = vue.ref([]);

    const getCoffees = async () => {
      const info = await axios.get('/api/v1/coffee');
      coffees.value = info.data.data.coffees;
    }

    vue.onMounted(async () => {
      await getCoffees();
    });

    const payInvoice = (request, tokens) => {
      axios
        .post('/api/v1/coffee/pay', {
          request,
          tokens
        })
        .then((res) => {
          getCoffees()
        });
    };

    return { coffees, payInvoice };
  }
};

const Main = {
  template: `
    <status-validation />
    <coffe-list/>
  `,
  components: {
    statusValidation,
    coffeList
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
      <label for="content">Café</label>
      <input v-model="coffe.content" type="text" class="form-control" id="content" placeholder="Tipo de café">
    </div>
    <div class="form-group">
      <label for="price">Total a pagar</label>
      <input v-model.number="coffe.tokens" type="number" class="form-control" id="price" placeholder="Precio en satoshis">
    </div>
    <button @click.prevent="saveCoffe" class="btn btn-primary">Guardar</button>
  </form>
  <div v-if="invoice.hasOwnProperty('id')" class="jumbotron jumbotron-fluid my-4">
    <div class="container">
      <h3 class="display-4">Orden: {{ invoice.name }} - {{ invoice.content }}</h3>
      <p class="lead">
        <pre>
          {{invoice}}
        </pre>
      </p>
    </div>
  </div>
  `,
  components: {
    statusValidation
  },
  setup() {
    const coffe = vue.ref({
      name: 'Kevin Méndez',
      content: 'Expreso',
      tokens: 100
    });

    const invoice = vue.ref({});

    const saveCoffe = () => {
      axios
        .post('/api/v1/coffee', {
          ...coffe.value
        })
        .then((res) => {
          coffe.value.name = '';
          coffe.value.content = '';
          coffe.value.tokens = '';
          invoice.value = res.data.data;
        });
    };

    return { coffe, saveCoffe, invoice };
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
