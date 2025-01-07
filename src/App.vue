<template>
  <div class="container text-center">
    <div class="row justify-content-center-md-center">
      <div class="col">
        <!-- <h1 class="h1">Einkaufsliste</h1> -->
      </div>
    </div>

    <div class="row justify-content-md-center">
      <div class="col-md-auto"><RouterView></RouterView></div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { useShoppingListStore } from './stores/ShoppingListStore'
import { useArticleStore } from './stores/Article'
const Einkaufsliste = useShoppingListStore()
const ArticelsStore = useArticleStore()
// import ShoppingListView from './views/ShoppingListView.vue'
onBeforeMount(async () => {
  const storedDataShoppingList = localStorage.getItem('ShoppingList')
  const storedDataArticels = localStorage.getItem('Articles')
  console.log(Einkaufsliste.getAllLists().length==0)
  if (Einkaufsliste.getAllLists().length==0) {
    try {
      const parsedDataA = JSON.parse(storedDataArticels)
      const parsedDataSL = JSON.parse(storedDataShoppingList)

      Einkaufsliste.setStore(parsedDataSL)
      ArticelsStore.setStore(parsedDataA)
      console.log('Daten wurden in den Store geladen xD')
    } catch (error) {
      console.log(error)
    }
  }
})
</script>

<style>
body {
  opacity: 1;
  background-image: linear-gradient(#0000003a 1px, transparent 1px),
    linear-gradient(to right, #0000003a 1px, #e9e3e3 1px);
  background-size: 20px 20px;
  color: #7d2941;
  background-color: #e9e3e3;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
    sans-serif;
}
</style>
