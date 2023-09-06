import {useEffect, useState} from "react";

export const useWindowSize = () => {
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()

    useEffect(() => {
        const {clientWidth, clientHeight} = document.documentElement
        setWidth(clientWidth)
        setHeight(clientHeight)
    }, [])

    useEffect(() => {
        const handleWindowSize = () =>{
            const {clientWidth, clientHeight} = document.documentElement
            setWidth(clientWidth)
            setHeight(clientHeight)
        };

        window.addEventListener('resize', handleWindowSize, false)

        return () => {
            window.removeEventListener('resize',handleWindowSize, false)
        }
    })

    return [width, height]
}


// 使用
const [width, height] = useWindowSize()