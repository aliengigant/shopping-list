<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <div class="d-flex">
      <input
        class="form-check-input me-1"
        type="checkbox"
        :id="'Check' + props.article.id"
        :checked="boughtCheck"
        @change="toggleBought"
      />
      <label class="form-check-label stretched-link" :for="'Check' + props.article.id">
        {{ props.article.name }}
      </label>
    </div>
    <span>{{ props.article.quantity }}</span>
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

const boughtCheck = ref(props.article.bought)

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

function toggleBought() {
  // Dies wird über das `watch` automatisch behandelt,
  // weil Änderungen an `boughtCheck` den Store aktualisieren.
  boughtCheck.value = !boughtCheck.value
}
</script>

<style scoped></style>
