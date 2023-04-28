// @ts-expect-error
import Blockies from 'react-blockies'

import { useRouter } from 'next/router'
import Menu from '@/components/Menu'

import dework from '../../public/dework.svg'
import sourcecred from '../../public/sourcecred.svg'
import Image from 'next/image'
import LoadingIndicator from '@/components/LoadingIndicator'
import Papa from 'papaparse'

import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function ProfilePage({ citizen, nationCred }: any) {
  console.log('ProfilePage')

  const router = useRouter()

  return (
    <>
      <main className='flex'>
        <Menu />
        <div className='w-4/5 p-8'>
          <div className="flex">
            {router.isFallback ? (
              <LoadingIndicator />
            ) : (
              <>
                {citizen.ensName ? (
                  <img
                    className="rounded-full h-24 w-24 drop-shadow-sm"
                    src={`https://cdn.stamp.fyi/avatar/eth:${citizen.ownerAddress}?s=144`}
                  />
                ) : (
                  <Blockies
                    className="rounded-full"
                    seed={citizen.ownerAddress}
                    size={24}
                  />
                )}
    
                <div className="ml-4 font-bold">
                  <h1 className="text-4xl mt-2">
                    {citizen.ensName
                      ? citizen.ensName
                      : `${citizen.ownerAddress.substring(
                          0,
                          6
                        )}...${citizen.ownerAddress.slice(-4)}`}
                  </h1>
                  <h2 className="text-2xl text-gray-400 mt-2">
                    Citizen #{citizen.passportId}
                  </h2>
                </div>
              </>
            )}
          </div>
          
          <div className='mt-8'>
            <h2 className="text-2xl">Profile Details</h2>
            <div className='mt-2 bg-white dark:bg-slate-800 rounded-lg p-4 drop-shadow-sm'>
              {router.isFallback ? (
                <LoadingIndicator />
              ) : (
                <ul>
                  <li className='text-ellipsis overflow-hidden'>
                    <span className='text-gray-400 '>Ethereum address</span><br />
                    <code>{citizen.ownerAddress}</code>
                  </li>
                  <li className='mt-2'>
                    <span className='text-gray-400 '>GitHub account</span><br />
                    <code>Not linked</code>
                  </li>
                  <li className='mt-2'>
                    <span className='text-gray-400 '>Discord account</span><br />
                    <code>Not linked</code>
                  </li>
                  <li className='mt-2'>
                    <span className='text-gray-400 '>Discourse account</span><br />
                    <code>Not linked</code>
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div className='mt-8'>
            <h2 className="text-2xl">🎗️ NationCred</h2>
            <div className='mt-2 h-64 bg-white dark:bg-slate-800 rounded-lg p-4 drop-shadow-sm'>
              {router.isFallback ? (
                <LoadingIndicator />
              ) : (
                <NationCredChart nationCred={nationCred} />
              )}
            </div>
          </div>

          <div className='mt-8'>
            <h2 className="text-2xl flex">
              <Image alt='SourceCred' src={sourcecred} width={22} height={22} />&nbsp;SourceCred
            </h2>
            <div className='mt-2 bg-white dark:bg-slate-800 rounded-lg p-4 drop-shadow-sm'>
              {router.isFallback ? (
                <LoadingIndicator />
              ) : (
                <SourceCredChart />
              )}
            </div>
          </div>

          <div className='mt-8'>
            <h2 className="text-2xl flex">
              <Image alt='Dework' src={dework} width={22} height={22} />&nbsp;Dework
            </h2>
            <div className='mt-2 bg-white dark:bg-slate-800 rounded-lg p-4 drop-shadow-sm'>
              {router.isFallback ? (
                <LoadingIndicator />
              ) : (
                <DeworkChart />
              )}
            </div>
          </div>

          <div className='mt-8'>
            <h2 className="text-2xl">🗳️ Voting Power</h2>
            <div className='mt-2 bg-white dark:bg-slate-800 rounded-lg p-4 drop-shadow-sm'>
              {router.isFallback ? (
                <LoadingIndicator />
              ) : (
                <VotingPowerChart />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export function NationCredChart({ nationCred }: any) {
  console.info('NationCredChart')
  const chartData = {
    series: [
      {
        name: 'Total Score',
        data: nationCred.scores
      },
      {
        name: 'Value Creation Score',
        data: nationCred.valueCreationScores
      },
      {
        name: 'Governance Score',
        data: nationCred.governanceScores
      },
      {
        name: 'Operations Score',
        data: nationCred.operationsScores
      }
    ],
    options: {
      colors: ['#fbbf24', '#fbbf24', '#fbbf24', '#fbbf24'],
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

export function SourceCredChart({ citizen }: any) {
  console.info('NationCredChart')
  return (
    <>
      SourceCredChart
    </>
  )
}

export function DeworkChart({ citizen }: any) {
  console.info('DeworkChart')
  return (
    <>
      DeworkChart
    </>
  )
}

export function VotingPowerChart({ citizen }: any) {
  console.info('VotingPowerChart')
  return (
    <>
      VotingPowerChart
    </>
  )
}

export async function getStaticPaths() {
  console.info('getStaticPaths')

  return {
    paths: [
      // { params: { passportId: '0' } },
      // { params: { passportId: '1' } },
      // { params: { passportId: '3' } }
    ],
    fallback: true
  }
}

export async function getStaticProps(context: any) {
  console.info('getStaticProps')

  console.info('context:', context)

  const passportId: string = context.params.passportId
  console.info('passportId:', passportId)

  const citizensJsonUrl: string = 'https://raw.githubusercontent.com/nation3/nationcred-datasets/main/data-sources/citizens/output/citizens.json'
  console.info('Fetching citizen data:', citizensJsonUrl)
  const response = await fetch(citizensJsonUrl)
  const citizens = await response.json()

  const citizen = citizens[passportId]
  console.info('citizen:', citizen)

  // Fetch NationCred data from datasets repo
  const nationCredFileUrl: string = `https://raw.githubusercontent.com/nation3/nationcred-datasets/main/nationcred/output/nationcred-${citizen.passportId}.csv`
  console.info('Fetching NationCred data:', nationCredFileUrl)
  const nationCredResponse = await fetch(nationCredFileUrl)
  const nationCredData = await nationCredResponse.text()
  const nationcred_value_creation_scores: number[] = []
  const nationcred_scores: number[] = []
  const nationcred_governance_scores: number[] = []
  const nationcred_operations_scores: number[] = []
  Papa.parse(nationCredData, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
    complete: (result: any) => {
      console.info('result:', result)
      result.data.forEach((row: any, i: number) => {
        console.info(`row ${i}`, row)
        nationcred_scores[i] = Number(row.nationcred_score)
        nationcred_value_creation_scores[i] = Number(row.value_creation_hours)
        nationcred_governance_scores[i] = Number(row.governance_hours)
        nationcred_operations_scores[i] = Number(row.operations_hours)
      })
      console.info('nationcred_scores:', nationcred_scores)
      console.info('nationcred_value_creation_scores:', nationcred_value_creation_scores)
      console.info('nationcred_governance_scores:', nationcred_governance_scores)
      console.info('nationcred_operations_scores:', nationcred_operations_scores)
    }
  })

  return {
    props: {
      citizen: citizen,
      nationCred: {
        scores: nationcred_scores,
        valueCreationScores: nationcred_value_creation_scores,
        governanceScores: nationcred_governance_scores,
        operationsScores: nationcred_operations_scores
      }
    }
  }
}
