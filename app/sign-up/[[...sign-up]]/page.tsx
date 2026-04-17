import { SignUp } from "@clerk/nextjs";

const OFFICIAL_DOMAIN = "https://llmodas.shop";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignUp
        forceRedirectUrl={`${OFFICIAL_DOMAIN}/minha-conta`}
        fallbackRedirectUrl={`${OFFICIAL_DOMAIN}/minha-conta`}
      />
    </div>
  );
}
