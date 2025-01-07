<template>
  <a href="/">Hauptseite</a>

  <PopUpNewArticle></PopUpNewArticle>
  <ul class="list-group">
    <div class="container">
      <div class="row">
        <div class="col">
          <h2 class="display-2">Essen</h2>
          <div style="overflow-y: scroll; height: 600px">
            <li v-for="articel in FoodArticle" :key="articel.id" class="list-group-item">
              <ArticleListItem :article="articel"></ArticleListItem>
            </li>
          </div>
        </div>
        <div class="col">
          <h2 class="display-2">Getränke</h2>
          <input v-model="searchedDrink" type="text" id="Search" onkeyup="searchDrinks" placeholder="Suche nach..." title="Suche nach...">
          <div style="overflow-y: scroll; height: 600px">
            <li v-for="articel in DrinkArticle" :key="articel.id" class="list-group-item">
              <ArticleListItem :article="articel"></ArticleListItem>
            </li>
          </div>
        </div>
      </div>
    </div>
  </ul>
</template>

<script setup>
import { useArticleStore } from '@/stores/Article'
import { computed, ref } from 'vue'
import ArticleListItem from './ArticleListItem.vue'
import PopUpNewArticle from './PopUpNewArticle.vue'

//Store Definierungne
const ArticelStore = useArticleStore()

//Variablen und Konstanten
const FoodArticle = computed(() => ArticelStore.getFoodArticles)
const DrinkArticle = computed(() => ArticelStore.getDrinkArticles)
const searchedDrink = ref("")

// //Funktionen
// function deleteArticle(id) {
//   ArticelStore.deleteArticle(id)
// }
</script>

<style scoped>
.choosenItem {
  border-radius: 10px;
  margin: 0.5rem;
  padding: 0.9rem;
  background-color: #b3a2a2;
  color: #4b2637;
  transition: 0.5s;
}
.choosenItem:hover {
  background-color: rgba(125, 41, 65, 1);
  color: #e9e3e3;
}
</style>
