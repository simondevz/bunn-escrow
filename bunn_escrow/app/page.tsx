import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="mx-3 my-10 md:my-20 lg:mx-28 flex flex-col-reverse md:flex-row gap-7 justify-between items-center">
      <div className = "text-center">
        <h1 className = "text-3xl lg:text-6xl font-bold mb-5">Welcome to The Escrow Manager</h1>
        <div className = "text-xl lg:text-4xl mb-5">
          <p>Powered by Blockchain technology</p>
          <p>Let&apos;s help you manage your escrows</p>
        </div>
        <button className = "bg-customColors-secondary transition-all ease-in-out delay-100 text-white font-bold lg:text-2xl px-6 py-3 lg:px-16 lg:py-6 rounded-lg duration-300 hover:text-[#1BA9B5] hover:scale-125">
          <Link href = "/create" className='cursor-pointer'>Create an escrow now</Link>
        </button>
      </div>
      <Image width={300} height={300} className = "md:w-1/2 rounded-xl" src="https://www.shutterstock.com/image-photo/escrow-agreement-concept-business-management-260nw-2292137823.jpg" alt="Hero image" />
    </main>
  )
}
