import React from "react"
import { Image } from "antd";

export const ImageFromIconName: React.FC<{icon: string}> = ({icon}) =>{
    return(
        <>
            <img
                width={100}
                src={`/icons/${icon}.png`}
            />
        </>
    )
}