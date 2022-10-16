import Link from "next/link";
import { useState } from "react";
import { HiMenu } from 'react-icons/hi'

export default function Navbar()  {
  const [openNav, setOpenNav] = useState(false)

  return (
    <nav className="max-w-full">
      <span className="block sm:hidden text-3xl p-5 m-1 cursor-pointer
        bg-zinc-900 rounded w-max text-center items-center"
        onClick={() => setOpenNav(s => !s)}
      >
        <HiMenu />
      </span>
        <ul className={`gap-1 sm:gap-10 flex flex-col sm:flex-row sm:relative fixed transition-all ${!openNav && '-translate-x-full sm:translate-x-0'}`}>
            <li
              className="bg-neutral-900 rounded opacity-95 hover:opacity-100
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


