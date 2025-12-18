import { redirect } from "next/navigation";

export default function Page() {
  return (
    <main>
      <h1>Dashboard Time</h1>
      <a href="/dashboard">Ir al dashboard</a>
    </main>
  );
}
