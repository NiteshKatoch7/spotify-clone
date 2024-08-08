import React from 'react'
import Logo from '../assets/images/Logo.png';
import Profile from '../assets/images/Profile.png';

export default function MiniSidebar() {

    return (
      <div className="hidden lg:flex w-[20%] h-screen flex flex-col justify-between">
          <div className="p-5">
            <img src={Logo} alt="Spotify" className="w-[130px] mb-6" />
          </div>
          <div className="p-5">
            <img src={Profile} alt="Spotify" className="w-[48px]" />
          </div>
      </div>
    )
}
