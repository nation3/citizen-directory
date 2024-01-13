import Image from 'next/image'
import flag from '../../public/flag.svg'
import { IdentificationIcon } from '@heroicons/react/24/outline'

import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

// @ts-expect-error
import Blockies from 'react-blockies'

import Papa from 'papaparse'
import Menu from '@/components/Menu'
import Link from 'next/link'
import LoadingIndicator from '@/components/LoadingIndicator'
import { config } from '@/utils/Config'

export default function Home({ total_citizens_count, total_expired_passports, active_citizens_count, citizens, nationcred_scores_accumulated }: any) {
  console.log('Home')
  return (
    <main className='flex-column lg:flex'>
      <Menu />

      <div className='w-full lg:w-3/4 p-8'>
        <h1 className="text-3xl font-bold flex">
          Nation3 Citizens&nbsp;
          <Image src={flag} width={36} height={36} alt='Nation3 Flag' />
        </h1>

        <div className='mt-4 w-full h-64 dark:bg-slate-800 dark:rounded-xl'>
          {(total_citizens_count && active_citizens_count) ? (
            <CitizenChart total_citizens_count={total_citizens_count} total_expired_passports={total_expired_passports} active_citizens_count={active_citizens_count} />
          ) : (
            <LoadingIndicator />
          )}
        </div>

        <div className='mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {citizens ? (
            Object.keys(citizens).reverse().map((passportId) => (
              <Link key={passportId} href={`/${passportId}`}>
                <div className='bg-white dark:bg-slate-800 rounded-xl p-4 drop-shadow-sm transition ease-in-out hover:-translate-y-0.5'>
                  <div className="card-body items-stretch">
                    <div className="absolute right-4">
                      <IdentificationIcon className="h-5 w-5 text-gray-400" />
                      <p className="text-gray-400">#{passportId}</p>
                    </div>
                    <div className="flex">
                      {citizens[passportId].ensName ? (
                        <img
                          className="rounded-full h-12 w-12"
                          src={`https://cdn.stamp.fyi/avatar/eth:${citizens[passportId].ownerAddress}?s=144`}
                        />
                      ) : (
                        <Blockies
                          className="rounded-full"
                          seed={citizens[passportId].ownerAddress}
                          size={12}
                        />
                      )}

                      <h2 className="ml-2 mt-2 text-xl text-ellipsis overflow-hidden">
                        {citizens[passportId].ensName
                          ? citizens[passportId].ensName
                          : `${citizens[passportId].ownerAddress.substring(0, 6)}...${citizens[passportId].ownerAddress.slice(-4)}`}
                      </h2>
                    </div>
                    <div className='mt-2'>
                      🎗️ NationCred: 
                      <span className="ml-1 rounded-full bg-slate-200 px-2 py-1 font-semibold text-slate-700">
                        {Number(nationcred_scores_accumulated[passportId]).toLocaleString('en-US')}
                      </span>
                      <br />
                      🗳️ Voting escrow: {citizens[passportId].votingPower}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <LoadingIndicator />
          )}
        </div>
      </div>
    </main>
  )
}

function CitizenChart({ total_citizens_count, total_expired_passports, active_citizens_count }: any) {
  const chartData = {
    series: [
      {
        name: 'Total Citizens',
        data: total_citizens_count
      },
      {
        name: 'Active Citizens',
        data: active_citizens_count,
      },
      {
        name: 'Expired Passports',
        data: total_expired_passports
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

  // Fetch NationCred data from datasets repo
  const nationCredFileUrl: string = 'https://raw.githubusercontent.com/nation3/nationcred-datasets/main/nationcred/output/nationcred-active-citizens.csv'
  console.info('Fetching NationCred data:', nationCredFileUrl)
  const nationCredResponse = await fetch(nationCredFileUrl)
  console.log('nationCredResponse.status:', nationCredResponse.status)
  const nationCredData = await nationCredResponse.text()
  const active_citizens_count: number[] = []
  Papa.parse(nationCredData, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
    complete: (result: any) => {
      // console.info('result:', result)
      result.data.forEach((row: any, i: number) => {
        // console.info(`row ${i}`, row)
        active_citizens_count[i] = Number(row.active_citizens_count)
      })
      // console.info('active_citizen_count:', active_citizens_count)
    }
  })

  // Fetch weekly citizen count data from datasets repo
  const citizenCountFileUrl: string = 'https://raw.githubusercontent.com/nation3/nationcred-datasets/main/data-sources/citizens/output/citizen-count-per-week.csv'
  console.info('Fetching citizen count data:', citizenCountFileUrl)
  const citizenCountResponse = await fetch(citizenCountFileUrl)
  console.log('citizenCountResponse.status:', citizenCountResponse.status)
  const citizenCountData = await citizenCountResponse.text()
  const total_citizens_count: number[] = []
  const total_expired_passports: number[] = []
  Papa.parse(citizenCountData, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
    complete: (result: any) => {
      // console.info('result:', result)
      result.data.forEach((row: any, i: number) => {
        // console.info(`row ${i}`, row)
        total_citizens_count[i] = Number(row.total_citizens)
        total_expired_passports[i] = Number(row.total_expired_passports)
      })
      // console.info('total_citizens_count:', total_citizens_count)
      // console.info('total_expired_passports:', total_expired_passports)
    }
  })

  // Fetch citizen data from datasets repo
  let citizens = null
  const citizenDataFileUrl: string = 'https://raw.githubusercontent.com/nation3/nationcred-datasets/main/data-sources/citizens/output/citizens.json'
  // console.info('Fetching citizen data:', citizenDataFileUrl)
  const response = await fetch(citizenDataFileUrl)
  // console.log('response.status:', response.status)
  citizens = await response.json()
  
  // Fetch NationCred scores data from datasets repo
  const nationCredScoresFileUrl: string = 'https://raw.githubusercontent.com/nation3/nationcred-datasets/main/nationcred/output/nationcred-scores.csv'
  console.log('Fetching NationCred scores data:', nationCredScoresFileUrl)
  const nationCredScoresResponse = await fetch(nationCredScoresFileUrl)
  console.log('nationCredScoresResponse.status:', nationCredScoresResponse.status)
  const nationCredScoresData = await nationCredScoresResponse.text()
  const nationcred_scores_accumulated: number[] = []
  Papa.parse(nationCredScoresData, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
    complete: (result: any) => {
      result.data.forEach((row: any, i: number) => {
        nationcred_scores_accumulated[i] = Number(row.nationcred_score_accumulated)
      })
    }
  })

  return {
    props: {
      total_citizens_count,
      total_expired_passports,
      active_citizens_count,
      citizens,
      nationcred_scores_accumulated
    },
    revalidate: 10  // In seconds
  }
}
