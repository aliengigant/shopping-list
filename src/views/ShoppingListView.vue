<!-- Übersicht aller Listen -->
<template>
  <div class="displayTitel">
    <h1 class="display-1">Einkaufsliste</h1>
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="list-group">
            <div
              class="card-container"
              v-for="list in ShoppingList.getAllLists()"
              :key="list.id"
              @mouseover="setHoveredList(list.id)"
              @mouseleave="setHoveredList(null)"
            >
              <a
                :href="'detail/' + list.id"
                class="list-group-item list-group-item-action d-flex m-2 cardBackground"
                aria-current="true"
              >
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">{{ list.name }}</h5>
                </div>
                <span
                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill backgroundColorNotification"
                  >{{ list.articles.length }}</span
                >
                <p class="mb-1">{{ list.description }}</p>
              </a>
              <transition name="slide-fade">
                <button
                  v-show="hoveredList === list.id"
                  class="hover-button"
                  @click="deleteList(list.id)"
                >
                  Löschen
                </button>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <PopUpNewList></PopUpNewList>
      <a href="/AllArticles">Alle Artikeln</a>
    </div>
  </div>
</template>

<script setup>
import PopUpNewList from '@/components/PopUpNewList.vue'
import { useShoppingListStore } from '@/stores/ShoppingListStore'
import { ref } from 'vue'

const ShoppingList = useShoppingListStore()
const hoveredList = ref(null)

const setHoveredList = (id) => {
  hoveredList.value = id
}
function deleteList(ListId) {
  ShoppingList.deleteList(ListId)
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
.backgroundColorNotification {
  background-color: #4b2637;
}
.cardBackground {
  /* From https://css.glass */
  background: #b3a2a2;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(125, 41, 65, 0.774);
  color: #4b2637;
  transition: 0.5s;
}
.cardBackground:hover {
  background: rgba(125, 41, 65, 1);
  color: #e9e3e3;
}
.hover-button {
  position: absolute;
  right: -100px;
  bottom: 20px; /* Anpassen je nach Buttonhöhe */
  transition: all 0.3s ease;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(125, 41, 65, 0.774);
  background-color: #4b2637;
  color: #b3a2a2;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
.card-container {
  position: relative;
  display: inline-block;
}
</style>
