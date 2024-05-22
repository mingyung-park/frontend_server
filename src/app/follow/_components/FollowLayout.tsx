'use client'

import { IFollow } from '../types'
import { userInfo } from '@/app/lib/atoms/atom'
import moment from 'moment'
import { Image } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { useSession } from 'next-auth/react'
interface Props {
    data: IFollow
    userImg: any
}
const emotionImg: { [key: string]: string } = {
    normal: '/nothinking.png',
    sad: '/sad.png',
    angry: '/angry.png',
    suprise: '/joy.png',
    happy: '/3_love.png',
    depress: '/depress.png',
}
const Follow = ({ data, userImg }: Props) => {
    // const [user, setUser] = useRecoilState(userInfo)
    const router = useRouter()
    const { data: session } = useSession()

    const Reject = async () => {
        const res = await fetch(
            `http://43.202.125.125:8000/follow/${data.id}/`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            },
        )
        if (res) {
            window.location.href = '/follow?page=1'
        }
    }
    const Accept = async () => {
        const res = await fetch(
            `http://43.202.125.125:8000/follow/${data.id}/`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            },
        )
        if (res) {
            window.location.href = '/follow?page=1'
        }
    }
    const Delete = async () => {
        const res = await fetch(
            `http://43.202.125.125:8000/follow/${data.id}/`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            },
        )
        if (res) {
            window.location.href = '/follow?page=1'
        }
    }

    return (
        <div className="border border-[#ddd] dark:bg-[#474747] dark:border-[#555] relative w-[350px] h-[160px] rounded-[20px] flex flex-col justify-between overflow-hidden pb-[10px] shadow-lg mx-[35px] mb-[140px] hover:shadow-xl hover:scale-[1.02] ease-in duration-200">
            <div className="flex flex-col w-full p-[20px] justify-around">
                <div className="flex flex-col w-full">
                    <span className="text-[18px] font-pretendard dark:text-[white]">
                        {session && session.user.pk === data.follower
                            ? data.following_user_username
                            : data.follower_username}
                    </span>
                    <pre className="text-sm mt-[20px] text-gray-500 whitespace-pre-wrap font-pretendard dark:text-[#bbb]">
                        {data.status}
                    </pre>
                </div>
            </div>
            <div className="flex flex-col mb-[20px] ml-[20px]">
                {data.status === 'rejected' ? (
                    <div
                        className="border border-[#ddd] dark:bg-[#474747] dark:border-[#555] relative w-[80px] h-[30px] rounded-[10px] flex justify-center items-center overflow-hidden pb-[0px] shadow-lg mx-[5px] mb-[1px] hover:shadow-xl hover:scale-[1.02] ease-in duration-200 cursor-pointer"
                        onClick={() => Delete()}
                    >
                        <span className="text-white-600 text-[15px] dark:text-[white]">
                            ❌Delete
                        </span>
                    </div>
                ) : data.status === 'requested' &&
                  session.user.pk !== data.follower ? (
                    <div className="flex flex-row">
                        <div
                            className="border border-[#ddd] dark:bg-[#474747] dark:border-[#555] relative w-[80px] h-[30px] rounded-[10px] flex justify-center items-center overflow-hidden pb-[0px] shadow-lg mx-[5px] mb-[1px] hover:shadow-xl hover:scale-[1.02] ease-in duration-200 cursor-pointer"
                            onClick={() => Accept()}
                        >
                            <span className="text-white-600 text-[15px] dark:text-[white]">
                                🟢Accept
                            </span>
                        </div>
                        <div
                            className="border border-[#ddd] dark:bg-[#474747] dark:border-[#555] relative w-[80px] h-[30px] rounded-[10px] flex justify-center items-center overflow-hidden pb-[0px] shadow-lg mx-[5px] mb-[1px] hover:shadow-xl hover:scale-[1.02] ease-in duration-200 cursor-pointer"
                            onClick={() => Reject()}
                        >
                            <span className="text-white-600 text-[15px] dark:text-[white]">
                                🔴Reject
                            </span>
                        </div>
                        <div
                            className="border border-[#ddd] dark:bg-[#474747] dark:border-[#555] relative w-[80px] h-[30px] rounded-[10px] flex justify-center items-center overflow-hidden pb-[0px] shadow-lg mx-[5px] mb-[1px] hover:shadow-xl hover:scale-[1.02] ease-in duration-200 cursor-pointer"
                            onClick={() => Delete()}
                        >
                            <span className="text-white-600 text-[15px] dark:text-[white]">
                                🥺Delete
                            </span>
                        </div>
                    </div>
                ) : (
                    <div
                        className="border border-[#ddd] dark:bg-[#474747] dark:border-[#555] relative w-[80px] h-[30px] rounded-[10px] flex justify-center items-center overflow-hidden pb-[0px] shadow-lg mx-[5px] mb-[1px] hover:shadow-xl hover:scale-[1.02] ease-in duration-200 cursor-pointer"
                        onClick={() => Delete()}
                    >
                        <span className="text-white-600 text-[15px] dark:text-[white]">
                            🥺Delete
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Follow
