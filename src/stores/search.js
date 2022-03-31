import { defineStore } from "pinia";
import _bulkGroups from "./_bulkGroups";
import _tlds from "./_tlds";
import { requests, useApiAvailability } from "../router/requests";
import axios from "axios";

export const useSearchStore = defineStore("search", {
  state: () => {
    return {
      userLocation: {},
      results: [],
      customResult: [],
      loadingState: false,
      loopBreak: false,
      currentKeyword: "",
      exactMatch: {},
      _bulkGroups,
      _tlds,
      selectedTLDs: [],
      selectedBulkGroup: [],
      payloadCombination: [],
    };
  },
  getters: {
    featuredDomain(state) {
      return this.customSorting.filter((result) => result?.purchasePrice)[0];
    },
    uniqueSelectedTLDs(state) {
      let result = [];

      for (let i = 0; i < state.selectedBulkGroup.length; i++) {
        result = [...result, ...state.selectedBulkGroup[i].items];
      }

      result = [...result, ...state.selectedTLDs];

      // insert user's country TLD
      let countryTLD = this.userLocation?.location?.country?.tld.replace(
        ".",
        ""
      );
      if (countryTLD) {
        for (let i = 0; i <= result.length; i++) {
          if (result[i] === "live") {
            result.splice(i + 1, 0, countryTLD);
            break;
          }
        }
      }

      return result;
    },
    customSorting(state) {
      let result = [];

      this.payloadCombination.forEach((item) => {
        let tmpData = this.results.find((e) => e.domainName === item);
        if (tmpData) {
          result.push(tmpData);
        }
      });

      return result;
    },
  },
  actions: {
    async load(payload) {
      this.loadingState = !this.loadingState;
      try {
        let response = [];
        this.currentKeyword = payload;

        if (this.uniqueSelectedTLDs.length === 0) {
          this.selectedBulkGroup.push(this._bulkGroups[0]);
        }

        payload = payload.split(/[, ]+/); //delimeter: space or comma

        if (payload.length > 0) {
          let withTLD = payload.filter((n) => n.includes(".") === true);
          let withoutTLD = payload.filter((n) => n.includes(".") === false);

          if (withoutTLD.length > 0) {
            withoutTLD = this.generateCombinations(withoutTLD);
          }

          payload = [...withTLD, ...withoutTLD];
        }

        this.payloadCombination = payload;

        let chunkLimit = 50;
        let chunkOffset = 0;
        let chunkEnd = chunkLimit;

        while (chunkOffset <= payload.length) {
          let chunkPayload = payload.slice(chunkOffset, chunkEnd - 1);

          response = await axios(useApiAvailability(chunkPayload).config);

          this.results = [
            ...this.results,
            ...(response.data?.results ? response.data.results : []),
          ];

          chunkOffset += chunkEnd; // 0 -> 50
          chunkEnd += chunkLimit - 1; // 51 -> 100

          if (chunkEnd > payload.length) {
            chunkEnd = payload.length - 1;
          }
        }

        this.loadingState = !this.loadingState;
      } catch (error) {
        this.loadingState = !this.loadingState;
        return error;
      }
    },
    generateCombinations(withoutTLD) {
      let combinations = [];
      withoutTLD.forEach((domain) => {
        this.uniqueSelectedTLDs.forEach((tld) => {
          combinations.push(`${domain}.${tld}`);
        });
      });

      return combinations;
    },
    async getUserLocation() {
      if (localStorage.getItem("domainFinderUserLocation")) {
        this.userLocation = JSON.parse(
          localStorage.getItem("domainFinderUserLocation")
        );
        return;
      }

      this.userLocation = await axios
        .get(requests.userLocation.GET)
        .then(function (response) {
          localStorage.setItem(
            "domainFinderUserLocation",
            JSON.stringify(response.data)
          );
          return response.data;
        });
    },
  },
});
