export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to the Wander Feed Control</h1>
        <p className="text-lg text-gray-600">This is where we find bugs in the feeds and we squash them without mercy</p>
        <a 
          href="/feeds/meta"
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          Go to Meta Feed
        </a>

      </main>
    </div>
  );
}
