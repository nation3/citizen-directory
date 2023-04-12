import Image from 'next/image'
import flag from '../../public/flag.svg'

export default function Home() {
  return (
    <main className='flex'>
      <div id='navBar' className='w-80 h-screen p-8'>
        Navbar
      </div>

      <div className='p-8'>
        <h1 className="text-3xl font-medium flex">
          Nation3 Citizens&nbsp;
          <Image src={flag} width={36} height={36} alt='Nation3 Flag' />
        </h1>

        <div className='mt-4'>
          Content
        </div>
      </div>
    </main>
  )
}
