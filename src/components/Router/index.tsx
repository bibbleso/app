import React, {Suspense, lazy, useState, Children} from 'react'

import RouterProvider from './context'
import RouterComp from './router'

interface Props {
  children:React.ReactNode[]
}

const Router = ({children}:Props) => {
        <RouterProvider intial={children[0]}>
                <RouterComp/> 
        </RouterProvider>
    }

export default Router
