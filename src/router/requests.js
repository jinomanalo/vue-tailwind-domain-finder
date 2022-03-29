import { Buffer } from "buffer";

export const requests = {
  search: {
    POST: "/api/domains:search",
  },
};

/**
 * This is dedicated to the Name API.
 */
export const useApiName = (keyword = null) => {
  const token = Buffer.from(
    `${import.meta.env.VITE_APINAME_USERNAME}:${
      import.meta.env.VITE_APINAME_KEY
    }`,
    "utf-8"
  ).toString("base64");

  var data = JSON.stringify({
    keyword,
  });

  var config = {
    method: "post",
    url: requests.search.POST,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${token}`,
    },
    data: data,
  };

  return {
    config,
  };
};
