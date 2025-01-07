<template>
  <div>
    <input
      class="form-check-input"
      type="checkbox"
      value=""
      :id="'checkbox' + props.article.id"
    />
    <input class="form-check-label" :for="'checkbox' + props.article.id" v-model="articleName" />
    <!-- <label class="form-check-label" :for="'checkbox' + props.article.id">{{
      props.article.category
    }}</label> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  article: { type: Object },
})
const articleName = ref(props.article.name)
</script>

<style scoped>
</style>
