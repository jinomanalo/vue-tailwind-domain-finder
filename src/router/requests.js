import { Buffer } from "buffer";

export const requests = {
  domain: {
    SEARCH: "/api/domains:search",
    AVAILABILITY: "/api/domains:checkAvailability",
  },
  userLocation: {
    GET: "/user-location",
  },
};

/**
 * This is dedicated to the Name API.
 */

const token = Buffer.from(
  `${import.meta.env.VITE_APINAME_USERNAME}:${
    import.meta.env.VITE_APINAME_KEY
  }`,
  "utf-8"
).toString("base64");

var config = {
  method: "post",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${token}`,
  },
};

export const useApiSearch = (keyword = null) => {
  var data = JSON.stringify({
    keyword,
  });

  config.data = data;
  config.url = requests.domain.SEARCH;

  return {
    config,
  };
};

export const useApiAvailability = (keyword = null) => {
  var data = JSON.stringify({
    domainNames: keyword,
  });

  config.data = data;
  config.url = requests.domain.AVAILABILITY;

  return {
    config,
  };
};
