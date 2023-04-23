import Image from 'next/image'
import flag from '../../public/flag.svg'
import logo from '../../public/logo.svg'
import Link from 'next/link'
import { ChevronRightIcon, CurrencyDollarIcon, IdentificationIcon, LockClosedIcon, Squares2X2Icon, UserPlusIcon, UsersIcon } from '@heroicons/react/24/outline'

import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

// @ts-expect-error
import Blockies from 'react-blockies'

export default function Home({ citizens }: any) {
  console.log('Home')
  return (
    <main className='flex'>
      <div id='menu' className='w-1/5 p-4 xl:rounded-t-3xl xl:mt-8 xl:ml-8'>
        <Link href={'/'}>
          <Image src={logo} width={130} height={51} alt='Nation3 Logo' className='m-4' />
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
            <Link href={'/'} className='flex bg-slate-400 rounded-lg p-4 text-white'>
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
          {citizens ? (
            <CitizenChart />
          ) : (
            <div role="status">
              <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-sky-200 fill-sky-200" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
            </div>
          )}
        </div>

        <div className='mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {citizens ? (
            [...Array(264)].map((x, passportId) =>
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
                        src={`https://cdn.stamp.fyi/avatar/eth:0x000000000000000000000000000000000000000000?s=144`}
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
                        0x0000...0000
                    </h2>
                  </div>
                  🎗️ NationCred: ???
                  <br />
                  🗳️ Voting power: ???
                </div>
              </div>
            )
          ) : (
            <div role="status">
              <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-sky-200 fill-sky-200" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
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
      },
      chart: {
        toolbar: {
          show: false
        }
      }
    }
  }
  return (
    <Chart options={chartData.options} series={chartData.series} type="area" height="100%" />
  )
}

export async function getStaticProps() {
  console.log('getStaticProps')
  const citizens = null
  return {
    props: {
      citizens
    },
    revalidate: 60  // In seconds
  }
}
