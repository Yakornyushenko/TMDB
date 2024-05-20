import { apiKey, defaultApiUrl } from "@/src/constants";

const options = {
  method: "GET",
  next: {
    revalidate: 1800,
  },
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
};

export const api = async (url: string) => {
  const response = await fetch(`${defaultApiUrl}${url} `, options);
  try {
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
