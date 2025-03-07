"use client"
import { useAuthStore } from '@/store/authStore'
import Link from 'next/link'
import React from 'react'

const LogoutLink = () => {

    const {logout} = useAuthStore()

  return (
    <Link
        href="#"
        onClick={()=>{
            logout()
            window.location.href = '/login'
        }}
        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
        >
        Sign out
    </Link>
  )
}

export default LogoutLink