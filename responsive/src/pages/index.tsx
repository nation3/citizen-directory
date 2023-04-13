import Image from 'next/image'
import flag from '../../public/flag.svg'
import logo from '../../public/logo.svg'
import Link from 'next/link'
import { ChevronRightIcon, CurrencyDollarIcon, LockClosedIcon, Squares2X2Icon, UserPlusIcon, UsersIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <main className='flex'>
      <div id='menu' className='w-80 h-screen p-8 xl:rounded-t-3xl xl:mt-8 xl:ml-8'>
        <Link href={'/'}>
          <Image src={logo} width={130} height={100} alt='Nation3 Logo' />
        </Link>
        <ul>
          <li className='mt-8'>
            <Link href='https://app.nation3.org' className='flex bg-slate-100 hover:bg-slate-200 rounded-lg p-4'>
              <Squares2X2Icon className="h-5 w-5" />&nbsp;
              Start&nbsp;
              <ChevronRightIcon className='h-5 w-5 opacity-50' />
            </Link>
          </li>
          <li className='mt-8'>
            <Link href='https://app.nation3.org/join' className='flex bg-slate-100 hover:bg-slate-200 rounded-lg p-4'>
              <UserPlusIcon className="h-5 w-5" />&nbsp;
              Become a citizen&nbsp;
              <ChevronRightIcon className='h-5 w-5 opacity-50' />
            </Link>
          </li>
          <li className='mt-8'>
            <Link href={'/'} className='flex bg-sky-300 hover:bg-sky-300 rounded-lg p-4 text-white'>
              <UsersIcon className="h-5 w-5" />&nbsp;
              Citizen directory&nbsp;
              <ChevronRightIcon className='h-5 w-5 opacity-50' />
            </Link>
          </li>
          <li className='mt-8'>
            <Link href='https://app.nation3.org/lock' className='flex bg-slate-100 hover:bg-slate-200 rounded-lg p-4'>
              <LockClosedIcon className="h-5 w-5" />&nbsp;
              Lock tokens&nbsp;
              <ChevronRightIcon className='h-5 w-5 opacity-50' />
            </Link>
          </li>
          <li className='mt-8'>
            <Link href='https://app.nation3.org/liquidity' className='flex bg-slate-100 hover:bg-slate-200 rounded-lg p-4'>
              <CurrencyDollarIcon className="h-5 w-5" />&nbsp;
              Liquidity rewards&nbsp;
              <ChevronRightIcon className='h-5 w-5 opacity-50' />
            </Link>
          </li>
        </ul>
      </div>

      <div className='p-8'>
        <h1 className="text-3xl font-medium flex">
          Nation3 Citizens&nbsp;
          <Image src={flag} width={36} height={36} alt='Nation3 Flag' />
        </h1>

        <div className='mt-4'>
          Content
        </div>
      </div>
    </main>
  )
}
