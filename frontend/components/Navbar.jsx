import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-6 p-5 bg-slate-900">
      <Link href="/">Dashboard</Link>
      <Link href="/order">Order</Link>
      <Link href="/tracking">Tracking</Link>
      <Link href="/analytics">Analytics</Link>
    </nav>
  );
}
