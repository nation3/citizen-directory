import { useContractRead } from "wagmi"
import LoadingIndicator from "./LoadingIndicator"
import VotingEscrow from "../../abis/VotingEscrow.json"
import { useIsMounted } from "../../hooks/useIsMounted"
import { formatEther } from 'viem'

export default function VeNationLockDetails({ address }: any) {
    console.info('VeNationLockDetails')

    const { data, isError, isLoading } = useContractRead({
        address: '0xf7def1d2fbda6b74bee7452fdf7894da9201065d',
        abi: VotingEscrow.abi,
        functionName: 'locked',
        args: [ address ]
    })
    console.info('data:', data)
    console.info('isError:', isError)
    console.info('isLoading:', isLoading)

    if (!useIsMounted() || isLoading) {
        return <LoadingIndicator />
    } else {
        let lockDetails: any = null
        if (data) {
            lockDetails = data
        }
        const lockAmount: number = Number(formatEther(lockDetails[0]))
        console.info('lockAmount:', lockAmount)
        if (lockAmount == 0) {
            return <>{lockAmount.toFixed(2)} <code>$NATION</code> locked</>    
        } else {
            const lockEnd: string = new Date(Number(lockDetails[1]) * 1_000).toISOString().substring(0, 10)
            console.info('lockEnd:', lockEnd)
            return <>{lockAmount.toFixed(2)} <code>$NATION</code> locked until {lockEnd}</>
        }
    }
}
