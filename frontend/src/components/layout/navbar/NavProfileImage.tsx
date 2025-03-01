import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useAuthStore } from '@/store/authStore'
import Link from 'next/link'

const NavProfileImage = () => {

    const {user, logout} = useAuthStore()

  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <Menu as="div" className="relative ml-3">
            <div>
            <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                {user && (
                <img
                    alt=""
                    src={user.imageUrl ?? "/profile-image.jpg"}
                    className="size-8 rounded-full"
                />
                )}
            </MenuButton>
            </div>
            <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
            <MenuItem>
                <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                >
                Your Profile
                </Link>
            </MenuItem>
            <MenuItem>
                <Link
                href="#"
                onClick={()=>{
                    logout()
                    window.location.href = '/'
                }}
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                >
                Sign out
                </Link>
            </MenuItem>
            </MenuItems>
        </Menu>
    </div>
  )
}

export default NavProfileImage