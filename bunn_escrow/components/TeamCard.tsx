'use client'

import { useState } from 'react'
import { MdPhone } from 'react-icons/md';
import { RxGithubLogo, RxLinkedinLogo, RxTwitterLogo } from 'react-icons/rx';

interface cardProps{
  twitterUrl: string,
  portfolioUrl : string,
  phone: string,
  linkedInUrl : string,
  emailAddress :string
}

export default function TeamCard({twitterUrl, portfolioUrl, phone, linkedInUrl, emailAddress}: cardProps):JSX.Element {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
      <div className="py-4 px-10 bg-customColors-secondary rounded-2xl flex flex-col items-center">
        <p className='md:text-xl mb-2'>Socials</p>
        <div className='flex items-center gap-5 mb-5'>
          <a href={twitterUrl} target='_blank' rel="noreferrer">
            <RxTwitterLogo size={30} className="transition-all ease-in-out delay-150 hover:scale-125 duration-500"/>
          </a>
          <a href={portfolioUrl} target='_blank' rel="noreferrer">
            <RxGithubLogo size={30} className="transition-all ease-in-out delay-150 hover:scale-125 duration-500"/>
          </a>
          <a href={linkedInUrl} target='_blank' rel="noreferrer">
            <RxLinkedinLogo size={30} className="h-6 w-6 transition-all ease-in-out delay-150 hover:scale-125 duration-500"/>
          </a>
          <a href={phone}>
            <MdPhone size={30} className="transition-all ease-in-out delay-150 hover:scale-125 duration-500"/>
          </a>
        </div>
        <div className='flex flex-col items-center gap-3 md:w-[80%]'>
          <h1 className='md:text-xl -mb-3'>Send a mail</h1>
          <label>
            Message Subject:
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder='Subject'
            className='border-2 text-gray-900  border-black rounded-md p-2 w-full bg-neutral-1000'
          />

          <label>Your message</label>
          <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className="p-2 border-2 w-full text-gray-900  border-black bg-neutral-1000 resize-none rounded-md" placeholder="Write your message here..."></textarea>
          <a href={`mailto:${emailAddress}?subject=${subject}&body=${message}`}>
            <button className='px-4 py-1 bg-slate-400 border rounded-md'>Click to Send an Email</button>
          </a>
        </div>
      </div>
  )
}
