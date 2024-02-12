// @ts-expect-error
import Blockies from 'react-blockies'

import { useRouter } from 'next/router'
import Menu from '@/components/Menu'

import DeworkLogo from '../../public/dework.svg'
import CoordinapeLogo from '../../public/coordinape.svg'
import SnapshotLogo from '../../public/snapshot.png'
import SourceCredLogo from '../../public/sourcecred.svg'
import Image from 'next/image'
import LoadingIndicator from '@/components/LoadingIndicator'
import Papa from 'papaparse'

import dynamic from 'next/dynamic'
import VeNationLockDetails from '@/components/VeNationLockDetails'
import ProfileDetailsGitHub from '@/components/ProfileDetailsGitHub'
import NFTImage from '@/components/NFTImage'
import Link from 'next/link'
import Head from 'next/head'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function ProfilePage({ citizen, nationCred, veNation, dework, coordinape, snapshot, sourceCred }: any) {
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
                    {/* <Image alt="NFT Passport" className="w-full" src={`https://storage.googleapis.com/nftimagebucket/tokens/0x3337dac9f251d4e403d6030e18e3cfb6a2cb1333/${citizen.passportId}.svg`} width={200} height={200} /> */}
                    <NFTImage citizen={citizen} />

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
                  <p>
                    Accumulated:
                    <span className="ml-1 rounded-full bg-slate-200 px-2 py-1 font-semibold text-slate-700">
                      {Number(nationCred.accumulated).toLocaleString('en-US')}
                    </span>
                  </p>
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

          <div className='mt-8'>
            <h2 className="text-2xl flex">
              <Image alt='Snapshot' src={SnapshotLogo} width={30} height={20} className='rounded-full' />&nbsp;Snapshot
            </h2>
            <div className='mt-2'>
              {!router.isFallback && (
                <>
                  <p>
                    🗳️ Votes: {snapshot.votes_count_accumulated}
                  </p>
                  <p>
                    ✍️ Proposals: {snapshot.proposals_count_accumulated}
                  </p>
                </>
              )}
            </div>
            <div className='mt-2 h-64 bg-white dark:bg-slate-800 rounded-lg p-4 drop-shadow-sm'>
              {router.isFallback ? (
                <LoadingIndicator />
              ) : (
                <SnapshotChart snapshot={snapshot} />
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
            <div className='mt-2'>
              {!router.isFallback && (
                <>
                  <p>
                    Tasks completed/reviewed: {Number(dework.tasks_completed_accumulated).toLocaleString('en-US')}
                  </p>
                  <p>
                    Accumulated task points: {Number(dework.task_points_accumulated).toLocaleString('en-US')}
                  </p>
                </>
              )}
            </div>
            <div className='mt-2 h-64 bg-white dark:bg-slate-800 rounded-lg p-4 drop-shadow-sm'>
              {router.isFallback ? (
                <LoadingIndicator />
              ) : (
                <DeworkChart dework={dework} />
              )}
            </div>
          </div>

          <div className='mt-8'>
            <h2 className="text-2xl flex">
              <Image alt='Coordinape' src={CoordinapeLogo} width={30} height={20} />&nbsp;Coordinape
            </h2>
            <div className='mt-2'>
              {!router.isFallback && (
                <>
                  <p>
                    🧙 Development Guild contributions: {coordinape.dev_contributions_accumulated} ({Number(coordinape.dev_hours_accumulated).toLocaleString('en-US')}h)
                  </p>
                  <p>
                    🎥 Marketing Guild contributions: {coordinape.marketing_contributions_accumulated} ({Number(coordinape.marketing_hours_accumulated).toLocaleString('en-US')}h)
                  </p>
                  <p>
                    ⚙️ Ops Guild contributions: {coordinape.ops_contributions_accumulated} ({Number(coordinape.ops_hours_accumulated).toLocaleString('en-US')}h)
                  </p>
                  <p>
                    🌳 EcoRide Network contributions: {coordinape.ecoride_contributions_accumulated} ({Number(coordinape.ecoride_hours_accumulated).toLocaleString('en-US')}h)
                  </p>
                </>
              )}
            </div>
            <div className='mt-2 h-64 bg-white dark:bg-slate-800 rounded-lg p-4 drop-shadow-sm'>
              {router.isFallback ? (
                <LoadingIndicator />
              ) : (
                <CoordinapeChart coordinape={coordinape} />
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

  let xAxisAnnotations: any = []
  nationCred.is_active_per_week.forEach((isActive: boolean, index: number) => {
    console.info(`isActive ${index}`, isActive)
    if (isActive) {
      // https://apexcharts.com/docs/annotations/
      xAxisAnnotations.push({
        x: index,
        x2: index + 1,
        fillColor: '#B3F7CA'
      })
    }
  })

  const chartData = {
    series: [
      {
        name: 'Active citizen threshold',
        data: new Array(nationCred.scores.length).fill(1)
      },
      {
        name: 'Governance score',
        data: nationCred.governanceScores
      },
      {
        name: 'Operations score',
        data: nationCred.operationsScores
      },
      {
        name: 'Value creation score',
        data: nationCred.valueCreationScores
      },
      {
        name: 'NationCred score',
        data: nationCred.scores
      }
    ],
    options: {
      colors: [
        '#fb923c',
        '#94a3b8',
        '#ca8a04',
        '#f59e0b',
        '#facc15'
      ],
      dataLabels: {
        enabled: false
      },
      chart: {
        toolbar: {
          show: false
        }
      },
      annotations: {
        xaxis: xAxisAnnotations
      }
    }
  }
  return (
    <Chart options={chartData.options} series={chartData.series} type="area" height="100%" />
  )
}

export function SnapshotChart({ citizen, snapshot }: any) {
  console.info('SnapshotChart')
  const chartData = {
    series: [
      {
        name: 'Votes count',
        data: snapshot.votes_count
      },
      {
        name: 'Proposals count',
        data: snapshot.proposals_count
      }
    ],
    options: {
      colors: [
        '#94a3b8',
        '#fbbf24'
      ],
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
  console.info('SourceCredChart')
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
        name: 'Tasks completed/reviewed',
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

export function CoordinapeChart({ citizen, coordinape }: any) {
  console.info('CoordinapeChart')
  const chartData = {
    series: [
      {
        name: '🧙 Development hours',
        data: coordinape.dev_hours
      },
      {
        name: '🎥 Marketing hours',
        data: coordinape.marketing_hours
      },
      {
        name: '⚙️ Ops hours',
        data: coordinape.ops_hours
      },
      {
        name: '🌳 EcoRide Network',
        data: coordinape.ecoride_hours
      }
    ],
    options: {
      colors: [
        '#38bdf8',
        '#a78bfa',
        '#9ca3af',
        '#15803d'
      ],
      dataLabels: {
        enabled: false
      },
      chart: {
        stacked: true,
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
  let nationcred_accumulated: number = 0
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
        nationcred_accumulated += nationcred_scores[i]
        nationcred_value_creation_scores[i] = Number(row.value_creation_hours)
        nationcred_governance_scores[i] = Number(row.governance_hours)
        nationcred_operations_scores[i] = Number(row.operations_hours)
        nationcred_is_active_per_week[i] = Boolean(row.is_active)
      })
      console.info('nationcred_scores:', nationcred_scores)
      console.info('nationcred_accumulated:', nationcred_accumulated)
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
        venation_voting_escrow_per_week[i] = Number(row.voting_escrow)
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
  let dework_tasks_completed_accumulated: number = 0
  const dework_task_points: number[] = []
  let dework_task_points_accumulated: number = 0
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
        dework_tasks_completed_accumulated += dework_tasks_completed[i]
        dework_task_points[i] = Number(row.task_points)
        dework_task_points_accumulated += dework_task_points[i]
      })
      console.info('dework_week_ends:', dework_week_ends)
      console.info('dework_tasks_completed:', dework_tasks_completed)
      console.info('dework_tasks_completed_accumulated:', dework_tasks_completed_accumulated)
      console.info('dework_task_points:', dework_task_points)
      console.info('dework_task_points_accumulated:', dework_task_points_accumulated)
    }
  })

  // Fetch Coordinape data from datasets repo
  const coordinapeFileUrl: string = `https://raw.githubusercontent.com/nation3/nationcred-datasets/main/data-sources/coordinape/output/coordinape-${citizen.passportId}.csv`
  console.info('Fetching Dework data:', coordinapeFileUrl)
  const coordinapeResponse = await fetch(coordinapeFileUrl)
  const coordinapeData = await coordinapeResponse.text()
  console.info('coordinapeData:\n', coordinapeData)
  const coordinape_week_ends: string[] = []
  //
  const coordinape_dev_contributions: number[] = []
  let coordinape_dev_contributions_accumulated: number = 0
  const coordinape_dev_hours: number[] = []
  let coordinape_dev_hours_accumulated: number = 0
  //
  const coordinape_marketing_contributions: number[] = []
  let coordinape_marketing_contributions_accumulated: number = 0
  const coordinape_marketing_hours: number[] = []
  let coordinape_marketing_hours_accumulated: number = 0
  //
  const coordinape_ops_contributions: number[] = []
  let coordinape_ops_contributions_accumulated: number = 0
  const coordinape_ops_hours: number[] = []
  let coordinape_ops_hours_accumulated: number = 0
  //
  const coordinape_ecoride_contributions: number[] = []
  let coordinape_ecoride_contributions_accumulated: number = 0
  const coordinape_ecoride_hours: number[] = []
  let coordinape_ecoride_hours_accumulated: number = 0
  Papa.parse(coordinapeData, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
    complete: (result: any) => {
      console.info('result:', result)
      result.data.forEach((row: any, i: number) => {
        console.info(`row ${i}`, row)
        coordinape_week_ends[i] = String(row.week_end)
        //
        coordinape_dev_contributions[i] = Number(row.dev_contributions)
        coordinape_dev_contributions_accumulated += coordinape_dev_contributions[i]
        coordinape_dev_hours[i] = Number(row.dev_hours)
        coordinape_dev_hours_accumulated += coordinape_dev_hours[i]
        //
        coordinape_marketing_contributions[i] = Number(row.marketing_contributions)
        coordinape_marketing_contributions_accumulated += coordinape_marketing_contributions[i]
        coordinape_marketing_hours[i] = Number(row.marketing_hours)
        coordinape_marketing_hours_accumulated += coordinape_marketing_hours[i]
        //
        coordinape_ops_contributions[i] = Number(row.ops_contributions)
        coordinape_ops_contributions_accumulated += coordinape_ops_contributions[i]
        coordinape_ops_hours[i] = Number(row.ops_hours)
        coordinape_ops_hours_accumulated += coordinape_ops_hours[i]
        //
        coordinape_ecoride_contributions[i] = Number(row.ecoride_contributions)
        coordinape_ecoride_contributions_accumulated += coordinape_ecoride_contributions[i]
        coordinape_ecoride_hours[i] = Number(row.ecoride_hours)
        coordinape_ecoride_hours_accumulated += coordinape_ecoride_hours[i]
      })
      console.info('coordinape_week_ends:', coordinape_week_ends)
      //
      console.info('coordinape_dev_contributions:', coordinape_dev_contributions)
      console.info('coordinape_dev_contributions_accumulated:', coordinape_dev_contributions_accumulated)
      console.info('coordinape_dev_hours:', coordinape_dev_hours)
      console.info('coordinape_dev_hours_accumulated:', coordinape_dev_hours_accumulated)
      //
      console.info('coordinape_marketing_contributions:', coordinape_marketing_contributions)
      console.info('coordinape_marketing_contributions_accumulated:', coordinape_marketing_contributions_accumulated)
      console.info('coordinape_marketing_hours:', coordinape_marketing_hours)
      console.info('coordinape_marketing_hours_accumulated:', coordinape_marketing_hours_accumulated)
      //
      console.info('coordinape_ops_contributions:', coordinape_ops_contributions)
      console.info('coordinape_ops_contributions_accumulated:', coordinape_ops_contributions_accumulated)
      console.info('coordinape_ops_hours:', coordinape_ops_hours)
      console.info('coordinape_ops_hours_accumulated:', coordinape_ops_hours_accumulated)
      //
      console.info('coordinape_ecoride_contributions:', coordinape_ecoride_contributions)
      console.info('coordinape_ecoride_contributions_accumulated:', coordinape_ecoride_contributions_accumulated)
      console.info('coordinape_ecoride_hours:', coordinape_ecoride_hours)
      console.info('coordinape_ecoride_hours_accumulated:', coordinape_ecoride_hours_accumulated)
    }
  })

  // Fetch Snapshot data from datasets repo
  const snapshotFileUrl: string = `https://raw.githubusercontent.com/nation3/nationcred-datasets/main/data-sources/snapshot/output/snapshot-${citizen.passportId}.csv`
  console.info('Fetching Snapshot data:', snapshotFileUrl)
  const snapshotResponse = await fetch(snapshotFileUrl)
  const snapshotData = await snapshotResponse.text()
  console.info('snapshotData:\n', deworkData)
  const snapshot_week_ends: string[] = []
  const snapshot_votes_count: number[] = []
  let snapshot_votes_count_accumulated: number = 0
  const snapshot_proposals_count: number[] = []
  let snapshot_proposals_count_accumulated: number = 0
  Papa.parse(snapshotData, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
    complete: (result: any) => {
      console.info('result:', result)
      result.data.forEach((row: any, i: number) => {
        console.info(`row ${i}`, row)
        snapshot_week_ends[i] = String(row.week_end)
        snapshot_votes_count[i] = Number(row.votes_count)
        snapshot_votes_count_accumulated += snapshot_votes_count[i]
        snapshot_proposals_count[i] = Number(row.proposals_count)
        snapshot_proposals_count_accumulated += snapshot_proposals_count[i]
      })
      console.info('snapshot_week_ends:', snapshot_week_ends)
      console.info('snapshot_votes_count:', snapshot_votes_count)
      console.info('snapshot_votes_count_accumulated:', snapshot_votes_count_accumulated)
      console.info('snapshot_proposals_count:', snapshot_proposals_count)
      console.info('snapshot_proposals_count_accumulated:', snapshot_proposals_count_accumulated)
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
        accumulated: nationcred_accumulated,
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
        tasks_completed_accumulated: dework_tasks_completed_accumulated,
        task_points: dework_task_points,
        task_points_accumulated: dework_task_points_accumulated
      },
      coordinape: {
        week_ends: dework_week_ends,
        //
        dev_contributions: coordinape_dev_contributions,
        dev_contributions_accumulated: coordinape_dev_contributions_accumulated,
        dev_hours: coordinape_dev_hours,
        dev_hours_accumulated: coordinape_dev_hours_accumulated,
        //
        marketing_contributions: coordinape_marketing_contributions,
        marketing_contributions_accumulated: coordinape_marketing_contributions_accumulated,
        marketing_hours: coordinape_marketing_hours,
        marketing_hours_accumulated: coordinape_marketing_hours_accumulated,
        //
        ops_contributions: coordinape_ops_contributions,
        ops_contributions_accumulated: coordinape_ops_contributions_accumulated,
        ops_hours: coordinape_ops_hours,
        ops_hours_accumulated: coordinape_ops_hours_accumulated,
        //
        ecoride_contributions: coordinape_ecoride_contributions,
        ecoride_contributions_accumulated: coordinape_ecoride_contributions_accumulated,
        ecoride_hours: coordinape_ecoride_hours,
        ecoride_hours_accumulated: coordinape_ecoride_hours_accumulated,
      },
      snapshot: {
        week_ends: snapshot_week_ends,
        votes_count: snapshot_votes_count,
        votes_count_accumulated: snapshot_votes_count_accumulated,
        proposals_count: snapshot_proposals_count,
        proposals_count_accumulated: snapshot_proposals_count_accumulated
      },
      sourceCred: {
        week_ends: sourcecred_week_ends,
        sourcecred_scores: sourcecred_sourcecred_scores,
        discord_scores: sourcecred_discord_scores,
        discourse_scores: sourcecred_discourse_scores,
        github_scores: sourcecred_github_scores
      }
    },
    revalidate: 60  // In seconds
  }
}
