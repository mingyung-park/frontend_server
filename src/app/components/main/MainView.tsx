'use client'

import Image from 'next/image'
import { bareun } from '@/app/components/fonts/fonts'
import Sunny from '@/app/components/weathers/Sunny'

const DiaryDetail = () => {
    return (
        <div className="w-full h-full flex justify-center items-center p-[7px] fade-div">
            <div className="relative w-[1280px] flex flex-col items-end p-[30px] rounded-md mt-[40px] dark:bg-[#474747]">
                <div className="shadow-lg absolute p-[10px] rounded-md my-[20px] flex flex-col justify-center items-center top-[-20px] right-[-150px] dark:bg-[#474747]">
                    
                <span className="mt-2">🎶오늘의 음악🎶</span>
                    <div className="relative flex flex-col justify-center items-center w-24 h-24 mb-3">
                        {
                            <Image
                                src='/music_icon.png'
                                alt="musicrecommend"
                                width={200}
                                height={200}
                            />
                        }
                    </div>
                    <div> 파이팅 해야지</div>

                
                    <div className="text-black dark:text-[white]">
                        
                    </div>
                </div>
                {/* diary title */}
                <div
                    className={`w-full px-[10px] text-[30px] border-b-[2px] dark:border-[#888] pb-[5px] outline-0 bg-[transparent] text-black dark:text-[white] ${bareun.className}`}
                >
                    한단계 성장
                </div>
                {/* emotion */}
                <div className="w-full py-[10px] flex flex-col items-center justify-center">
                    <div className="flex">
                        <div className="flex flex-col items-center gap-[15px] w-full ">
                            <Image
                                src={`/기쁨.png`}
                                width={70}
                                height={70}
                                alt={`love emo`}
                                className={`w-[70px] h-[70px]`}
                            />
                            {/* advice */}
                            <div
                                className=" justify-center content-center items-center
              px-[12px] py-[4px] bg-[#8bb89a] whitespace-nowrap rounded-md translate-x-[0%] text-black after:absolute after:top-[-10px] after:left-[50%] after:translate-x-[-50%] after:border-t-0 after:border-r-[10px] after:border-b-[15px] after:border-l-[10px] after:border-t-[transparent] after:border-r-[transparent] after:border-b-[#8bb89a] after:border-l-[transparent]"
                            >
                                <div className="text-black text-center text-[15px]">
                                    이번 계기로 한단계 성장할 수 있었기를...!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* user image */}
                <div className="w-full py-[10px] flex flex-col justify-center items-center">
                    <div className="mt-[5px] w-full flex">
                        <div className="mr-[30px] h-[230px] shadow-lg dark:bg-[#555] border dark:border-[#444] hover:border-1 focus-within:border-1 ">
                            <div className="w-[200px] h-[200px] p-3 rounded-md object-contain flex justify-center items-center overflow-hidden">
                                {
                                    <Image
                                        src="/testimage.png"
                                        alt="preview"
                                        width={200}
                                        height={200}
                                    />
                                }
                            </div>
                        </div>
                        <div className="w-full flex flex-col">
                            {/* diary content */}
                            <div
                                className={`border max-w-4xl h-[230px] overflow-y-hidden outline-none rounded-md p-[25px] text-lg bg-[transparent] ${bareun.className} leading-9 whitespace-pre-wrap dark:bg-[#555] dark:border-[#444] dark:text-[white]`}
                            >
                                오늘은 졸업 프로젝트 회의를 했다. 회의를 한 후
                                함께 저녁을 먹고 산책을 하며 프로젝트 이야기를 했는데,                      
                                처음과 비교해보면 한단계 성장한 거 같아서 너무 기뻤다.{'\n'}
                                그리고 산책을 하며 보는 붉은 노을을 보며 내일도 열심히 해야지하고 다짐했다.
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiaryDetail
