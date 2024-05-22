'use client'

import { IDiary } from '@/app/types/type'
import moment from 'moment'
import { Image } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
interface Props {
    data: IDiary
    userImg: any
}
const emotionImg: { [key: string]: string } = {
    nervous: '/불안.png',
    sad: '/슬픔.png',
    angry: '/분노.png',
    suprise: '/당황.png',
    happy: '/기쁨.png',
}
const Diary = ({ data, userImg }: Props) => {
    const router = useRouter()

    const userProfile = userImg ? userImg.user_image : '/user.png' //유저 이미지 없으면 대신
    return (
        <div
            className="border border-[#ddd] dark:bg-[#474747] dark:border-[#555] relative w-[350px] h-[500px] rounded-[20px] flex flex-col justify-between overflow-hidden pb-[10px] shadow-lg mx-[35px] mb-[140px] hover:shadow-xl hover:scale-[1.02] ease-in duration-200 cursor-pointer"
            onClick={() => router.push(`/community/${data.id}`)}
        >
            <div className="relative w-full h-[250px] bg-gray-200 object-cover">
                <div className="w-full h-full object-cover overflow-hidden flex justify-center items-center">
                    {data.image_set[0] && (
                        <Image src={data.image_set[0].image_url} />
                    )}
                </div>
                 <div className="absolute p-[7px] w-[60px] h-[60px] rounded-[50%] bg-white shadow-lg bottom-[-30px] right-[30px] object-cover overflow-hidden z-10 dark:bg-[#666]">
                 <img
                        src={
                            data.emotion_set
                                ? `/${data.emotion_set[0].emotion_label}.png`
                                : '/nothinking.png'
                        }
                        alt=""
                        className="w-full h-full"
                    />
                </div> 
            </div>
            <div className="flex flex-col w-full p-[20px] justify-around">
                <div className="flex flex-col w-full">
                    <span className="text-[18px] font-pretendard dark:text-[white]">
                        {data.title.length >= 26
                            ? `${data.title
                                  .replaceAll('\n', ' ')
                                  .slice(0, 26)}...`
                            : data.title.replaceAll('\n', ' ')}
                    </span>
                    <pre className="text-sm mt-[20px] text-gray-500 whitespace-pre-wrap font-pretendard dark:text-[#bbb]">
                        {data.content.length >= 68
                            ? `${data.content
                                  .replaceAll('\n', ' ')
                                  .slice(0, 68)}...`
                            : data.content.replaceAll('\n', ' ')}
                    </pre>
                </div>
            </div>
            <div className="flex items-center mb-[20px] ml-[20px]">
                <div className="w-[45px] h-[45px] rounded-full bg-white shadow-lg overflow-hidden object-cover">
                    {/*유저 프로필 이미지*/}
                    <Image
                        src={userProfile}
                        alt=""
                        className="w-full h-full rounded-full"
                    />
                </div>
                <div className="flex flex-col ml-[15px] justify-center">
                    {/*유저 이름*/}
                    <span className="text-black-600 text-[14px] dark:text-[white]">
                        {data.user.username}
                    </span>
                    {/* <span className="text-white-400 text-[12px] dark:text-[#eee]">
                        {moment(data.diary_userDate).format('YYYY-MM-DD-HH:MM')}
                    </span> */}
                </div>
            </div>
        </div>
    )
}

export default Diary
