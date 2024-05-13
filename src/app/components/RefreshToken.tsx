'use client'

import axios from 'axios'
import { useSession, signOut } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const RefreshToken = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const refreshAccess = async () => {
        if (!session) return
        console.log('check token...')

        const res = await fetch(
            'http://43.202.125.125:8000/dj-rest-auth/token/refresh/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: session?.accessToken }),
            },
        )

        const result = await res.json()
        if (res.status === 200) {
            if (session) {
                session.accessToken = result.access
            }
        } else {
            alert('다시 로그인해 주세요.')
            signOut({ callbackUrl: '/' })
        }
    }
    useEffect(() => {
        const checking = setInterval(
            () => {
                refreshAccess()
            },
            1000 * 60 * 4,
        )
        return () => {
            clearInterval(checking)
        }
    }, [session])
    return <></>
}

export default RefreshToken
