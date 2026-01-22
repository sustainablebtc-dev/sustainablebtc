export const getSbcInfo = async () => {
   const sbpApiUrl = process.env.NEXT_PUBLIC_SBP_API_URL || "";

   const requestHeaders = new Headers({
      "Content-Type": "application/json",
   });

   const response = await fetch(`${sbpApiUrl}/sbc-token/info`, {
      headers: requestHeaders,
      mode: "cors",
      method: "GET",
   });

   let result = await response.json();

   if (!response.ok) {
      throw result;
   } else {
      result = result.data[0];
   }

   return result;
};
