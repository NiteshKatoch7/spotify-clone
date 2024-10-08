import React from 'react'
import Logo from '../assets/images/Logo.png';
import dp from '../assets/images/dp.jpg';

export default function MiniSidebar() {

    return (
      <div className="hidden lg:flex w-[20%] h-screen flex flex-col justify-between">
          <div className="p-5">
            <img src={Logo} alt="Spotify" className="w-[130px] mb-6" />
          </div>
          <div className="p-5">
            <img src={dp} alt="Spotify" className="w-[48px] rounded-full" />
          </div>
      </div>
    )
}
