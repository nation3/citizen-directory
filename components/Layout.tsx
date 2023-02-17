import {
  ChevronRightIcon,
  ArrowTopRightOnSquareIcon,
  HomeIcon,
  Bars3Icon,
  NewspaperIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useState } from 'react'
import Logo from '../public/logo.svg'

type Indexable = {
  [key: string]: any
}

const navigation = [
  {
    name: 'Citizen directory',
    icon: <UsersIcon className="h-5 w-5" />,
    href: '/',
  },
  {
    name: 'Homepage',
    href: 'https://nation3.org',
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    name: 'Docs',
    href: 'https://docs.nation3.org/',
    icon: <NewspaperIcon className="h-5 w-5" />,
  },
]

export default function Layout({ children }: any) {
  const router = useRouter()

  const [nav, setNav] = useState(navigation)

  return (
    <div className="mx-auto bg-n3bg font-display">
      <Script src="https://cdn.splitbee.io/sb.js" />
      <div className="h-screen">
        <div className="navbar bg-base-100 border-slate-100 border-b-2 py-0 pl-0 lg:hidden sticky z-10">
          <div className="navbar-start border-slate-100 pl-0">
            <div className="w-80 border-slate-100 py-4 box-content">
              <div className="pl-6 pt-2 cursor-pointer">
                <div className="flex-none hidden lg:block">
                  <Link href="/" passHref>
                    <a>
                      <Image src={Logo} />
                    </a>
                  </Link>
                </div>
                <div className="flex-none lg:hidden">
                  <label
                    htmlFor="side-drawer"
                    className="btn btn-square btn-ghost"
                  >
                    <Bars3Icon className="h-8 w-8" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="drawer drawer-mobile">
          <input id="side-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content fixed top-0 left-0 right-0 bottom-0 lg:static pt-24 lg:pt-0 z-0 max-h-screen">
            <div className="flex flex-col w-full h-full">
              <div className="hero h-full">
                <div className="hero-content">{children}</div>
              </div>
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="side-drawer"
              className="drawer-overlay z-10"
            ></label>
            <div className="bg-white w-80 flex flex-col justify-between pb-24 lg:pb-0 overflow-y-auto drop-shadow-md min-h-screen">
              <div className="mt-6 py-4 hidden lg:block">
                <div className="px-8 pt-2 cursor-pointer">
                  <Link href="/" passHref>
                    <a>
                      <Image src={Logo} />
                    </a>
                  </Link>
                </div>
              </div>
              <ul className="menu p-4 overflow-y-auto text-base-400 grow">
                {nav.map((item: any) => (
                  <li
                    className="mt-1 relative py-2"
                    onClick={() =>
                      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
                      (document.getElementById('side-drawer').checked = false)
                    }
                    key={item.href}
                  >
                    {item.href.charAt(0) === '/' ? (
                      <Link href={item.href}>
                        <a
                          className={`py-4 ${
                            router.pathname == item.href ? 'active' : ''
                          }`}
                        >
                          {item.icon}
                          {item.name}
                          <ChevronRightIcon className="h-5 w-5 absolute right-4 opacity-50" />
                        </a>
                      </Link>
                    ) : (
                      <a
                        className={`py-4 ${
                          router.pathname == item.href ? 'active' : ''
                        }`}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.icon}
                        {item.name}
                        <ArrowTopRightOnSquareIcon className="h-5 w-5 absolute right-4 opacity-50" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
