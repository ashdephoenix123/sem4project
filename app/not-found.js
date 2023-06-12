import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
        <div class="bg-gray-800">
            <div class="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center max-[577px]:w-11/12">
                <div class="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
                    <div class="border-t border-gray-200 text-center pt-8">
                        <h1 class="text-9xl font-bold text-blue-600 max-[577px]:text-5xl">404</h1>
                        <h1 class="text-6xl font-medium py-8 max-[577px]:text-2xl">Oops! Page not found</h1>
                        <p class="text-2xl pb-8 px-12 font-medium max-[577px]:text-base">Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>
                        <Link href='/' class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md">
                            HOME
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound
