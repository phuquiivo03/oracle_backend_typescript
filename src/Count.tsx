import React from "react"

type Props = {
    count: number, 
    setCount: React.Dispatch<React.SetStateAction<number>>
    total: (num1: number, num2: number) => string
}

type PropsEx= Person & {
    c2: string
}

export type Person = {
    name: string,
    age: number,
    address?: string
}

enum Weather {
    Sunny="dsa", 
    Rain=2

}
export const Count =({total, count, setCount}: Props)=> {
    let a = total(1,2)
    console.log(a)
    let c: PropsEx = {
        c2: "sdad",
        name: "count",
        age: 10,

    }
    console.log(Weather.Sunny)

    return <>
    <button onClick={()=>setCount(count+1)}><span>{count}</span></button>
</>
}