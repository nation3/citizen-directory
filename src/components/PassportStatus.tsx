import { useContractRead } from "wagmi"
import LoadingIndicator from "./LoadingIndicator"
import VotingEscrow from "../../abis/VotingEscrow.json"
import { useIsMounted } from "@/hooks/useIsMounted"
import Link from "next/link"
import { formatEther } from "viem"

export default function PassportStatus({ citizen }: any) {
    console.info('PassportStatus')

    const { data, isError, isLoading } = useContractRead({
        address: '0xf7def1d2fbda6b74bee7452fdf7894da9201065d',
        abi: VotingEscrow.abi,
        functionName: 'balanceOf',
        args: [ citizen.ownerAddress ]
    })
    console.info('data:', data)
    console.info('isError:', isError)
    console.info('isLoading:', isLoading)

    if (!useIsMounted() || isLoading) {
        return <LoadingIndicator />
    } else {
        let veNationBalance: any = null
        if (data) {
            veNationBalance = data
        }
        console.info('veNationBalance:', veNationBalance)
        const veNationBalanceNumber: number = Number(formatEther(veNationBalance))
        console.info('veNationBalanceNumber:', veNationBalanceNumber)
        if (veNationBalanceNumber < 1.5) {
            return (
                <>
                    Passport status:
                    <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-slate-700">
                      EXPIRED ⌛
                    </span>
                </>
            )
        } else {
            return (
                <>
                    Passport status:
                    <span className="rounded-full bg-sky-100 px-2 py-1 text-xs font-semibold text-slate-700">
                        ACTIVE 🥳
                    </span>
                </>
            )
        }
    }
}
