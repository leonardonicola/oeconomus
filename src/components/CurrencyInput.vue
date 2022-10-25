<template>
  <q-input ref="inputRef" dense v-model="formattedValue" outlined lazy-rules :rules="[() => props.modelValue > 0 || 'Insert a value']"/>
</template>

<script setup>
import { useCurrencyInput } from 'vue-currency-input'
import { watch } from 'vue'

const props = defineProps({
  modelValue: Number,
  options: Object,
})

const { inputRef, formattedValue, setValue } = useCurrencyInput(props.options)
watch(
  () => props.modelValue,
  (value) => {
    setValue(value)
  }
)
</script>
