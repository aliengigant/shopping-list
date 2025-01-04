import { defineStore } from 'pinia'

export const useShoppingListStore = defineStore('ShoppingList', {
  state: () => ({
    lists: [],
  }),
  getters: {
    getListById: (state) => (id) => {
      return state.lists.find((list) => list.id == id)
    },
    getAllLists: (state) => () => {
      return state.lists
    },
  },
  actions: {
    boughtTrigger(ListID, ArticleID) {
      const list = this.getListById(ListID)
      const article = list.articles.find((article) => article.id == ArticleID)
      article.bought = !article.bought
    },
    setStore(data) {
      this.lists = []
      for (let list of data) {
        this.lists.push(list)
      }
    },
    newList(data) {
      const id = this.lists.length
      data.id = id
      this.lists.push(data)
      this.saveToLocalStorage()
    },
    deleteList(listId) {
      const newList = this.lists.filter((list) => {
        return list.id != listId
      })
      this.lists = newList
      this.saveToLocalStorage()
    },
    newArticle(ListID, data) {
      const list = this.getListById(ListID)
      if (list.articles.find((item) => item.id == data.id)) {
        console.log('Daten gibt es schon')
      } else {
        data = { ...data, quantity: 0 }
        list.articles.push(data)
      }
      this.saveToLocalStorage()
    },
    deleteArticleFromList(listID, articleID) {
      const list = this.getListById(listID)
      list.articles = list.articles.filter((item) => {
        return item.id != articleID
      })
      console.log(list)
      this.saveToLocalStorage()
    },
    changeListAttributes(id, name, description) {
      const list = this.getListById(id)
      list.name = name
      list.description = description
      const newList = this.lists.filter((list) => {
        return list.id != id
      })
      newList.push(list)
      this.saveToLocalStorage(newList)
    },
    changeQuantity(listID, articleid, quantity) {
      const list = this.getListById(listID)
      const article = list.articles.find((article) => article.id == articleid)
      article.quantity = quantity
    },
    saveToLocalStorage() {
      localStorage.setItem('ShoppingList', JSON.stringify(this.$state.lists))
    },
    // Temporär alle jetztigen daten in den LocalStorage packen, damit ich Test daten habe
    toLocalStore() {
      localStorage.setItem('ShoppingList', JSON.stringify(this.getAllLists()))
    },
  },
})
