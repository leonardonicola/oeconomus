const routes = [
  {
    path: '/',
    component: () => import('layouts/InitialLayout.vue'),
    children: [{ path: '', component: () => import('pages/Login.vue') }],
  },
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      //Novo componente dinâmico que pega as informações por rota!
      {
        path: ':expense',
        component: () => import('components/DynamicExpense.vue'),
      },
      {
        path: 'addexpense',
        component: () => import('components/AddExpense.vue'),
      },
      {
        path: 'addfunds',
        component: () => import('components/AddFunds.vue'),
      },
      {
        path: 'settings',
        component: () => import('components/UserSettings.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
