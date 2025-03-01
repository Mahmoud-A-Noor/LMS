"use client"
import React, { ComponentPropsWithRef, ReactNode, useTransition } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { Loader2Icon } from 'lucide-react'

const ActionButton = ({action, requireAreYouSure = false, ...props} : 
    Omit<ComponentPropsWithRef<typeof Button>,"onClick"> & {
    action: ()=>void, requireAreYouSure?:boolean
} ) => {

    const [isLoading, startTransition] = useTransition()

    function performAction() {
        startTransition(async ()=>{
            await action()
        })
    }
  return (
    <Button {...props} disabled={isLoading} onClick={performAction} >
        <LoadingTextSwap isLoading={isLoading}>
            {props.children}
        </LoadingTextSwap>
    </Button>
  )
}

export default ActionButton


function LoadingTextSwap({isLoading, children} : {isLoading: boolean, children: ReactNode}){
    return (
        <div className="grid items-center justify-center">
            <div className={cn("col-start-1 col-end-2 row-start-1 row-end-2", isLoading ? "invisible" : "visible")}>
                {children}
            </div>
            <div className={cn("col-start-1 col-end-2 row-start-1 row-end-2 text-center", isLoading ? "invisible" : "visible")}>
                <Loader2Icon className='animate-spin' />
            </div>
        </div>
    )
}