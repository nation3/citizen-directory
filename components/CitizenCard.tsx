import Link from 'next/link'
import GradientLink from './GradientLink'

// @ts-expect-error
import Blockies from 'react-blockies'

import { IdentificationIcon } from '@heroicons/react/24/outline'

export default function CitizenCard({
  passportId,
  ethAddress,
  ensName,
  votingPower
}: any) {
  return (
    <Link href={`/profile/${passportId}`} passHref>
      <div className="card bg-base-100 shadow-md transition ease-in-out hover:-translate-y-1 cursor-pointer">
        <div className="card-body items-stretch items-center ">
          <div className="absolute right-8">
            <IdentificationIcon className="h-5 w-5 text-n3blue" />
            <p className="text-gray-400">#{passportId}</p>
          </div>

          <div className="flex">
            {ensName ? (
              <img className="mask mask-circle h-12 w-12" src={`https://cdn.stamp.fyi/avatar/eth:${ethAddress}?s=144`} />
            ) : (
              <Blockies className="mask mask-circle" seed={ethAddress} size={12} />
            )}

            <h2 className="px-3 card-title text-center font-medium">
              {ensName ? ensName : `${ethAddress.substring(0, 6)}...${ethAddress.slice(-4)}`}
            </h2>
          </div>

          🎗️ NationCred: ?/???<br />
          🗳️ Voting power: {votingPower.toFixed(2)}

          <GradientLink text="View citizen profile" href={`/profile/${passportId}`}>link</GradientLink>
        </div>
      </div>
    </Link>
  )
}
