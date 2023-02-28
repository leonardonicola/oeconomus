<template>
  <q-layout view="lHh Lpr lFf">
    <q-btn
      v-if="$q.screen.lt.md"
      flat
      icon="menu"
      size="xl"
      class="q-ma-md"
      @click="openDrawer"
    />
    <q-btn
      v-if="$q.screen.gt.sm"
      flat
      icon="dark_mode"
      size="xl"
      class="q-ma-md"
      @click="$q.dark.toggle()"
    />

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      side="right"
      mini
      :mini-width="180"
      class="q-pa-lg"
    >
      <q-list class="row text-center justify-center">
        <q-item
          clickable
          v-ripple
          class="bg-purple-9 q-mb-md col-12"
          :class="$q.screen.lt.md ? 'justify-center' : ''"
          style="border-radius: 20px"
          to="/addexpense"
        >
          <div class="q-px-sm text-body1 text-weight-bold text-white">
            + ADD <br />
            EXPENSE
          </div>
        </q-item>

        <q-item
          clickable
          v-ripple
          class="bg-teal q-mb-md col-12"
          :class="$q.screen.lt.md ? 'justify-center' : ''"
          style="border-radius: 20px"
          to="/addfunds"
        >
          <div class="q-px-sm text-body1 text-weight-bold text-white">
            + ADD <br />
            FUNDS
          </div>
        </q-item>
        <q-item style="border-radius: 15px" class="col-6 col-md-8 column">
          <q-btn
            to="/health"
            flat
            class="bg-teal-2"
            style="border-radius: 7px"
          >
            <q-icon name="favorite" class="q-py-sm" color="teal" size="sm" />
          </q-btn>
          <div class="text-weight-bold q-mt-sm">Health</div>
        </q-item>

        <q-item style="border-radius: 15px" class="col-6 col-md-8 column">
          <q-btn
            to="/essentials"
            flat
            class="bg-deep-purple-2"
            style="border-radius: 7px"
          >
            <q-icon
              name="shopping_basket"
              class="q-py-sm"
              color="deep-purple"
              size="sm"
            />
          </q-btn>
          <div class="text-weight-bold q-mt-sm">Essentials</div>
        </q-item>
        <q-item style="border-radius: 15px" class="col-6 col-md-8 column">
          <q-btn
            to="/entertainment"
            flat
            class="bg-red-2"
            style="border-radius: 7px"
          >
            <q-icon
              name="confirmation_number"
              class="q-py-sm"
              color="red-13"
              size="sm"
            />
          </q-btn>
          <div class="text-weight-bold q-mt-sm">Entertainment</div>
        </q-item>
        <q-item style="border-radius: 15px" class="col-6 col-md-8 column">
          <q-btn to="/" flat class="bg-orange-2" style="border-radius: 7px">
            <q-icon name="home" class="q-py-sm" color="orange" size="sm" />
          </q-btn>
          <div class="text-weight-bold q-mt-sm">Home</div>
        </q-item>
        <q-item style="border-radius: 15px" class="col-6 col-md-8 column">
          <q-btn
            to="/settings"
            flat
            class="bg-blue-grey-2"
            style="border-radius: 7px"
          >
            <q-icon
              name="settings"
              class="q-py-sm"
              color="blue-grey-8"
              size="sm"
            />
          </q-btn>
          <div class="text-weight-bold q-mt-sm">Settings</div>
        </q-item>
      </q-list>
      <div
        v-if="$q.screen.lt.md"
        :class="$q.dark.isActive ? 'bg-white' : 'bg-black'"
        class="row justify-center q-mt-xl items-center q-pa-md"
        style="border-radius: 15px"
        @click="$q.dark.toggle()"
      >
        <q-icon
          flat
          name="dark_mode"
          size="lg"
          class="q-mr-md"
          :color="$q.dark.isActive ? 'black' : 'white'"
        />
        <div
          :class="$q.dark.isActive ? 'text-black' : 'text-white'"
          class="text-body1"
        >
          Toggle dark mode
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { useQuasar } from 'quasar'

const leftDrawerOpen = ref(true)

const $q = useQuasar()

onBeforeMount(() => {
  if ($q.screen.lt.md) {
    leftDrawerOpen.value = false
  }
})

function openDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
