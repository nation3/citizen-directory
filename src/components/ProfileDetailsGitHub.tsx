import { useContractRead } from "wagmi"
import LoadingIndicator from "./LoadingIndicator"
import GitHub from "../../abis/GitHub.json"
import { useIsMounted } from "../../hooks/useIsMounted"
import Link from "next/link"

export default function ProfileDetailsGitHub({ address }: any) {
    console.info('ProfileDetailsGitHub')

    const { data, isError, isLoading } = useContractRead({
        address: '0xb989c0c17a3bce679d7586d9e55b6eab11c18687',
        abi: GitHub.abi,
        functionName: 'usernames',
        args: [ address ]
    })
    console.info('data:', data)
    console.info('isError:', isError)
    console.info('isLoading:', isLoading)

    if (!useIsMounted() || isLoading) {
        return <LoadingIndicator />
    } else {
        let gitHubUsername: any = null
        if (data) {
            gitHubUsername = data
        }
        console.info('gitHubUsername:', gitHubUsername)
        if (!gitHubUsername) {
            return (
                <>
                    <code>Not linked</code>
                    <Link className="ml-4 font-bold text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-green-400" href={`https://etherscan.io/address/0xb989c0c17a3bce679d7586d9e55b6eab11c18687#writeContract#F1`}>
                        Update ↗
                    </Link>
                </>
            )
        } else {
            return (
                <Link target="_blank" className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-green-400" href={`https://github.com/${gitHubUsername}`}>
                    <code>@{gitHubUsername}</code>
                </Link>
            )
        }
    }
}
