export const getBtcInfo = async () => {
   const liveCoinWatchApiUrl =
      process.env.NEXT_PUBLIC_LIVECOINWATCH_API_URL || "";
   const liveCoinWatchApiKey =
      process.env.NEXT_PUBLIC_LIVECOINWATCH_API_KEY || "";

   const requestHeaders = new Headers({
      "Content-Type": "application/json",
      "x-api-key": liveCoinWatchApiKey,
   });

   const payload = {
      currency: "USD",
      code: "BTC",
      meta: true,
   };

   const response = await fetch(`${liveCoinWatchApiUrl}/coins/single`, {
      headers: requestHeaders,
      mode: "cors",
      method: "POST",
      body: JSON.stringify(payload),
   });

   const result = await response.json();

   if (!response.ok) {
      throw result;
   }

   return result;
};
