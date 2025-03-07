import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="container my-6">
      <div className="flex flex-col gap-4 items-start">
        <div className='text-3xl font-semibold '>
          Purchase Successful
        </div>
        <div className='text-xl'>
          Thank you for purchasing
        </div>
        <Button className="text-xl h-auto py-4 px-8 rounded-lg">
          <Link href="/courses">View My Courses</Link>
        </Button>
      </div>
    </div>
  )
}

export default page