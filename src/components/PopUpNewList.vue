<template>
  <!-- Button trigger modal -->
  <button type="button" class="btn buttton" data-bs-toggle="modal" data-bs-target="#NewList">
    Neue Einkaufsliste
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="NewList"
    tabindex="-1"
    aria-labelledby="NewListLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content background">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="NewListLabel">Neue Einkaufsliste</h1>
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
            <input
              v-model="EinkaufslisteName"
              type="text"
              class="form-control"
              id="EinkaufslisteName"
              placeholder="Name"
            />
          </div>
          <div class="mb-3">
            <label for="EinkaufslisteDescription" class="form-label">Kurze Beschreibung</label>
            <input
              type="text"
              class="form-control"
              id="EinkaufslisteDescription"
              placeholder="Beschreibung"
              v-model="EinkaufslisteDescription"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="newList">
            Liste erstellen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useShoppingListStore } from '@/stores/ShoppingListStore'
import { ref } from 'vue'

const ShoppingList = useShoppingListStore()
const EinkaufslisteName = ref('')
const EinkaufslisteDescription = ref('')
function newList() {
  const neueList = {
    id: '',
    name: EinkaufslisteName,
    description: EinkaufslisteDescription,
    articles: [],
    date: new Date().toISOString(),
  }
  ShoppingList.newList(neueList)
}
</script>

<style scoped>
.buttton {
  background-color: #4b2637;
  color: #e9e3e3;
  transition: 0.5s;
}
.buttton:hover {
  background-color: #793b58;
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
