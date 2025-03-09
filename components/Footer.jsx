import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'

const Footer = () => {
    return (
        <div className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center'>
            <Image src={assets.logo} alt='' width={120} />
            <p className='text-sm text-white'>All rights reserved. Copyright @Satvik.</p>
            <div className='flex '>
                <Image src={assets.logo} alt='' width={40} />
                <Image src={assets.logo} alt='' width={40} />
                <Image src={assets.logo} alt='' width={40} />
            </div>
        </div>
    )
}

export default Footer