'use client'

import { useState, forwardRef, useEffect, useLayoutEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/esm/locale'
import DiaryLayout from './_components/DiaryLayout'
import { useRecoilState } from 'recoil'
import { userInfo } from '@/app/lib/atoms/atom'
import { notFound, useSearchParams } from 'next/navigation'
import Pagination from './_components/Pagination'
import { IDiary } from '@/app/types/type'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import LottieCat from '@/app/components/LottieCat'
import NoResult from './_components/NoResult'

const Community = () => {
    const params = useSearchParams()
    // const curDate = new Date()
    // curDate.setFullYear(curDate.getFullYear() - 1)
    // const [startDate, setStartDate] = useState<Date>(curDate)
    // const [endDate, setEndDate] = useState<Date>(new Date())
    const [userImg, setUserImg] = useState('')
    const [user, setUser] = useRecoilState(userInfo)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(6)
    const [loading, setLoading] = useState(false)
    const [view, setView] = useState<IDiary[]>([])
    const curPage = params.get('page') as string
    const { data: session } = useSession()

    useLayoutEffect(() => {
        if (!curPage || isNaN(parseInt(curPage)) === true) {
            notFound()
        }
    }, [curPage])

    useEffect(() => {
        setPage((prev) => Number(curPage))
    }, [curPage])

    useEffect(() => {
        // 페이지와 사용자 정보가 변경되면 데이터 가져오기
        getDiary()
    }, [page])

    const getDiary = async () => {
        // if (!user.pk) return
        setLoading(true)

        const res = await fetch(`http://43.202.125.125:8000/community/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.accessToken}`,
            },
        })
        const result = await res.json()
        console.log(result)
        // 전체 개수
        setTotal((prev) => result.length)

        // 뷰
        setView((prev) => result)

        // setUserImg((prev) => data.userImage)
        setLoading(false)
    }

    useEffect(() => {
        //뷰 상태 변경 시 로그 출력
        console.log('view:', view)
    }, [view])

    useEffect(() => {
        //페이지
        setPage((prev) => Number(curPage))
    }, [curPage])

    // useEffect(() => {
    //     getDiary()
    // }, [page])

    // const CalendarInput = forwardRef(({ value, onClick }: any, ref: any) => (
    //     <>
    //         <div className="flex main-light">
    //             <span>{value}</span>
    //             <img
    //                 src="./calendar-regular.svg"
    //                 className="w-[20px] h-[20px] ml-[20px] cursor-pointer"
    //                 onClick={onClick}
    //                 ref={ref}
    //             />
    //         </div>
    //         <div className="flex main-dark">
    //             <span>{value}</span>
    //             <img
    //                 src="./calendar-regular-dark.svg"
    //                 className="w-[20px] h-[20px] ml-[20px] cursor-pointer"
    //                 onClick={onClick}
    //                 ref={ref}
    //             />
    //         </div>
    //     </>
    // ))

    return (
        <>
            {loading ? (
                <LottieCat text={'읽어오고 있어요'} />
            ) : total < 1 ? (
                <NoResult />
            ) : (
                <div className="w-full mt-[100px] flex flex-col justify-center items-center">
                    <div className="flex flex-wrap max-w-[1280px] justify-center mt-[30px]">
                        {view.map((data: IDiary, index: number) => (
                            <DiaryLayout
                                key={data.id}
                                data={data}
                                userImg={userImg}
                            />
                        ))}
                    </div>
                    {/* <div className="border h-[50px] rounded-md flex justify-around items-center mb-[50px] dark:bg-[#474747] shadow-lg">
                        <div className="flex items-center px-[60px] z-[10]">
                            <DatePicker
                                selected={startDate}
                                locale={ko}
                                dateFormat="yyyy. MM. dd"
                                closeOnScroll={true}
                                onChange={(date: Date) => setStartDate(date)}
                                customInput={<CalendarInput />}
                            />
                        </div>
                        <div>
                            <span> ~ </span>
                        </div>
                        <div className="flex items-center px-[60px] z-[10]">
                            <DatePicker
                                selected={endDate}
                                locale={ko}
                                dateFormat="yyyy. MM. dd"
                                closeOnScroll={true}
                                onChange={(date: Date) => setEndDate(date)}
                                customInput={<CalendarInput />}
                            />
                        </div>
                    </div> */}
                    <Pagination total={total} limit={6} page={page} />
                </div>
            )}
        </>
    )
}

export default Community
