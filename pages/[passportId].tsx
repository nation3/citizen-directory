import { useEffect, useRef, useState } from "react"
import { NextPage } from "next"
import Image from "next/image"
import dework from '../public/dework.svg'

// @ts-expect-error
import Blockies from 'react-blockies'

import Papa from 'papaparse'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
)

export function NationCredChart({ citizen }: any) {
  console.info('NationCredChart')

  const chartRef = useRef<ChartJS>(null)
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  })

  useEffect(() => {
    console.info('useEffect')
    const chart = chartRef.current

    if (!chart) {
      return
    }

    let colorGradient = chart.ctx.createLinearGradient(0, 0, 0, 400)
    colorGradient.addColorStop(0, 'rgba(250, 188, 60, 0.2)')
    colorGradient.addColorStop(1, 'rgba(152, 247, 44, 0.8)')

    // Fetch data from datasets repo
    const nationCredFileUrl: string = `https://raw.githubusercontent.com/nation3/nationcred-datasets/main/nationcred/output/nationcred-${citizen.passportId}.csv`
    console.info('Fetching NationCred data:', nationCredFileUrl)
    Papa.parse(nationCredFileUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result: any) => {
        console.info('result:', result)

        const week_ends: string[] = []
        const value_creation_hours: number[] = []
        const nationcred_scores: number[] = []
        const governance_hours: number[] = []
        const operations_hours: number[] = []
        result.data.forEach((row: any, i: number) => {
          console.info(`row ${i}`, row)
          week_ends[i] = String(row.week_end)
          value_creation_hours[i] = Number(row.value_creation_hours)
          nationcred_scores[i] = Number(row.nationcred_score)
          governance_hours[i] = Number(row.governance_hours)
          operations_hours[i] = Number(row.operations_hours)
        })
        console.info('week_ends:', week_ends)
        console.info('value_creation_hours:', value_creation_hours)
        console.info('nationcred_scores:', nationcred_scores)
        console.info('governance_hours:', governance_hours)
        console.info('operations_hours:', operations_hours)
    
        const data = {
          labels: week_ends,
          datasets: [
            {
              label: 'Value Creation Hour',
              data: value_creation_hours,
              borderColor: 'rgba(56, 195, 255, 0.4)',
              backgroundColor: colorGradient,
              fill: true
            },
            {
              label: 'Governance Hour',
              data: governance_hours,
              borderColor: 'rgba(19, 116, 138, 0.2)'
            },
            {
              label: 'Operations Hour',
              data: operations_hours,
              borderColor: 'rgba(132, 116, 138, 0.2)'
            },
            {
              label: 'Nationcred Score',
              data: nationcred_scores,
              borderColor: 'rgba(152, 247, 44, 0.2)'
            }
          ]
        }
    
        setChartData(data)
      }
    })
  }, [])

  return <Chart type='line' ref={chartRef} data={chartData} />
}

