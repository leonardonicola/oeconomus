<template>
  <q-page class="column justify-center items-center q-gutter-xl">
    <q-btn
      flat
      icon="dark_mode"
      size="xl"
      class="absolute-top-left"
      @click="$q.dark.toggle()"
    />
    <div class="text-h3 text-weight-bolder">Oeconomus</div>
    <div class="text-italic">your personal finance organization web app.</div>
    <q-form @submit="verifyLogin" class="q-gutter-md">
      <q-input
        filled
        v-model="email"
        label="Email"
        type="email"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Please type something',
          (val) =>
            (val &&
              val.match(
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/
              )) ||
            'Please type valid email',
        ]"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Password"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type your password',
        ]"
      />

      <div>
        <q-btn label="Login" type="submit" color="primary" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const router = useRouter()

const $q = useQuasar()
const user = useUserStore()

const email = ref('')
const password = ref('')

const verifyLogin = () => {
  if (email.value === user.email && password.value === user.password) {
    router.push('app')
  } else {
    $q.notify({
      type: 'warning',
      message: 'Wrong credentials',
    })
  }
}
</script>
