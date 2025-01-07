<!-- Einzelne Liste mit Artikeln anzeigen und verwalten -->
<template>
  <a href="/" class="btn backButton">Zurück</a>
  <PopUpNewArticle></PopUpNewArticle>
  <!-- Button trigger modal -->
  <button type="button" class="btn buttton" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Bearbeiten
  </button>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content background">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Einkaufsliste Bearbeiten</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="EinkaufslisteName" class="form-label">Name der Einkaufsliste</label>
            <input type="text" class="form-control" id="EinkaufslisteName" v-model="name" />
          </div>
          <div class="mb-3">
            <label for="EinkaufslisteDescription" class="form-label">Kurze Beschreibung</label>
            <input
              type="text"
              class="form-control"
              id="EinkaufslisteDescription"
              placeholder="Beschreibung"
              v-model="description"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="changeListAttributes"
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="displayTitel">
    <h1 class="display-1">{{ Einkaufsliste.name }}</h1>
    <h3 class="h3">{{ Einkaufsliste.description }}</h3>
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Artikeln
      </button>
      <ul class="dropdown-menu" style="overflow-y: scroll; height: 600px">
        <li v-for="item of articel" :key="item.id">
          <a class="dropdown-item" @click.prevent="selectedItem(item)" href="#">{{ item.name }}</a>
        </li>
      </ul>
    </div>
    <ul class="list-group">
      <ArticleItem
        v-for="article in Einkaufsliste.articles"
        :key="article.id"
        :article="article"
        :list-i-d="Einkaufsliste.id"
      ></ArticleItem>
    </ul>
  </div>

</template>

<script setup>
import ArticleItem from '@/components/ArticleDetailItem.vue'

import PopUpNewArticle from '@/components/PopUpNewArticle.vue'
import { useArticleStore } from '@/stores/Article'
import { useShoppingListStore } from '@/stores/ShoppingListStore'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const ShoppingListStore = useShoppingListStore()
const ArticelStore = useArticleStore()
const Einkaufsliste = ShoppingListStore.getListById(route.params.id)

const name = ref(Einkaufsliste.name)
const description = ref(Einkaufsliste.description)

const articel = ref(ArticelStore.getArticels)
function changeListAttributes() {
  ShoppingListStore.changeListAttributes(Einkaufsliste.id, name.value, description.value)
}
function selectedItem(item) {
  ShoppingListStore.newArticle(Einkaufsliste.id, item)
}
</script>

<style scoped>
.displayTitel {
  border: #0000006e 10px solid;
  background: rgba(125, 41, 65, 0.35);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2.5px);
  -webkit-backdrop-filter: blur(2.5px);
  border: 1px solid rgba(125, 41, 65, 0.3);
  color: #000000;
  margin-block-start: 100px;
  margin-block-end: 10px;
  padding: 10px;
  padding-block-start: 10px;
  padding-block-end: 50px;
  padding-left: 100px;
  padding-right: 100px;
}
.buttton {
  background-color: #7d2941;
  color: #e9e3e3;
  transition: 0.5s;
  position: fixed;
  right: 200px;
  top: 10px;
  border: 1px;
}
.backButton {
  background-color: #7d2941;
  color: #e9e3e3;
  transition: 0.5s;
  position: fixed;
  left: 200px;
  top: 10px;
  border: 1px;
}
.buttton:hover {
  background-color: #4b2637;
}

.background {
  background: rgba(125, 41, 65, 0.35);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.5px);
  -webkit-backdrop-filter: blur(5.5px);
  border: 1px solid rgba(125, 41, 65, 0.3);
  color: #e9e3e3;
}
</style>
