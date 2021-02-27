import React from "react"
import { Image } from "antd";

export const ImageFromIconName: React.FC<{icon: string}> = ({icon}) =>{
    return(
        <>
            <Image
                width={200}
                src={`../icons/${icon}.png`}
            />
        </>
    )
}