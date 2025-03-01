"use client"
import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import NavLinks from './navbar/NavLinks';
import NavProfileImage from './navbar/NavProfileImage';



const Navbar = () => {

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <FaBars aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <IoMdClose aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <h1 className='text-4xl text-white dark:text-primary-light'>LMS</h1>
            </div>
            
          <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <NavLinks />
              </div>
          </div>
          </div>
          <NavProfileImage />
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">            
            <NavLinks smallScreen={true} />
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default Navbar