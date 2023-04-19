import Image from 'next/image'
import flag from '../../public/flag.svg'
import logo from '../../public/logo.svg'
import Link from 'next/link'
import { ChevronRightIcon, CurrencyDollarIcon, IdentificationIcon, LockClosedIcon, Squares2X2Icon, UserPlusIcon, UsersIcon } from '@heroicons/react/24/outline'

import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

// @ts-expect-error
import Blockies from 'react-blockies'
import { ethers } from 'ethers'

export default function Home() {
  return (
    <main className='flex'>
      <div id='menu' className='w-1/5 p-4 xl:rounded-t-3xl xl:mt-8 xl:ml-8'>
        <Link href={'/'}>
          <Image src={logo} width={130} height={100} alt='Nation3 Logo' className='m-4' />
        </Link>
        <ul>
          <li className='mt-4'>
            <Link href='https://app.nation3.org' className='flex bg-slate-50 hover:bg-slate-100 rounded-lg p-4'>
              <Squares2X2Icon className="h-5 w-5" />&nbsp;
              Start&nbsp;
              <ChevronRightIcon className='h-5 w-5 opacity-50' />
            </Link>
          </li>
          <li className='mt-4'>
            <Link href='https://app.nation3.org/join' className='flex bg-slate-50 hover:bg-slate-100 rounded-lg p-4'>
              <UserPlusIcon className="h-5 w-5" />&nbsp;
              Become a citizen&nbsp;
              <ChevronRightIcon className='h-5 w-5 opacity-50' />
            </Link>
          </li>
          <li className='mt-4'>
            <Link href={'/'} className='flex bg-sky-300 hover:bg-sky-300 rounded-lg p-4 text-white'>
              <UsersIcon className="h-5 w-5" />&nbsp;
              Citizen directory&nbsp;
              <ChevronRightIcon className='h-5 w-5 opacity-50' />
            </Link>
          </li>
          <li className='mt-4'>
            <Link href='https://app.nation3.org/lock' className='flex bg-slate-50 hover:bg-slate-100 rounded-lg p-4'>
              <LockClosedIcon className="h-5 w-5" />&nbsp;
              Lock tokens&nbsp;
              <ChevronRightIcon className='h-5 w-5 opacity-50' />
            </Link>
          </li>
          <li className='mt-4'>
            <Link href='https://app.nation3.org/liquidity' className='flex bg-slate-50 hover:bg-slate-100 rounded-lg p-4'>
              <CurrencyDollarIcon className="h-5 w-5" />&nbsp;
              Liquidity rewards&nbsp;
              <ChevronRightIcon className='h-5 w-5 opacity-50' />
            </Link>
          </li>
        </ul>
      </div>

      <div className='w-4/5 p-8'>
        <h1 className="text-3xl font-medium flex">
          Nation3 Citizens&nbsp;
          <Image src={flag} width={36} height={36} alt='Nation3 Flag' />
        </h1>

        <div className='mt-4 w-full h-64'>
          <CitizenChart />
        </div>

        <div className='mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {[...Array(264)].map((x, passportId) =>
            <div key={passportId} className='bg-white rounded-xl p-4 drop-shadow-sm transition ease-in-out hover:-translate-y-0.5'>
              <div className="card-body items-stretch ">
                <div className="absolute right-4">
                  <IdentificationIcon className="h-5 w-5 text-gray-400" />
                  <p className="text-gray-400">#{passportId}</p>
                </div>
                <div className="flex">
                  {/* {ensName ? ( */}
                  { false ? (
                    <img
                      className="rounded-full h-12 w-12"
                      src={`https://cdn.stamp.fyi/avatar/eth:${ethers.constants.AddressZero}?s=144`}
                    />
                  ) : (
                    <Blockies
                      className="rounded-full"
                      seed={String(passportId)}
                      size={12}
                    />
                  )}

                  <h2 className="ml-4 font-medium">
                    {/* {ensName
                      ? ensName
                      : `${ethAddress.substring(0, 6)}...${ethAddress.slice(-4)}`} */}
                      {ethers.constants.AddressZero.substring(0, 6)}...{ethers.constants.AddressZero.slice(-4)}
                  </h2>
                </div>
                🎗️ NationCred: ???
                <br />
                🗳️ Voting power: ???
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

function CitizenChart() {
  const chartData = {
    series: [
      {
        name: 'Total Citizens',
        data: [31, 40, 28, 51, 42, 109, 100]
      },
      {
        name: 'Active Citizens',
        data: [11, 32, 45, 32, 34, 52, 41]
      }
    ],
    options: {
      dataLabels: {
        enabled: false
      }
    }
  }
  return (
    <Chart options={chartData.options} series={chartData.series} type="area" height="100%" />
  )
}
