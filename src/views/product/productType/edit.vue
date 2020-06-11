<template>

  <product-type-detail :is-edit="true" />
</template>

<script>
import ProductTypeDetail from './components/ProductTypeDetail'

export default {
  name: 'EditProduct',
  components: { ProductTypeDetail }
}
</script>

<style>
</style>
