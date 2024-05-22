'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { IDiary } from '@/app/types/type'
import Image from 'next/image'
import moment from 'moment'
import {
    ainmom,
    bareun,
    kyobo,
    omyu,
    ridi,
    shin,
    pretendard,
} from '@/app/components/fonts/fonts'
import { useSession } from 'next-auth/react'
import LoadingCat from '@/app/components/LoadingCat'
import Sunny from '@/app/components/weathers/Sunny'
import Snowy from '@/app/components/weathers/Snowy'
import Windy from '@/app/components/weathers/Windy'
import Rainy from '@/app/components/weathers/Rainy'
import Cloudy from '@/app/components/weathers/Cloudy'
import { useRouter } from 'next/navigation'
interface Props {
    id: string
}

const CommunityDetail = ({ params }: { params: Props }) => {
    const { data: session } = useSession<any>()
    const [view, setView] = useState<IDiary>()
    const [img, setImg] = useState<string[]>([])
    const [selImg, setSelImg] = useState('')
    const [font, setFont] = useState(0)
    const num = parseInt(params.id)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    // const router = useRouter()
    const fontList = [
        ['프리텐다드', pretendard.className],
        ['바른히피', bareun.className],
        ['오뮤 다예쁨', omyu.className],
        ['리디바탕', ridi.className],
        ['아인맘', ainmom.className],
        ['교보 손글씨', kyobo.className],
        ['신동엽 손글씨', shin.className],
    ]

    // 숫자로 변환했는데 NaN이면 없는 페이지.
    if (isNaN(num)) {
        notFound()
    }

    const getDiary = async () => {
        setLoading(true)

        // 1. 일기 읽어오기
        const res = await fetch(`http://43.202.125.125:8000/community/${num}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.accessToken}`,
            },
        })
        const result = await res.json()

        console.log(result)
        setView((prev) => result)
        // setFont(() => data.result.diary_font)
        setImg((prev) => {
            return result.image_set[0].image_url
        })
        setSelImg((prev) => result.image_set[0].image_url)
        setLoading(false)
    }
    useEffect(() => {
        getDiary()
    }, [num])

    const handleReturn = () => {
        router.push(`/community?page=1`)
    }
    return loading ? (
        <LoadingCat text={'읽어오고 있어요'} />
    ) : (
        <div className="w-full flex justify-center items-center p-[7px] mt-[-20px]">
            <div className="relative w-[1280px] flex flex-col items-end p-[30px]  border rounded-md shadow-lg mt-[40px] dark:bg-[#474747]">
                <div className="border shadow-lg absolute p-[10px] rounded-md my-[20px] flex flex-col justify-center items-center top-[-20px] right-[-150px] dark:bg-[#474747]">
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
                    <div style={{ width: 120, whiteSpace: 'nowrap', 
                    overflow: 'hidden', textOverflow: 'ellipsis' ,cursor : 'pointer'
                    }} title={view?.music.music_title} >
                        {(view?.music.music_title as string)}</div>

                </div>
                {/* emotion */}
                <div className="w-full py-[10px] mt-[20px] flex flex-col items-center justify-center">
                    <div className="flex">
                        <div className="flex flex-col items-center gap-[15px] w-full ">
                            <Image
                                src={`/${view?.emotion_set[0].emotion_label}.png`}
                                width={110}
                                height={110}
                                alt={`${view?.emotion_set[0].emotion_label}`}
                                className={`w-[110px] h-[110px]`}
                            />

                            <div
                                className=" justify-center content-center items-center
              px-[12px] py-[7px] bg-[#8bb89a] whitespace-nowrap rounded-md translate-x-[0%] text-black after:absolute after:top-[-10px] after:left-[50%] after:translate-x-[-50%] after:border-t-0 after:border-r-[10px] after:border-b-[15px] after:border-l-[10px] after:border-t-[transparent] after:border-r-[transparent] after:border-b-[#8bb89a] after:border-l-[transparent]"
                            >
                                <div className="text-black text-center text-[15px]">
                                    ${view?.emotion_set[0].chat}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* user image */}
                <div className="w-full py-[10px] flex flex-col justify-center items-center">
                    <div className="mt-[30px] w-full flex">
                        <div className="mr-[30px] h-[350px] shadow-lg dark:bg-[#666] border hover:border-1 focus-within:border-1 ">
                            <div className="w-[300px] h-[300px] p-3 rounded-md object-contain flex justify-center items-center overflow-hidden">
                                {
                                    <Image
                                        src={selImg}
                                        alt="preview"
                                        width={300}
                                        height={300}
                                    />
                                }
                            </div>
                        </div>
                        <div className="w-full flex flex-col">
                            {/* diary content */}
                            <div
                                className={`border max-w-4xl h-[350px] overflow-y-scroll outline-none rounded-md p-[25px] text-lg bg-[transparent] shadow-lg dark:bg-[#666] ${fontList[font][1]} leading-9 whitespace-pre-wrap`}
                            >
                                {view?.content}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#8bb89a] text-white px-[14px] py-[7px] rounded-md cursor-pointer opacity-[0.8] hover:opacity-[1] ml-4">
                    <span className="text-lg" onClick={handleReturn}>
                        돌아가기
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CommunityDetail
