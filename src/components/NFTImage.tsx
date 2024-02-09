
import { useContractRead } from "wagmi"
import LoadingIndicator from "./LoadingIndicator"
import { useIsMounted } from "@/hooks/useIsMounted"
import Link from "next/link"
import ERC721 from "../../abis/ERC721.json"

import Image from 'next/image'

export default function ProfileDetailsGitHub({ citizen }: any) {
  console.info('NFTImage')

  const { data, isError, isLoading }: any = useContractRead({
    address: '0x3337dac9F251d4E403D6030E18e3cfB6a2cb1333',
    abi: ERC721,
    functionName: 'tokenURI',
    args: [citizen.passportId]
  })

  if (!useIsMounted() || isLoading) {
    return <LoadingIndicator />
  } else {
    let image: any = null
    if (data) {
      const json = atob(data.substring(29));
      image = JSON.parse(json);
      console.log(image);
    }
    if (image) {
      return <Image alt="NFT Passport" className="w-full" src={image.image} width={200} height={200} />
    } else {
      return (
        <>
          <code>Cannot load your NFT passport!</code>
        </>
      )
    }
  }
}
