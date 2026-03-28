'use client';

import { useEffect } from 'react';

export default function SBPMicaWhitepaperPage() {
  useEffect(() => {
    // Open the XHTML whitepaper in a new tab
    window.open('/sbp-mica-whitepaper.xhtml', '_blank');
    
    // Redirect back to home page or previous page after a short delay
    const timer = setTimeout(() => {
      window.history.back();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <p>Opening SBP MICA Whitepaper...</p>
    </div>
  );
}
