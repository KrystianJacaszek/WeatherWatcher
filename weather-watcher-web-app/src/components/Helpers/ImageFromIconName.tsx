import React from "react"

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