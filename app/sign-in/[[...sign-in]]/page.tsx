import { SignIn } from "@clerk/nextjs";

const OFFICIAL_DOMAIN = "https://llmodas.shop";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn
        forceRedirectUrl={`${OFFICIAL_DOMAIN}/minha-conta`}
        fallbackRedirectUrl={`${OFFICIAL_DOMAIN}/minha-conta`}
      />
    </div>
  );
}
