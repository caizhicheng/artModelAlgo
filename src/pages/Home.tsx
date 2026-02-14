function Home() {
  return (
    <div className="space-y-12">
      <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-14 text-white sm:px-10">
        <h2 className="text-3xl font-bold sm:text-4xl">Build Fast. Ship Confidently.</h2>
        <p className="mt-4 max-w-2xl text-blue-100">
          A modern React + TypeScript front-end powered by Vite and TailwindCSS, built for responsive
          experiences on both mobile and desktop.
        </p>
      </section>

      <section>
        <h3 className="mb-6 text-2xl font-semibold">Features</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'Fast Development', desc: 'Instant HMR workflow with Vite.' },
            { title: 'Typed Components', desc: 'Reliable code with TypeScript support.' },
            { title: 'Responsive UI', desc: 'Utility-first styles using TailwindCSS.' },
          ].map((feature) => (
            <article key={feature.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h4 className="text-lg font-semibold">{feature.title}</h4>
              <p className="mt-2 text-slate-600">{feature.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="rounded-xl border border-slate-200 bg-white p-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} My Web App. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
