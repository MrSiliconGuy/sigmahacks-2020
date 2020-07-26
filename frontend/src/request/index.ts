export const webfetch = {
  get: async (url: string | URL) => {
    if (typeof url !== "string") url = url.toString();
    const res = await window.fetch(url);
    return {
      status: res.status,
      data: await res.json(),
    };
  },
  post: async (url: string | URL, data: any) => {
    if (typeof url !== "string") url = url.toString();
    const res = await window.fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return {
      status: res.status,
      data: await res.json(),
    };
  },
};
