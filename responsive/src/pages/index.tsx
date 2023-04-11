import Image from 'next/image'

export default function Home() {
  return (
    <main className='flex'>
      <div id='navBar' className='w-80 h-screen p-8'>
        Navbar
      </div>

      <div className='p-8'>
        <h1 className="text-3xl font-medium">
          Nation3 Citizens
        </h1>

        <div className='mt-4'>
          Content
        </div>
      </div>
    </main>
  )
}
