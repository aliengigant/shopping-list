<template>
  <!-- Button trigger modal -->
  <button type="button" class="btn buttton" data-bs-toggle="modal" data-bs-target="#NewArticle">
    Neuer Artikel
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="NewArticle"
    tabindex="-1"
    aria-labelledby="NewArticleLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content background">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="NewArticleLabel">Neuer Artikel</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="ArticleName" class="form-label">Name des Artikels</label>
            <input
              v-model="ArticleName"
              type="text"
              class="form-control"
              id="ArticleName"
              placeholder="Name"
            />
          </div>
          <div class="mb-3">
            <label for="Category" class="Label">Such dir eine Kategorie aus:</label>
            <div id="Category" class="dropdown">
              <select
                v-model="ChoosedCategory"
                class="form-select"
                aria-label="Default select example"
              >
                <option v-for="cat in ArticleCategory" :key="cat">
                  {{ cat.name }}
                </option>
              </select>
            </div>
          </div>
          <div v-for="(group, index) in GroupedCategories" :key="index">
            <ul class="list-group list-group-horizontal">
              <li
                class="list-group-item list-group-item-action"
                :class="{ active: activeID === caten.id }"
                :id="caten.id"
                v-for="caten in group"
                :key="caten.id"
                @click="saveActive(caten.id)"
              >
                {{ caten.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="addArticel()"
          >
            Artikel hinzufügen
          </button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useArticleStore } from '@/stores/Article'
import { computed, ref } from 'vue'

const ArticleList = useArticleStore()
const ArticleCategory = [{ name: 'Essen' }, { name: 'Getränk' }]
const ArticleName = ref('')
const ChoosedCategory = ref('')
const activeID = ref('')
const CategoryList = computed(() => {
  return ChoosedCategory.value == 'Essen'
    ? ArticleList.getFoodList
    : ChoosedCategory.value == 'Getränk'
      ? ArticleList.getDrinkList
      : []
})
const GroupedCategories = computed(() => {
  const result = []
  for (let i = 0; i < CategoryList.value.length; i += 3) {
    result.push(CategoryList.value.slice(i, i + 3))
  }
  return result
})
function addArticel() {
  const newData = {
    id: ArticleList.getArticels.length,
    name: ArticleName.value,
    category: ChoosedCategory.value,
    subCategory: ArticleList.getCat(ChoosedCategory.value, activeID.value),
    bought: false,
  }
  ChoosedCategory.value = null
  ArticleName.value = null
  activeID.value = null
  ArticleList.newArticle(newData)
}
function saveActive(id) {
  activeID.value = id
}
</script>

<style scoped>
.buttton {
  background-color: #4b2637;
  color: #e9e3e3;
  transition: 0.5s;
  margin: 10px;
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
