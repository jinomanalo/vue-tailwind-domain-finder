import { defineStore } from "pinia";
import { useApiName } from "../router/requests";
import axios from "axios";

export const useSearchStore = defineStore("search", {
  state: () => {
    return {
      results: [],
      loadingState: false,
    };
  },
  getters: {
    orderByShortestDomainName(state) {
      let withPurchasePrice = state.results.filter(
        (result) => result?.purchasePrice
      );
      return withPurchasePrice.sort(
        (a, b) => a.domainName.length - b.domainName.length
      );
    },
  },
  actions: {
    async load(payload) {
      this.loadingState = !this.loadingState;
      try {
        const response = await axios(useApiName(payload).config);
        this.results = response.data.results;
        this.loadingState = !this.loadingState;
      } catch (error) {
        this.loadingState = !this.loadingState;
        return error;
      }
    },
  },
});
