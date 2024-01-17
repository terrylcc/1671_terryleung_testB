<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <ShippingFeeCalculator />
</template>

<script>
import ShippingFeeCalculator from './components/ShippingFeeCalculator.vue'

export default {
  name: 'App',
  components: {
    ShippingFeeCalculator
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
