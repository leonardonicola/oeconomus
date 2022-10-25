<template>
  <q-layout view="lHh Lpr lFf">
    <Header :toggle="leftDrawerOpen" @toggle-left-drawer="toggleDrawer" />

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      mini
      :mini-width="180"
      class="q-pa-lg"
    >
      <q-list class="row text-center">
        <q-item
          clickable
          v-ripple
          class="bg-purple-9 q-mb-lg col-12"
          style="border-radius: 20px"
        >
          <div class="q-px-sm q-py-lg text-body1 text-weight-bold text-white">
            + ADD EXPENSE
          </div>
        </q-item>

        <q-item
          clickable
          v-ripple
          class="bg-teal q-mb-lg col-12"
          style="border-radius: 20px"
        >
          <div class="q-px-sm q-py-lg text-body1 text-weight-bold text-white">
            + ADD <br />
            FUNDS
          </div>
        </q-item>

        <div class="text-h5 text-weight-bold q-mb-lg">
          Expenses per category
        </div>
        <q-item
          to="/app/health"
          active-class="bg-teal-1"
          style="border-radius: 15px"
          class="col-6 col-md-12 justify-center"
        >
          <div class="bg-teal-2" style="border-radius: 7px">
            <q-icon
              name="fas fa-heart"
              class="q-pa-md"
              color="teal"
              size="sm"
            />
          </div>
        </q-item>

        <q-item
          to="/app/essentials"
          active-class="bg-deep-purple-1"
          style="border-radius: 15px"
          class="col-6 col-md-12 justify-center"
        >
          <div class="bg-deep-purple-3" style="border-radius: 7px">
            <q-icon
              name="fas fa-shopping-bag"
              class="q-pa-md"
              color="deep-purple"
              size="sm"
            />
          </div>
        </q-item>
        <q-item
          to="/app/entertainment"
          active-class="bg-red-1"
          class="col-6 col-md-12 justify-center"
          style="border-radius: 15px"
        >
          <div class="bg-red-11" style="border-radius: 7px">
            <q-icon
              size="sm"
              name="fas fa-film"
              class="q-pa-md"
              color="red-13"
            />
          </div>
        </q-item>
        <q-item
          to="/app"
          exact
          active-class="bg-orange-1"
          class="col-6 col-md-12 justify-center"
          style="border-radius: 15px"
        >
          <div class="bg-orange-2" style="border-radius: 7px">
            <q-icon
              name="fas fa-chart-bar"
              size="sm"
              class="q-pa-md"
              color="orange"
            />
          </div>
        </q-item>
        <q-item
          to="/"

          active-class="bg-red-1"
          class="col-12 justify-center q-mt-xl"
          style="border-radius: 15px"
        >
          <div class="bg-red-2" style="border-radius: 7px">
            <q-icon
              name="fas fa-sign-out"
              size="sm"
              class="q-pa-md"
              color="red"
            />
          </div>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { useQuasar } from 'quasar';
import Header from 'src/components/Header.vue'

const toggleDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const $q = useQuasar()

onBeforeMount(() => {
  if($q.screen.lt.md){
    leftDrawerOpen.value = false
  }
})

const leftDrawerOpen = ref(true)
</script>
