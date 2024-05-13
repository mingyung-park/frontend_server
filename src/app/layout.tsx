import type { Metadata } from 'next'
import './globals.css'
import DarkMode from './Provider'
import Providers from './components/Providers'
import RefreshToken from './components/RefreshToken'
import NavBar from './components/Nav'

export const metadata: Metadata = {
    title: 'Fairy Tairy',
    description: '',
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
                    <RefreshToken />
                    <DarkMode>
                        <NavBar />
                        {children}
                    </DarkMode>
                </Providers>
            </body>
        </html>
    )
}
