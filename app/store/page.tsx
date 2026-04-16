import AnunciosSection from "@/components/AnunciosSection";

export default function StorePage() {
  return (
    <main className="min-h-screen bg-[#f6efef] pt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#3b2b2b]">
            Store
          </h1>
          <p className="mt-3 text-sm md:text-base text-[#7c6c6c]">
            Produtos cadastrados pela loja
          </p>
        </div>
      </div>

      <AnunciosSection />
    </main>
  );
}
