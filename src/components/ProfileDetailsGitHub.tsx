import { useContractRead } from "wagmi"
import LoadingIndicator from "./LoadingIndicator"
import GitHub from "../../abis/GitHub.json"
import { useIsMounted } from "@/hooks/useIsMounted"
import Link from "next/link"

export default function ProfileDetailsGitHub({ citizen }: any) {
  console.info('ProfileDetailsGitHub')

  const { data, isError, isLoading } = useContractRead({
    address: '0xb989c0c17a3bce679d7586d9e55b6eab11c18687',
    abi: GitHub.abi,
    functionName: 'usernames',
    args: [citizen.ownerAddress]
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
          <Link href={`https://etherscan.io/address/0xb989c0c17a3bce679d7586d9e55b6eab11c18687#writeContract#F1`} target="_blank" className="border rounded-full px-2 ml-8 font-bold text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-green-400">
            {/* <Link href={`/${citizen.passportId}/auth/github`} className="border rounded-full px-2 ml-8 font-bold text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-green-400"> */}
            Link my GitHub account 🔗
          </Link>
        </>
      )
    } else {
      return (
        <Link href={`https://github.com/${gitHubUsername}?org=nation3`} target="_blank" className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-green-400">
          <code>@{gitHubUsername}</code>
        </Link>
      )
    }
  }
}
