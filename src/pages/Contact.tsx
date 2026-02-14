function Contact() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">Contact</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-slate-100 p-4">
          <h3 className="font-semibold">Email</h3>
          <p className="mt-1 text-slate-600">support@example.com</p>
        </div>
        <div className="rounded-lg bg-slate-100 p-4">
          <h3 className="font-semibold">Phone</h3>
          <p className="mt-1 text-slate-600">+86 123 4567 8901</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
