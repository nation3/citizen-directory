import { useContractRead } from "wagmi"
import LoadingIndicator from "./LoadingIndicator"
import OperatorSkillLevels from "../../abis/OperatorSkillLevels.json"
import { useIsMounted } from "@/hooks/useIsMounted"
import Link from "next/link"
import { formatEther } from "viem" 

export default function ProfileDetailsOpsSkillRating({ citizen }: any) {
  console.info('ProfileDetailsOpsSkillRating')

  const { data, isError, isLoading } = useContractRead({
    address: '0x8100e77899C24b0F7B516153F84868f850C034BF',
    abi: OperatorSkillLevels.abi,
    functionName: 'skillLevelAverages',
    args: [citizen.ownerAddress]
  })
  console.info('data:', data)
  console.info('isError:', isError)
  console.info('isLoading:', isLoading)

  if (!useIsMounted() || isLoading) {
    return <LoadingIndicator />
  } else {
    let skillLevelAverage: any = null
    if (data) {
      skillLevelAverage = data
    }
    console.info('skillLevelAverage:', skillLevelAverage)
    if (!skillLevelAverage) {
      return (
        <div>
          <Link href={`https://etherscan.io/address/0x8100e77899C24b0F7B516153F84868f850C034BF#writeContract#F1`} target="_blank" className="float-right border rounded-full px-2 ml-8 font-bold text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-green-400">
            Rate 🔗
          </Link>
          <code>Not rated</code>
        </div>
      )
    } else {
      const skillLevelAverageEther: number = Number(formatEther(skillLevelAverage))
      console.info('skillLevelAverageEther:', skillLevelAverageEther)
      const skillLevelAverageRounded: number = Math.round(skillLevelAverageEther)
      console.info('skillLevelAverageRounded:', skillLevelAverageRounded)
      const ratingValues = ['★☆☆☆☆ 1/5', '★★☆☆☆ 2/5', '★★★☆☆ 3/5', '★★★★☆ 4/5', '★★★★★ 5/5']
      const ratingTextColors = ['text-orange-400', 'text-amber-400', 'text-lime-400', 'text-emerald-400', 'text-cyan-400' ]
      return (
        <>
          <Link href={`https://etherscan.io/address/0x8100e77899C24b0F7B516153F84868f850C034BF#writeContract#F1`} target="_blank" className="float-right border rounded-full px-2 ml-8 font-bold text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-green-400">
            Rate 🔗
          </Link>
          <span className={`font-bold ${ratingTextColors[skillLevelAverageRounded - 1]}`}>{ratingValues[skillLevelAverageRounded - 1]}</span>
        </>
      )
    }
  }
}
