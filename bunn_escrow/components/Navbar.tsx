"use client"

import Link from 'next/link';
import { RxHamburgerMenu } from "react-icons/rx";
import { MdClose } from "react-icons/md";
import { useState } from 'react';

const navLinks:{ path: string, name: string}[] = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/create",
      name: "Create An Escrow",
    },
    {
      path: "/explore-escrows",
      name: "Explore Escrows",
    },
    {
      path: "/team",
      name: "Team",
    },
  ];

export default function Navbar():JSX.Element {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    return (
      <nav className='relative flex justify-between items-center'>  
        <Link href="/">
            <h2 className='italic text-xl hover:text-blue-500'>The Escrow Manager</h2>
        </Link>
        <div className='hidden py-5 px-7 bg-gray-900 text-white font-semibold lg:flex gap-12 text-lg'>
          {navLinks.map((item) => {
              return (
                  <Link onClick={toggleMenu} key={item.path} href={item.path} className='hover:text-blue-500'>
                    <span>{item.name}</span>
                  </Link>
              );
          })}
        </div>
        <div className='cursor-pointer lg:hidden'>
          {
            open ? <MdClose onClick={toggleMenu} size={30}/> : <RxHamburgerMenu onClick={toggleMenu} size={30}/>
          }
        </div>
        <div className={`lg:hidden text-sm md:text-base bg-customColors-accent text-white transition-all ease-in-out origin-top-right p-6 md:p-10 rounded-lg absolute z-50 right-0 top-10 flex flex-col gap-5 ${open ? "opacity-100 scale-100" : "opacity-0 scale-0"} duration-500`}>
          <div className="flex flex-col justify-center items-center gap-5">
            {navLinks.map((item) => 
              <Link onClick={toggleMenu} key={item.path} href={item.path} className='hover:text-blue-500'>
                <span>{item.name}</span>
              </Link>
            )}
          </div>
        </div>
      </nav>
    )
}