<template>

  <product-detail :is-edit="false" />
</template>

<script>
import ProductDetail from './components/ProductDetail'

export default {
  name: 'CreateProduct',
  components: { ProductDetail }
}
</script>

<style>
</style>
