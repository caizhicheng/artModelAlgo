import { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: {
    name: string;
  };
};

function Profile() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
    return () => controller.abort();
  }, []);

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Profile</h2>
      {loading && <p className="text-slate-600">Loading users...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="grid gap-4 sm:grid-cols-2">
          {users.map((user) => (
            <article key={user.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="mt-2 text-sm text-slate-600">Email: {user.email}</p>
              <p className="text-sm text-slate-600">Phone: {user.phone}</p>
              <p className="text-sm text-slate-600">Company: {user.company.name}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Profile;
