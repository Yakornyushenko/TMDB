import { defaultApiUrl } from "@/src/constants";

const options = {
  method: "GET",
  next: {
    revalidate: 1800,
  },
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
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
