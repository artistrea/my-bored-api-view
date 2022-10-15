import Link from "next/link";

export default function Navbar()  {
  return (
    <nav>
        <ul>
            <li><Link href="/">Without preload</Link></li>
            <li><Link href="/with_preload">With preload</Link></li>
        </ul>
    </nav>
  )
}


