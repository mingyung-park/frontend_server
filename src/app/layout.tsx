import type { Metadata } from 'next'
import './globals.css'
import DarkMode from './Provider'
import Providers from './components/Providers'
import RefreshToken from './components/RefreshToken'
import NavBar from './components/Nav'

export const metadata: Metadata = {
    title: 'Fairy Tairy',
    description: '나의 감정을 기록해 보세요.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`flex flex-col w-full h-full items-center`}>
                <Providers>
                    <DarkMode>
                        <NavBar />
                        <RefreshToken />
                        {children}
                        {/* <Footerer /> */}
                    </DarkMode>
                </Providers>
            </body>
        </html>
    )
}
