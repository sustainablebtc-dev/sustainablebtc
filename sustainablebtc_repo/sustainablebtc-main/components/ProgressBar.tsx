"use client";

import { AppProgressBar as AppProgressBar } from "next-nprogress-bar";

const ProgressBar = () => {
   return (
      <AppProgressBar
         height="4px"
         color="linear-gradient(40deg, #339dff 0%, #0ec1d3 100%)"
         options={{ showSpinner: false }}
         shallowRouting
      />
   );
};

export default ProgressBar;
