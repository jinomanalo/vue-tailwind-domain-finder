import { defineStore } from "pinia";
import { requests, useApiSearch } from "../router/requests";
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
      keywordCombinations: [],
    };
  },
  getters: {
    featuredDomain(state) {
      return this.customSorting.filter((result) => result?.purchasePrice)[0];
    },
    /**
     * 1. If someone search for a domain that is valid, such as gilby.gold, that domain should be shown at top.
     *    If it’s unavailable, then say gilby.gold is taken.
     * 2. If one searches for just a keyword, such as gilby, then the .com should be assumed and shown the same as above.
     * 3. Next we have certain TLDs that are featured, which right now are .info, .live, and .life,
     *    the exact match of the search term with these TLDs should be shown next, if available.
     * 4. The next one should be the exact match of the country’s TLD that the user is currently at.
     * 5. Then you can pull up the shortest one like you had in your loom vid.
     * 6. Then finally all exact matches in the order they were given by the api
     * 7. If a keyword matches a TLD, use the other keywords to search on that TLD.
     **/
    customSorting(state) {
      if (state.results.length === 0) return [];

      let results = [...state.results];

      const arrIterator = (callback) => {
        for (let i = 0; i <= results.length; i++) {
          callback(i);

          if (this.loopBreak) {
            this.loopBreak = !this.loopBreak;
            break;
          }
        }
      };

      // Filter A (1)
      let fltrAResult = [];
      this.exactMatch = {};
      if (this.currentKeyword.includes(".") === true) {
        arrIterator((i) => {
          if (results[i]?.domainName === this.currentKeyword) {
            this.exactMatch = results[i];
            fltrAResult.push(results[i]);
            results.splice(i, 1);
            this.loopBreak = true;
          }
        });
      }

      // Filter B (2)
      const fltrB = ["com"];
      let fltrBResult = [];
      arrIterator((i) => {
        if (fltrB.indexOf(results[i]?.tld) !== -1) {
          fltrBResult.push(results[i]);
          results.splice(i, 1);
          this.loopBreak = true;
        }
      });

      // Filter C (3)
      const fltrC = ["info", "live", "life"];
      let fltrCResult = [];
      arrIterator((i) => {
        if (fltrC.indexOf(results[i]?.tld) !== -1) {
          fltrCResult.push(results[i]);
          results.splice(i, 1);
        }
      });

      // Filter D (4)
      const ftlrD = [this.userLocation?.location?.country?.tld];
      let fltrDResult = [];
      arrIterator((i) => {
        if (ftlrD.indexOf(results[i]?.tld) !== -1) {
          fltrDResult.push(results[i]);
          results.splice(i, 1);
          this.loopBreak = true;
        }
      });

      // Filter E (5)
      let fltrEResult = results.sort(
        (a, b) => a.domainName.length - b.domainName.length
      )[0];
      if (fltrEResult) {
        results = [
          ...results.filter((a) => a.domainName !== fltrEResult.domainName),
        ];
      }

      this.customResult = fltrAResult.concat(
        fltrBResult,
        fltrCResult,
        fltrDResult,
        fltrEResult,
        results
      );

      return this.customResult;
    },
  },
  actions: {
    async load(payload) {
      this.loadingState = !this.loadingState;
      try {
        this.keywordCombinations = this.getKeywordCombinations(payload);
        const response = await axios(useApiSearch(payload).config);
        this.currentKeyword = payload;
        this.results = response.data.results;
        this.loadingState = !this.loadingState;
      } catch (error) {
        this.loadingState = !this.loadingState;
        return error;
      }
    },
    async getKeywordCombinations(keyword) {
      if (keyword.includes(" ") === false) return [keyword];

      let combinations = [];
      let words = keyword.split(" ");

      let count = words.length - 1;
      while (count >= 0) {
        let domains = words.filter((word, i) => i !== count);
        let tld = words[count];

        //level 1
        for (let i = 0; i <= domains.length - 1; i++) {
          let item = domains[i];
          let rest = domains.filter((domain, d) => d !== i);
          combinations.push(`${item}${rest.join("")}.${tld}`);
        }

        count--;
      }
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
