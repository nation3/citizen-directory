import { NextPage } from "next"
import { useEffect, useRef, useState } from "react"
import dework from '../../public/dework.svg'

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
import Image from "next/image"
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

export function NationCredChart({ profile }: any) {
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
    colorGradient.addColorStop(0, 'rgba(213, 163, 152, 0.2)')
    colorGradient.addColorStop(1, 'rgba(213, 163, 152, 0.8)')

    // Fetch data from datasets repo
    const sourceCredFileUrl: string = `https://raw.githubusercontent.com/nation3/nationcred-datasets/f9e5b8d30b969815a918de619fa4e89a1c800ce3/data-sources/sourcecred/output/sourcecred-${profile.ethAddress}.csv`
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

export function DeworkChart({ profile }: any) {
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
    const deworkFileUrl: string = `https://raw.githubusercontent.com/nation3/nationcred-datasets/main/data-sources/dework/output/dework-${profile.ethAddress}.csv`
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

const ProfilePage: NextPage = ({ profile }: any) => {
  console.info('ProfilePage')

  console.info('profile:', profile)

  return (
    <>
      <div className="flex">
        {profile.ensName ? (
          <img className="mask mask-circle h-12 w-12" src={`https://cdn.stamp.fyi/avatar/eth:${profile.ethAddress}?s=144`} />
        ) : (
          <Blockies className="mask mask-circle" seed={profile.ethAddress} size={24} />
        )}

        <div className="ml-4 font-semibold">
          <h1 className="text-4xl mt-2">
            {profile.ethAddress.substring(0, 6)}...{profile.ethAddress.slice(-4)}
          </h1>
          <h2 className="text-2xl text-gray-400 mt-2">
            Citizen #???
          </h2>
        </div>
      </div>

      <div className="card bg-base-100 mt-4">
        <div className="card-body">
          <button className="btn btn-disabled bg-transparent loading">Loading profile...</button>
        </div>
      </div>

      <h2 className="text-2xl mt-8">🎗️ NationCred</h2>
      
      <div className="card bg-base-100 mt-4">
        <div className="card-body">
          <NationCredChart profile={profile} />
        </div>
      </div>

      <h2 className="text-2xl mt-8"><Image src={dework} width={22} height={22} /> Dework</h2>
      
      <div className="card bg-base-100 mt-4">
        <div className="card-body">
          <DeworkChart profile={profile} />
        </div>
      </div>

      <h2 className="text-2xl mt-8">🗳️ Voting Power</h2>
      
      <div className="card bg-base-100 mt-4">
        <div className="card-body">
          <button className="btn btn-disabled bg-transparent loading">Loading votes...</button>
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
      { params: { ethAddress: '0x123abc' } },
      { params: { ethAddress: '0x456def' } }
    ],
    fallback: 'blocking'
  }
}

export async function getStaticProps(context: any) {
  console.info('getStaticProps')

  console.info('context:', context)

  const ethAddress: string = context.params.ethAddress
  console.info('ethAddress:', ethAddress)

  return {
    props: {
      profile: { ethAddress: ethAddress }
    }
  }
}

export default ProfilePage
