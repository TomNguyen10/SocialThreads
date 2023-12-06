import { defineStore } from "pinia";

export const useReadLaterStore = defineStore("readLater", {
  state: () => ({
    items: [],
  }),
  actions: {
    addItem(item) {
      this.items.push(item);
    },
    removeItem(index) {
      this.items.splice(index, 1);
    },
    clearItems() {
      this.items = [];
    },
  },
});
