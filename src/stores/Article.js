import { defineStore } from 'pinia'

export const useArticleStore = defineStore('ArticleStore', {
  state: () => ({
    articles: [],
    foodCategory: [
      { id: 0, name: 'Obst & Gemüse' },
      { id: 1, name: 'Backwaren & Brot' },
      { id: 2, name: 'Milchprodukte & Eier' },
      { id: 3, name: 'Fleisch, Wurst & Fisch' },
      { id: 4, name: 'Konserven & Fertiggerichte' },
      { id: 5, name: 'Tiefkühlprodukte' },
      { id: 6, name: 'Teigwaren & Reis' },
      { id: 7, name: 'Snacks & Süßigkeiten' },
      { id: 8, name: 'Gewürze & Saucen' },
      { id: 9, name: 'Öle & Fette' },
      { id: 10, name: 'Aufstriche' },
      { id: 11, name: 'Vegetarisch & Vegan' },
    ],
    drinkCategories: [
      { id: 0, name: 'Wasser' },
      { id: 1, name: 'Softdrinks' },
      { id: 2, name: 'Säfte & Nektare' },
      { id: 3, name: 'Alkoholische Getränke' },
      { id: 4, name: 'Kaffee & Tee' },
      { id: 5, name: 'Milchgetränke' },
      { id: 6, name: 'Energie- & Sportgetränke' },
    ],
  }),
  getters: {
    getFoodList(state) {
      return state.foodCategory
    },
    getDrinkList(state) {
      return state.drinkCategories
    },
    getArticels(state) {
      return state.articles
    },
    getFoodArticles() {
      const allArticle = this.getArticels
      return allArticle.filter((articel) => {
        return articel.category == 'Essen'
      })
    },
    getDrinkArticles() {
      const allArticle = this.getArticels
      return allArticle.filter((articel) => {
        return articel.category == 'Getränke'
      })
    },
    getCat(state) {
      return (cat, catID) => {
        if (cat == 'Essen') {
          const item = state.foodCategory.find((item) => item.id == catID)
          return item.name
        } else if (cat == 'Getränk') {
          const item = state.drinkCategories.find((item) => item.id == catID)
          return item.name
        } else return []
      }
    },
  },
  actions: {
    newArticle(newData) {
      console.log(this.articles)
      this.articles.push(newData)
      this.saveToLocalStorage()
    },
    setStore(data) {
      for (let list of data) {
        this.articles.push(list)
      }
    },
    deleteArticle(articleID) {
      const newArticleList = this.articles.filter((article) => {
        return article.id != articleID
      })
      this.articles = newArticleList
      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      localStorage.setItem('Articles', JSON.stringify(this.$state.articles))
      localStorage.setItem('FoodCategory', JSON.stringify(this.$state.foodCategory))
      localStorage.setItem('DrinkCategories', JSON.stringify(this.$state.drinkCategories))
    },
  },
})