export function SourceCredChart({ citizen }: any) {
  console.info('SourceCredChart')

  const chartRef = useRef<ChartJS>(null)
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  })

  useEffect(() => {
    console.info('useEffect')
    const chart = chartRef.current

    if (!chart) {
      return
    }

    let colorGradient = chart.ctx.createLinearGradient(0, 0, 0, 400)
    colorGradient.addColorStop(0, 'rgba(213, 163, 152, 0.2)')
    colorGradient.addColorStop(1, 'rgba(213, 163, 152, 0.8)')

    // Fetch data from datasets repo
    const sourceCredFileUrl: string = `https://raw.githubusercontent.com/nation3/nationcred-datasets/main/data-sources/sourcecred/output/sourcecred-${citizen.passportId}.csv`
    console.info('Fetching SourceCred data:', sourceCredFileUrl)
    Papa.parse(sourceCredFileUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result: any) => {
        console.info('result:', result)

        const week_ends: string[] = []
        const sourcecred_scores: number[] = []
        const discord_scores: number[] = []
        const discourse_scores: number[] = []
        const github_scores: number[] = []
        result.data.forEach((row: any, i: number) => {
          console.info(`row ${i}`, row)
          week_ends[i] = String(row.week_end)
          sourcecred_scores[i] = Number(row.sourcecred_score)
          discord_scores[i] = Number(row.discord_score)
          discourse_scores[i] = Number(row.discourse_score)
          github_scores[i] = Number(row.github_score)
        })
        console.info('week_ends:', week_ends)
        console.info('sourcecred_scores:', sourcecred_scores)
        console.info('discord_scores:', discord_scores)
        console.info('discourse_scores:', discourse_scores)
        console.info('github_scores:', github_scores)
    
        const data = {
          labels: week_ends,
          datasets: [
            {
              label: 'SourceCred score',
              data: sourcecred_scores,
              borderColor: 'rgba(213, 163, 152, 0.4)',
              backgroundColor: colorGradient,
              fill: true
            },
            {
              label: 'Discord score',
              data: discord_scores,
              borderColor: 'rgba(132, 116, 138, 0.2)'
            },
            {
              label: 'Discourse score',
              data: discourse_scores,
              borderColor: 'rgba(132, 116, 138, 0.4)'
            },
            {
              label: 'GitHub score',
              data: github_scores,
              borderColor: 'rgba(132, 116, 138, 0.8)'
            }
          ]
        }
    
        setChartData(data)
      }
    })
  }, [])

  return <Chart type='line' ref={chartRef} data={chartData} />
}

export function DeworkChart({ citizen }: any) {
  console.info('DeworkChart')

  const chartRef = useRef<ChartJS>(null)
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  })

  useEffect(() => {
    console.info('useEffect')
    const chart = chartRef.current

    if (!chart) {
      return
    }

    let colorGradient = chart.ctx.createLinearGradient(0, 0, 0, 400)
    colorGradient.addColorStop(0, 'rgba(231, 88, 143, 0.4)')
    colorGradient.addColorStop(1, 'rgba(231, 88, 143, 0.2)')

    // Fetch data from datasets repo
    const deworkFileUrl: string = `https://raw.githubusercontent.com/nation3/nationcred-datasets/main/data-sources/dework/output/dework-${citizen.passportId}.csv`
    console.info('Fetching Dework data:', deworkFileUrl)
    Papa.parse(deworkFileUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result: any) => {
        console.info('result:', result)

        const week_ends: string[] = []
        const tasks_completed: number[] = []
        const task_points: number[] = []
        result.data.forEach((row: any, i: number) => {
          console.info(`row ${i}`, row)
          week_ends[i] = String(row.week_end)
          tasks_completed[i] = Number(row.tasks_completed)
          task_points[i] = Number(row.task_points)
        })
        console.info('week_ends:', week_ends)
        console.info('tasks_completed:', tasks_completed)
        console.info('task_points:', task_points)
    
        const data = {
          labels: week_ends,
          datasets: [
            {
              label: 'Tasks completed',
              data: tasks_completed,
              borderColor: 'rgba(231, 88, 143, 0.4)',
              backgroundColor: colorGradient,
              fill: true
            },
            {
              label: 'Task points ',
              data: task_points,
              borderColor: 'rgba(133, 114, 217, 0.4)'
            }
          ]
        }
    
        setChartData(data)
      }
    })
  }, [])

  return <Chart type='line' ref={chartRef} data={chartData} />
}

