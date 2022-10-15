import Link from "next/link";

export default function Navbar()  {
  return (
    <nav>
        <ul>
            <li
              className="bg-neutral-900 rounded opacity-90 hover:opacity-100
               hover:bg-zinc-900 hover:shadow-slate-700 hover:shadow-sm"
            >
              <Link href="/">
                Without prefetch
              </Link>
            </li>
            <li
              className="bg-neutral-900 rounded opacity-90 hover:opacity-100
               hover:bg-zinc-900 hover:shadow-slate-700 hover:shadow-sm"
            >
              <Link href="/with_prefetch">
                With prefetch
              </Link>
            </li>
        </ul>
    </nav>
  )
}


