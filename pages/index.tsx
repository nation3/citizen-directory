import { IdentificationIcon } from "@heroicons/react/24/outline"
import type { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import GradientLink from "../components/GradientLink"
import HomeCard from '../components/HomeCard'
import flag from '../public/flag.svg'

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-col max-w-3xl">
        <h1 className="card-title text-center text-3xl font-semibold mb-2">
          Nation3 Citizens
          <Image src={flag} width={36} height={36} />
        </h1>

        <p className="mb-8">
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