export function VotingPowerChart({ citizen }: any) {
  console.info('VotingPowerChart')

  const chartRef = useRef<ChartJS>(null)
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  })

  useEffect(() => {
    console.info('useEffect')
    const chart = chartRef.current

    if (!chart) {
      return
    }

    let colorGradient = chart.ctx.createLinearGradient(0, 0, 0, 400)
    colorGradient.addColorStop(0, 'rgba(53, 162, 235, 0.2)')
    colorGradient.addColorStop(1, 'rgba(53, 162, 235, 0.1)')

    // Fetch data from datasets repo
    const deworkFileUrl: string = `https://raw.githubusercontent.com/nation3/nationcred-datasets/main/data-sources/citizens/output/citizen-${citizen.passportId}.csv`
    console.info('Fetching Voting Power data:', deworkFileUrl)
    Papa.parse(deworkFileUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result: any) => {
        console.info('result:', result)

        const week_ends: string[] = []
        const voting_power: number[] = []
        result.data.forEach((row: any, i: number) => {
          console.info(`row ${i}`, row)
          week_ends[i] = String(row.week_end)
          voting_power[i] = Number(row.voting_power)
        })
        console.info('week_ends:', week_ends)
        console.info('voting_power:', voting_power)
    
        const data = {
          labels: week_ends,
          datasets: [
            {
              label: 'Voting power',
              data: voting_power,
              borderColor: 'rgba(53, 162, 235, 0.4)',
              backgroundColor: colorGradient,
              fill: true
            }
          ]
        }
    
        setChartData(data)
      }
    })
  }, [])

  const options = {
    scales: {
      y: {
        min: 0
      }
    }
  }

  return <Chart type='line' ref={chartRef} data={chartData} options={options} />
}

const ProfilePage: NextPage = ({ citizen }: any) => {
  console.info('ProfilePage')

  console.info('citizen:', citizen)

  return (
    <>
      <div className="flex">
        {citizen.ensName ? (
          <img className="mask mask-circle h-24 w-24" src={`https://cdn.stamp.fyi/avatar/eth:${citizen.ownerAddress}?s=144`} />
        ) : (
          <Blockies className="mask mask-circle" seed={citizen.ownerAddress} size={24} />
        )}

        <div className="ml-4 font-semibold">
          <h1 className="text-4xl mt-2">
            {citizen.ensName ? citizen.ensName : `${citizen.ownerAddress.substring(0, 6)}...${citizen.ownerAddress.slice(-4)}`}
          </h1>
          <h2 className="text-2xl text-gray-400 mt-2">
            Citizen #{citizen.passportId}
          </h2>
        </div>
      </div>

      <div className="card bg-base-100 mt-4">
        <div className="card-body">
          <button className="btn btn-disabled bg-transparent loading">Loading profile...</button>
        </div>
      </div>

      <h2 className="text-2xl mt-8">📜 NationCred</h2>
      
      <div className="card bg-base-100 mt-4">
        <div className="card-body">
          <NationCredChart citizen={citizen} />
        </div>
      </div>

      <h2 className="text-2xl mt-8">🎗️ SourceCred</h2>

      <div className="card bg-base-100 mt-4">
        <div className="card-body">
          <SourceCredChart citizen={citizen} />
        </div>
      </div>

      <h2 className="text-2xl mt-8"><Image src={dework} width={22} height={22} /> Dework</h2>
      
      <div className="card bg-base-100 mt-4">
        <div className="card-body">
          <DeworkChart citizen={citizen} />
        </div>
      </div>

      <h2 className="text-2xl mt-8">🗳️ Voting Power</h2>

      <p className="mt-4">Voting power: {citizen.votingPower.toFixed(2)}</p>
      <div className="card bg-base-100 mt-4">
        <div className="card-body">
          <VotingPowerChart citizen={citizen} />
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  console.info('getStaticPaths')

  // TODO

  return {
    paths: [
      // { params: { passportId: '0' } },
      // { params: { passportId: '1' } }
    ],
    fallback: 'blocking'
  }
}

export async function getStaticProps(context: any) {
  console.info('getStaticProps')

  console.info('context:', context)

  const passportId: string = context.params.passportId
  console.info('passportId:', passportId)

  const citizensJsonUrl: string = 'https://raw.githubusercontent.com/nation3/nationcred-datasets/main/data-sources/citizens/output/citizens.json'
  console.info('Fetching Citizen data:', citizensJsonUrl)
  const response = await fetch(citizensJsonUrl)
  const citizens = await response.json()
  
  const citizen = citizens[passportId]
  console.info('citizen:', citizen)

  return {
    props: {
      citizen: citizen
    }
  }
}

export default ProfilePage
