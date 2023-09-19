import Menu from "@/components/Menu"
import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"

const GitHubPage: NextPage = () => {
  console.info('GitHubPage')

  const router = useRouter()

  return (
    <>
      <main className='flex-column lg:flex'>
        <Menu />
        
        <div className='w-full lg:w-3/4 p-8'>
          <div className="flex">
            <div className="font-bold">
                <h2 className="text-2xl text-gray-400">
                    Citizen #{router.query.passportId}
                </h2>
            </div>
          </div>
          
          <div className='mt-8'>
            <h2 className="text-2xl">Link My GitHub Account</h2>
            <div className="mt-4">
                <Link
                    href={`/api/${router.query.passportId}/auth/github`} 
                    className="bg-sky-400 hover:bg-sky-500 p-2 px-4 rounded-lg text-white"
                >
                    Authenticate With GitHub
                </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default GitHubPage
