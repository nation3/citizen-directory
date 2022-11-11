import React, { Context, useEffect, useRef, useState } from "react"
import { IdentificationIcon } from "@heroicons/react/24/outline"
import type { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import GradientLink from "../components/GradientLink"
import HomeCard from '../components/HomeCard'
import flag from '../public/flag.svg'
import Papa from 'papaparse'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData
} from 'chart.js'
import { Line } from 'react-chartjs-2'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
)

export function CitizenChart() {
  console.info('CitizenChart')

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

    let gradientBlue = chart.ctx.createLinearGradient(0, 0, 0, 400)
    gradientBlue.addColorStop(0, 'rgba(53, 162, 235, 0.2)')
    gradientBlue.addColorStop(1, 'rgba(53, 162, 235, 0.1)')

    let gradientGreen = chart.ctx.createLinearGradient(0, 0, 0, 400)
    gradientGreen.addColorStop(0, 'rgba(136, 241, 187, 0.6)')
    gradientGreen.addColorStop(1, 'rgba(136, 241, 187, 0.3)')

    // Fetch data from datasets repo
    const citizenCountFileUrl: string = 'https://raw.githubusercontent.com/nation3/nationcred-datasets/main/data-sources/citizens/citizen-count-per-week.csv'
    console.info('Fetching data:', citizenCountFileUrl)
    Papa.parse(citizenCountFileUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result: any) => {
        console.info('result:', result)

        const week_end_dates: string[] = []
        const total_citizen_count: number[] = []
        const active_citizen_count: number[] = []
        result.data.forEach((row: Object, i: number) => {
          console.info(`row ${i}`, row)
          week_end_dates[i] = String(row.week_end)
          total_citizen_count[i] = Number(row.total_citizens)
          active_citizen_count[i] = Number(row.active_citizens)
        })
        console.info('week_end_dates:', week_end_dates)
        console.info('total_citizen_count:', total_citizen_count)
        console.info('active_citizen_count:', active_citizen_count)
    
        const data = {
          labels: week_end_dates,
          datasets: [
            {
              label: 'Total Citizens',
              data: total_citizen_count,
              borderColor: 'rgba(53, 162, 235, 0.4)',
              backgroundColor: gradientBlue,
              fill: true
            },
            {
              label: 'Active Citizens',
              data: active_citizen_count,
              borderColor: 'rgba(136, 241, 187, 1)',
              backgroundColor: gradientGreen,
              fill: true
            }
          ]
        }
    
        setChartData(data)
      }
    })
  }, [])

  return <Line ref={chartRef} data={chartData} />
}

const Home: NextPage = () => {
  console.info('NextPage')  

  return (
    <>
      <div className="flex flex-col max-w-3xl">
        <h1 className="card-title text-center text-3xl font-semibold mb-8">
          Nation3 Citizens
          <Image src={flag} width={36} height={36} />
        </h1>

        <CitizenChart />

        <p className="mb-8 mt-8">
          Get to know your fellow citizens:
        </p>

        <div className="grid xl:grid-cols-2 mt-2 gap-8">
          <HomeCard
            href="/profile/1"
            icon={
              <IdentificationIcon className="h-5 w-5 absolute right-8 text-n3blue" />
            }
            title="Citizen #1"
            linkText="View citizen profile"
          >
            NationCred: 10/100
          </HomeCard>

          <HomeCard
            href="/profile/2"
            icon={
              <IdentificationIcon className="h-5 w-5 absolute right-8 text-n3blue" />
            }
            title="Citizen #2"
            linkText="View citizen profile"
          >
            NationCred: 0/100
          </HomeCard>

          <HomeCard
            href="/profile/3"
            icon={
              <IdentificationIcon className="h-5 w-5 absolute right-8 text-n3blue" />
            }
            title="Citizen #3"
            linkText="View citizen profile"
          >
            NationCred: 3/100
          </HomeCard>
        </div>
      </div>
    </>
  )
}

export default Home
