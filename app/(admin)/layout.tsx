import { AdminNavbar } from '@/components/navbar/AdminNavbar'
import { AdminSidebar } from '@/components/navbar/AdminSidebar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <AdminNavbar />
            <AdminSidebar />
            <main className="lg:pl-72 min-h-screen bg-background">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-6">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default layout
