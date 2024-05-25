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
            'https://fairytairy.shop/dj-rest-auth/token/refresh/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.accessToken}`,
                },
                body: JSON.stringify({ refresh: session?.accessToken }),
            },
        )

        const result = await res.json()
        if (!res.ok) {
            alert('다시 로그인해 주세요.')
            signOut({ callbackUrl: '/' })
        } else if (res.ok) {
            if (session) session.accessToken = result.access
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
