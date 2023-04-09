import Image from 'next/image'

export default function Home() {
  return (
    <main className='flex'>
      <div className='w-80 h-screen bg-white p-8'>
        Navbar
      </div>
      <div className='p-8'>
        Content
      </div>
    </main>
  )
}
