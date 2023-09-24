// @ts-expect-error
import Blockies from 'react-blockies'

import { useRouter } from 'next/router'
import Menu from '@/components/Menu'

import DeworkLogo from '../../public/dework.svg'
import SourceCredLogo from '../../public/sourcecred.svg'
import Image from 'next/image'
import LoadingIndicator from '@/components/LoadingIndicator'
import Papa from 'papaparse'

import dynamic from 'next/dynamic'
import VeNationLockDetails from '@/components/VeNationLockDetails'
import ProfileDetailsGitHub from '@/components/ProfileDetailsGitHub'
import Link from 'next/link'
import Head from 'next/head'
import ProfileDetailsPassportStatus from '@/components/ProfileDetailsPassportStatus'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function ProfilePage({ citizen, nationCred, veNation, dework, sourceCred }: any) {
  console.log('ProfilePage')

  const router = useRouter()

  return (
    <>
      {!router.isFallback && (
        <Head>
          <title>Nation3 Citizen #{citizen.passportId}</title>
          <meta property="og:title" content={`Nation3 Citizen #${citizen.passportId}`} />
          <meta property="og:description" content={citizen.ownerAddress} />
          <meta property="og:image" content={`https://cdn.stamp.fyi/avatar/eth:${citizen.ownerAddress}?s=288`} />
        </Head>
      )}
       
      <main className='flex-column lg:flex'>
        <Menu />
        
        <div className='w-full lg:w-3/4 p-8'>
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
            <div className='flex-columns sm:flex sm:space-x-2 lg:space-x-4'>
              <div className='w-full md:w-3/4 lg:w-2/4 mt-2 bg-white dark:bg-slate-800 rounded-lg p-4 drop-shadow-sm'>
                {router.isFallback ? (
                  <LoadingIndicator />
                ) : (
                  <ul>
                    <li className='text-ellipsis overflow-hidden'>
                      <span className='text-gray-400 '>Ethereum address</span><br />
                      <Link target='_blank' className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-green-400" href={`https://etherscan.io/address/${citizen.ownerAddress}`}>
                        <code>{citizen.ownerAddress}</code>
                      </Link>
                    </li>
                    <li className='mt-2'>
                      <span className='text-gray-400 '>Passport status</span><br />
                      <ProfileDetailsPassportStatus citizen={citizen} />
                    </li>
                    <li className='mt-2'>
                      <span className='text-gray-400 '>GitHub account</span><br />
                      <ProfileDetailsGitHub citizen={citizen} />
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
              <div className='w-full md:w-1/4 lg:w-2/4 mt-2 bg-white dark:bg-slate-800 rounded-lg drop-shadow-sm'>
                {router.isFallback ? (
                  <div className='p-4'>
                    <LoadingIndicator />
                  </div>
                ) : (
                  <Link href={`https://etherscan.io/nft/0x3337dac9F251d4E403D6030E18e3cfB6a2cb1333/${citizen.passportId}`} target='_blank'>
                    <Image alt="NFT Passport" className="w-full" src={`https://storage.googleapis.com/nftimagebucket/tokens/0x3337dac9f251d4e403d6030e18e3cfb6a2cb1333/${citizen.passportId}.svg`} width={200} height={200} />
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className='mt-8'>
            <h2 className="text-2xl">🎗️ NationCred</h2>
            <div className='mt-2'>
              {router.isFallback ? (
                <LoadingIndicator />
              ) : (
                <>
                  Citizen activity status:
                  {!nationCred.is_active_per_week[nationCred.is_active_per_week.length - 1] ? (
                    <span className="ml-1 rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-slate-700">
                      INACTIVE 🥲
                    </span>
                  ) : (
                    <span className="ml-1 rounded-full bg-sky-100 px-2 py-1 text-xs font-semibold text-slate-700">
                      ACTIVE 🥳
                    </span>
                  )}
                </>
              )}
            </div>
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
              <Image alt='SourceCred' src={SourceCredLogo} width={32} height={22} />&nbsp;SourceCred
            </h2>
            <div className='mt-2 h-64 bg-white dark:bg-slate-800 rounded-lg p-4 drop-shadow-sm'>
              {router.isFallback ? (
                <LoadingIndicator />
              ) : (
                <SourceCredChart sourceCred={sourceCred} />
              )}
            </div>
          </div>

          <div className='mt-8'>
            <h2 className="text-2xl flex">
              <Image alt='Dework' src={DeworkLogo} width={30} height={20} />&nbsp;Dework
            </h2>
            <div className='mt-2 h-64 bg-white dark:bg-slate-800 rounded-lg p-4 drop-shadow-sm'>
              {router.isFallback ? (
                <LoadingIndicator />
              ) : (
                <DeworkChart dework={dework} />
              )}
            </div>
          </div>

          <div className='mt-8'>
            <h2 className="text-2xl">🗳️ Voting Escrow</h2>
            <div className='mt-2'>
              {router.isFallback ? (
                <LoadingIndicator />
              ) : (
                <VeNationLockDetails address={citizen.ownerAddress} />
              )}
            </div>
            <div className='mt-2 h-64 bg-white dark:bg-slate-800 rounded-lg p-4 drop-shadow-sm'>
              {router.isFallback ? (
                <LoadingIndicator />
              ) : (
                <VotingEscrowChart veNation={veNation} />
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
        name: 'Active citizen threshold',
        data: new Array(nationCred.scores.length).fill(1)
      },
      {
        name: 'NationCred score',
        data: nationCred.scores
      },
      {
        name: 'Value creation score',
        data: nationCred.valueCreationScores
      },
      {
        name: 'Governance score',
        data: nationCred.governanceScores
      },
      {
        name: 'Operations score',
        data: nationCred.operationsScores
      }
    ],
    options: {
      colors: ['#fb923c', '#facc15', '#facc15', '#facc15', '#facc15'],
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

export function SourceCredChart({ citizen, sourceCred }: any) {
  console.info('NationCredChart')
  const chartData = {
    series: [
      {
        name: 'SourceCred score',
        data: sourceCred.sourcecred_scores
      },
      {
        name: 'Discord score',
        data: sourceCred.discord_scores
      },
      {
        name: 'Discourse score',
        data: sourceCred.discourse_scores
      },
      {
        name: 'GitHub score',
        data: sourceCred.github_scores
      }
    ],
    options: {
      colors: ['#d5a398', '#d6d3d1', '#a8a29e', '#78716c'],
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

export function DeworkChart({ citizen, dework }: any) {
  console.info('DeworkChart')
  const chartData = {
    series: [
      {
        name: 'Tasks completed',
        data: dework.tasks_completed
      },
      {
        name: 'Task points',
        data: dework.task_points
      }
    ],
    options: {
      colors: ['#e7588f', '#8572d9'],
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

export function VotingEscrowChart({ citizen, veNation }: any) {
  console.info('VotingEscrowChart')
  const chartData = {
    series: [
      {
        name: 'Passport expiry threshold',
        data: new Array(veNation.voting_escrow_per_week.length).fill(1.5)
      },
      {
        name: 'Voting escrow',
        data: veNation.voting_escrow_per_week
      }
    ],
    options: {
      colors: ['#fb923c', '#38bdf8'],
      dataLabels: {
        enabled: false
      },
      chart: {
        toolbar: {
          show: false
        }
      },
      yaxis: {
        min: 0
      }
    }
  }
  return (
    <Chart options={chartData.options} series={chartData.series} type="area" height="100%" />
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
  const nationcred_is_active_per_week: boolean[] = []
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
        nationcred_is_active_per_week[i] = Boolean(row.is_active)
      })
      console.info('nationcred_scores:', nationcred_scores)
      console.info('nationcred_value_creation_scores:', nationcred_value_creation_scores)
      console.info('nationcred_governance_scores:', nationcred_governance_scores)
      console.info('nationcred_operations_scores:', nationcred_operations_scores)
      console.info('nationcred_is_active_per_week:', nationcred_is_active_per_week)
    }
  })

  // Fetch $veNATION data from datasets repo
  const veNationFileUrl: string = `https://raw.githubusercontent.com/nation3/nationcred-datasets/main/data-sources/citizens/output/citizen-${citizen.passportId}.csv`
  console.info('Fetching $veNATION data:', veNationFileUrl)
  const veNationResponse = await fetch(veNationFileUrl)
  const veNationData = await veNationResponse.text()
  console.info('veNationData:\n', veNationData)
  const venation_voting_escrow_per_week: number[] = []
  Papa.parse(veNationData, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
    complete: (result: any) => {
      console.info('result:', result)
      result.data.forEach((row: any, i: number) => {
        console.info(`row ${i}`, row)
        venation_voting_escrow_per_week[i] = Number(row.voting_power)
      })
      console.info('venation_voting_escrow_per_week:', venation_voting_escrow_per_week)
    }
  })

  // Fetch Dework data from datasets repo
  const deworkFileUrl: string = `https://raw.githubusercontent.com/nation3/nationcred-datasets/main/data-sources/dework/output/dework-${citizen.passportId}.csv`
  console.info('Fetching Dework data:', deworkFileUrl)
  const deworkResponse = await fetch(deworkFileUrl)
  const deworkData = await deworkResponse.text()
  console.info('deworkData:\n', deworkData)
  const dework_week_ends: string[] = []
  const dework_tasks_completed: number[] = []
  const dework_task_points: number[] = []
  Papa.parse(deworkData, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
    complete: (result: any) => {
      console.info('result:', result)
      result.data.forEach((row: any, i: number) => {
        console.info(`row ${i}`, row)
        dework_week_ends[i] = String(row.week_end)
        dework_tasks_completed[i] = Number(row.tasks_completed)
        dework_task_points[i] = Number(row.task_points)
      })
      console.info('dework_week_ends:', dework_week_ends)
      console.info('dework_tasks_completed:', dework_tasks_completed)
      console.info('dework_task_points:', dework_task_points)
    }
  })

  // Fetch SourceCred data from datasets repo
  const sourceCredFileUrl: string = `https://raw.githubusercontent.com/nation3/nationcred-datasets/main/data-sources/sourcecred/output/sourcecred-${citizen.passportId}.csv`
  console.info('Fetching SourceCred data:', sourceCredFileUrl)
  const sourceCredResponse = await fetch(sourceCredFileUrl)
  const sourceCredData = await sourceCredResponse.text()
  console.info('sourceCredData:\n', deworkData)
  const sourcecred_week_ends: string[] = []
  const sourcecred_sourcecred_scores: number[] = []
  const sourcecred_discord_scores: number[] = []
  const sourcecred_discourse_scores: number[] = []
  const sourcecred_github_scores: number[] = []
  Papa.parse(sourceCredData, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
    complete: (result: any) => {
      console.info('result:', result)
      result.data.forEach((row: any, i: number) => {
        console.info(`row ${i}`, row)
        sourcecred_week_ends[i] = String(row.week_end)
        sourcecred_sourcecred_scores[i] = Number(row.sourcecred_score)
        sourcecred_discord_scores[i] = Number(row.discord_score)
        sourcecred_discourse_scores[i] = Number(row.discourse_score)
        sourcecred_github_scores[i] = Number(row.github_score)
      })
      console.info('sourcecred_week_ends:', sourcecred_week_ends)
      console.info('sourcecred_sourcecred_scores:', sourcecred_sourcecred_scores)
      console.info('sourcecred_discord_scores:', sourcecred_discord_scores)
      console.info('sourcecred_discourse_scores:', sourcecred_discourse_scores)
      console.info('sourcecred_github_scores:', sourcecred_github_scores)
    }
  })

  return {
    props: {
      citizen: citizen,
      nationCred: {
        scores: nationcred_scores,
        valueCreationScores: nationcred_value_creation_scores,
        governanceScores: nationcred_governance_scores,
        operationsScores: nationcred_operations_scores,
        is_active_per_week: nationcred_is_active_per_week
      },
      veNation: {
        voting_escrow_per_week: venation_voting_escrow_per_week
      },
      dework: {
        week_ends: dework_week_ends,
        tasks_completed: dework_tasks_completed,
        task_points: dework_task_points
      },
      sourceCred: {
        week_ends: sourcecred_week_ends,
        sourcecred_scores: sourcecred_sourcecred_scores,
        discord_scores: sourcecred_discord_scores,
        discourse_scores: sourcecred_discourse_scores,
        github_scores: sourcecred_github_scores
      }
    }
  }
}
