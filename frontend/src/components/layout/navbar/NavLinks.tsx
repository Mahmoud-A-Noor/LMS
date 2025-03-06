"use client"
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import React from 'react'
import { DisclosureButton } from '@headlessui/react'

const NavLinks = ({smallScreen = false}) => {

    const {user} = useAuthStore()


    let navigation: { name: string, href: string, current: boolean }[] = [];

    if(!user) navigation = []
    else if(user.role === "admin")
      navigation = [
        { name: 'Admin', href: '/admin', current: true },
        { name: 'Courses', href: '/admin/courses', current: false },
        { name: 'Products', href: '/admin/products', current: false },
        { name: 'Sales', href: '/admin/sales', current: false },
      ]
    else if(user.role === "user")
      navigation = [
        { name: 'My Courses', href: '/courses', current: true },
        { name: 'Purchase History', href: 'purchases', current: false },
      ]

      
  
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
    { smallScreen ? (
       navigation.map((item) => (
       
        <DisclosureButton
            key={item.name}
            as="a"
            href={item.href}
            aria-current={item.current ? 'page' : undefined}
            className={classNames(
            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium',
            )}
        >
        {item.name}
      </DisclosureButton>
    ))
    ) : (
        navigation.map((item) => (
            <Link
            key={item.name}
            href={item.href}
            aria-current={item.current ? 'page' : undefined}
            className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'rounded-md px-3 py-2 text-sm font-medium',
            )}
            >
            {item.name}
            </Link>
        ))
    )}
        
    </>
  )
}

export default NavLinks