'use client'
import { useState, forwardRef, useEffect, useLayoutEffect } from 'react'
import { notFound, useSearchParams } from 'next/navigation'
import { userInfo } from '@/app/lib/atoms/atom'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { IFollow } from './type'
import Image from 'next/image'
import Pagination from './_components/Pagination'
import LoadingCat from '@/app/components/LoadingCat'
import NoResult from './_components/NoResult'
import FollowLayout from './_components/FollowLayout'

const Follow = () => {
    const params = useSearchParams()
    const [userImg, setUserImg] = useState('')
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(6)
    const [loading, setLoading] = useState(false)
    const [view, setView] = useState<IFollow[]>([])
    const curPage = params.get('page') as string
    const { data: session } = useSession()
    const [followName, setFollowName] = useState('')
    const router = useRouter()
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
        getFollow()
    }, [page])

    const Request = async () => {
        const res = await fetch(`http://43.202.125.125:8000/follow/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.accessToken}`,
            },
            body: JSON.stringify({
                username: followName,
            }),
        })
        const result = await res.json()
        if (res.status === 201) {
            getFollow()
            return
        } else {
            alert(result)
            return
        }
    }

    const getFollow = async () => {
        // if (!user.pk) return
        setLoading(true)

        const res = await fetch(`http://43.202.125.125:8000/follow/`, {
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

    return (
        <>
            {loading ? (
                <LoadingCat text={'읽어오고 있어요'} />
            ) : total < 1 ? (
                <NoResult />
            ) : (
                <div className="w-full mt-[100px] flex flex-col justify-center items-center">
                    <div className="flex flex-row justify-center ">
                        <div className="flex justify-center items-center self-center w-[30%] max-w-2xl h-[37px] top-[5rem] absolute focus-within:shadow-md rounded-md shadow-md dark:shadow-none dark:bg-[#666] border border-[#eee] dark:border-[#666] hover:border-1 focus-within:border-1 flex-row">
                            <input
                                type="text"
                                placeholder="사용자 이름으로 친구 추가하기"
                                value={followName}
                                onChange={(e) => setFollowName(e.target.value)}
                                className="w-full h-full outline-none border-none dark:bg-[#666] pl-4"
                            ></input>
                            <button
                                onClick={Request}
                                className="ml-auto px-4 py-2 rounded-md bg-[#9dceae] text-black hover:bg-[#9c8abf] transition duration-300 ease-in-out flex-shrink-0"
                                style={{ flex: '0 0 auto' }}
                            >
                                전송
                            </button>
                        </div>
                    </div>
                    <>
                        <div className="flex flex-wrap max-w-[1280px] justify-center mt-[30px]">
                            {view.map((data: IFollow, index: number) => (
                                <FollowLayout
                                    key={data.id}
                                    data={data}
                                    userImg={userImg}
                                />
                            ))}
                        </div>
                    </>
                    <Pagination total={total} limit={6} page={page} />
                </div>
            )}
        </>
    )
}
export default Follow
