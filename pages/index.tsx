import React, { Context, useEffect, useRef, useState } from "react"
import { IdentificationIcon } from "@heroicons/react/24/outline"
import type { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import GradientLink from "../components/GradientLink"
import HomeCard from '../components/HomeCard'
import flag from '../public/flag.svg'

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

    const data = {
      labels: ['2022-10-01', '2022-10-08', '2022-10-15', '2022-10-22'],
      datasets: [
        {
          label: 'Total Citizens',
          data: [178, 180, 181, 183],
          borderColor: 'rgba(53, 162, 235, 0.4)',
          backgroundColor: gradientBlue,
          fill: true
        },
        {
          label: 'Active Citizens',
          data: [12, 17, 15, 18],
          borderColor: 'rgba(136, 241, 187, 1)',
          backgroundColor: gradientGreen,
          fill: true
        }
      ]
    }

    setChartData(data)
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
