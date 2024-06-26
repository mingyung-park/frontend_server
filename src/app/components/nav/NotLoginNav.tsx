'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
const NotLoginNav = ({ isLogin }: any) => {
    const { systemTheme, theme, setTheme } = useTheme() // 다크모드테마 설정
    const currentTheme = theme === 'system' ? systemTheme : theme
    const router = useRouter()
    return (
        <div className="flex w-full h-[60px] justify-between items-center z-10 flex-[none] shadow-lg bg-[#F7F6F2]dark:bg-[#474747]">
            <div className="flex justify-center items-center">
                <div
                    className="ml-[60px] cursor-pointer"
                    onClick={() => router.push('/')}
                >
                    {/* 로고 바꿀것 */}
                    
                    <img src='/book.png' width={40} height={40}></img>
                    
                </div>
            </div>
            <div className="flex justify-center items-center pr-[30px]">
                <span
                    className="hover:text-[#88b799] cursor-pointer"
                    onClick={() => router.push('/signin')}
                >
                    로그인
                </span>
                <span className="mx-[20px]">|</span>
                <span
                    className="hover:text-[#88b799] cursor-pointer"
                    onClick={() => router.push('/join')}
                >
                    회원 가입
                </span>
                {/*<button
                    type="button"
                    className={`${!isLogin ? 'w-10 h-10' : 'w-10 h-10'}
                p-[5px] flex justify-center items-center rounded-md bg-[#eee] hover:bg-[#ddd] dark:bg-[#555] dark:hover:bg-[#666]`}
                    onClick={() => {
                        setTheme(currentTheme === 'dark' ? 'light' : 'dark')
                    }}
                >
                    {currentTheme === 'dark' ? (
                        <>
                            <Image
                                src="/sun.svg"
                                alt="Sun Logo"
                                className="w-[35px]"
                                width={40}
                                height={40}
                                priority
                            />
                        </>
                    ) : (
                        <Image
                            src="/dark.svg"
                            alt="Dark Logo"
                            className="w-[35px] p-1"
                            width={50}
                            height={50}
                            priority
                        />
                    )}
                </button>*/}
            </div>
        </div>
    )
}

export default NotLoginNav
