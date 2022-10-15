import Link from "next/link";

export default function Navbar()  {
  return (
    <nav>
        <ul>
            <li>
              <Link href="/">
                Without prefetch
              </Link>
            </li>
            <li>
              <Link href="/with_prefetch">
                With prefetch
              </Link>
            </li>
        </ul>
    </nav>
  )
}


