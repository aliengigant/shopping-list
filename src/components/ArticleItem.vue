<template>
  <li
    @mouseover="setHoverArticle(props.article.id)"
    @mouseleave="setHoverArticle(null)"
    class="list-group-item d-flex justify-content-between align-items-center articleItem"
  >
    <div class="d-flex">
      <input
        class="form-check-input me-1"
        type="checkbox"
        :id="'Check' + props.article.id"
        :checked="boughtCheck"
        @change="toggleBought"
      />
      <label class="form-check-label" :for="'Check' + props.article.id">
        {{ props.article.name }}
      </label>
    </div>
    <input class="quantityInput" v-model="quantity" type="number" />
    <transition name="slide-fade">
      <button
        v-show="hoveredArticle === props.article.id"
        class="btn btn-success hover-button"
        @click="deleteArticle(props.article.id)"
      >
      <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
    </transition>
  </li>
</template>

<script setup>
import { useShoppingListStore } from '@/stores/ShoppingListStore'
import { watch, ref, onMounted } from 'vue'

const Einkaufsliste = useShoppingListStore()
const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
  listID: {
    type: Number,
    required: true,
  },
})
const hoveredArticle = ref(null)
const boughtCheck = ref(props.article.bought)
const quantity = ref(props.article.quantity)

// Wenn die Komponente gemountet wird, den neuesten Wert aus dem Store holen
onMounted(() => {
  boughtCheck.value = props.article.bought
})

// Beobachte Änderungen an `boughtCheck` und aktualisiere den Store
watch(boughtCheck, () => {
  // Rufe `boughtTrigger` auf, um den Wert im Store zu ändern
  Einkaufsliste.boughtTrigger(props.listID, props.article.id)
  Einkaufsliste.saveToLocalStorage()
})
watch(quantity, () => {
  Einkaufsliste.changeQuantity(props.listID, props.article.id, quantity)
  Einkaufsliste.saveToLocalStorage()
})

function toggleBought() {
  // Dies wird über das `watch` automatisch behandelt,
  // weil Änderungen an `boughtCheck` den Store aktualisieren.
  boughtCheck.value = !boughtCheck.value
}
function setHoverArticle(id) {
  hoveredArticle.value = id
}
function deleteArticle(id) {
  Einkaufsliste.deleteArticleFromList(props.listID, id)
}
</script>

<style scoped>
.quantityInput {
  height: align-self;
  width: 18%;
}
.articleItem {
  background: #b3a2a2;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgb(0, 0, 0);
  color: #4b2637;
  margin: 5px;
  transition: 0.5s;
}
.articleItem:hover {
  background: rgba(125, 41, 65, 1);
  color: #e9e3e3;
}
.hover-button {
  position: absolute;
  right: -50px;
  bottom: 5px; /* Anpassen je nach Buttonhöhe */
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
</style>
