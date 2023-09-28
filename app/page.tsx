'use client'
import Link from 'next/link'

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/payment">
        Lets GO stripe
      </Link>
    </main>
  )
}

export default Home