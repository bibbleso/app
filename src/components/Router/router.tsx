import React, {useEffect} from 'react';

import { useRouterContext } from './context'
import directory from './directory'

const RouterComponent = () => {
        const routerContext = useRouterContext(); 
        let page = routerContext.activePage
        if (page == 'unset') return null
        if (!page) return null
        let Element = directory[page]

        return <Element/>
        }

export default RouterComponent

