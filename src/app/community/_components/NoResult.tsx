'use client'

import Lottie from 'react-lottie-player'
import noresult from '@/app/components/noresult.json'
import Link from 'next/link'

const NoResult = () => {
    return (
        <div className="w-full h-full flex justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] mt-[-60px]">
            <div className="flex flex-col justify-center items-center">
                <Lottie
                    loop
                    animationData={noresult}
                    play
                    style={{ width: 400, height: 400 }}
                />
                <span className={`text-[26px] mt-[-30px] font-bold`}>
                    작성한 일기가 없어요...
                </span>
                <Link href="/write" className="mt-[20px]">
                    <span className="text-lg text-black bg-[#8bb89a] px-[30px] py-[7px] rounded-md shadow-lg"></span>
                </Link>
            </div>
        </div>
    )
}

export default NoResult
