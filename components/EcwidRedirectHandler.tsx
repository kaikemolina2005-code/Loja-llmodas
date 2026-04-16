'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function RedirectLogic() {
  const searchParams = useSearchParams();
  const accountUrl = "https://llmodas.shop/store/account";

  useEffect(() => {
    const ecwidParams = [
      '~mode', 
      '~key', 
      '~t', 
      '~return_url', 
      '~orderid', 
      '~cartid', 
      'callback'
    ];

    const hasEcwidParam = ecwidParams.some(param => searchParams.has(param));

    if (hasEcwidParam) {
      const currentParams = searchParams.toString();
      const redirectUrl = `${accountUrl}${currentParams ? '?' + currentParams : ''}`;
      
      console.log('Global Ecwid redirect triggered:', redirectUrl);
      window.location.href = redirectUrl;
    }
  }, [searchParams, accountUrl]);

  return null;
}

export default function EcwidRedirectHandler() {
  return (
    <Suspense fallback={null}>
      <RedirectLogic />
    </Suspense>
  );
}
