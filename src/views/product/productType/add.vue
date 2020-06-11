<template>

  <product-type-detail :is-edit="false" />
</template>

<script>
import ProductTypeDetail from './components/ProductTypeDetail'

export default {
  name: 'CreateProduct',
  components: { ProductTypeDetail }
}
</script>

<style>
</style>
