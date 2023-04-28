import Image from 'next/image'
import logo from '../../public/logo.svg'
import Link from 'next/link'
import { ChevronRightIcon, CurrencyDollarIcon, LockClosedIcon, Squares2X2Icon, UserPlusIcon, UsersIcon } from '@heroicons/react/24/outline'

export default function Menu() {
  return (
    <div id='menu' className='w-1/5 p-4 xl:rounded-t-3xl xl:mt-8 xl:ml-8'>
      <Link href={'/'}>
        <Image src={logo} width={130} height={51} alt='Nation3 Logo' className='m-4' />
      </Link>
      <ul>
        <li className='mt-4'>
          <Link href='https://app.nation3.org' className='flex bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg p-4'>
            <Squares2X2Icon className="h-5 w-5" />&nbsp;
            Start&nbsp;
            <ChevronRightIcon className='h-5 w-5 opacity-50' />
          </Link>
        </li>
        <li className='mt-4'>
          <Link href='https://app.nation3.org/join' className='flex bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg p-4'>
            <UserPlusIcon className="h-5 w-5" />&nbsp;
            Become a citizen&nbsp;
            <ChevronRightIcon className='h-5 w-5 opacity-50' />
          </Link>
        </li>
        <li className='mt-4'>
          <Link href={'/'} className='flex bg-slate-400 rounded-lg p-4 text-white'>
            <UsersIcon className="h-5 w-5" />&nbsp;
            Citizen directory&nbsp;
            <ChevronRightIcon className='h-5 w-5 opacity-50' />
          </Link>
        </li>
        <li className='mt-4'>
          <Link href='https://app.nation3.org/lock' className='flex bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg p-4'>
            <LockClosedIcon className="h-5 w-5" />&nbsp;
            Lock tokens&nbsp;
            <ChevronRightIcon className='h-5 w-5 opacity-50' />
          </Link>
        </li>
        <li className='mt-4'>
          <Link href='https://app.nation3.org/liquidity' className='flex bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg p-4'>
            <CurrencyDollarIcon className="h-5 w-5" />&nbsp;
            Liquidity rewards&nbsp;
            <ChevronRightIcon className='h-5 w-5 opacity-50' />
          </Link>
        </li>
      </ul>
    </div>
  )
}
