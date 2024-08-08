import React from 'react'
import Logo from '../../assets/images/Logo.png';
import Profile from '../../assets/images/Profile.png';
import { FloatingWrapper } from './MainContainerStyle';

export default function FloatingHeader() {
  return (
    <FloatingWrapper className="lg:hidden px-4 w-full inset-0 flex justify-between items-center">
        <div className="py-2">
          <img src={Logo} alt="Spotify" className="w-[100px]" />
        </div>
        <div className="py-2">
          <img src={Profile} alt="Spotify" className="w-[48px]" />
        </div>
    </FloatingWrapper>
  )
}
