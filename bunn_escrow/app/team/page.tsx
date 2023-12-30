import TeamCard from "@/components/TeamCard"

export default function Team() {
  return (
    <main className='mt-4'>
      <h2 className='text-center text-2xl font-semibold'>
          Get in touch with us 
      </h2> 
      <div className="mt-4 grid lg:grid-cols-2 gap-10">
        <TeamCard twitterUrl="https://twitter.com/NmesomaHenry" portfolioUrl='https://github.com/IamHenryOkeke' phone='tel:+2347080194374' linkedInUrl='http://www.linkedin.com/in/henry-okeke-3176481a9' emailAddress="iamhenryokeke@gmail.com"/>
        <TeamCard twitterUrl="https://twitter.com/HeyEmdeee" portfolioUrl='https://www.behance.net/heisemdee' phone='tel:+2348106970750' linkedInUrl='http://www.linkedin.com/in/mac-daniel-dokubo' emailAddress="dokubomacdaniel@gmail.com"/>
      </div>
    </main>
  )
}
