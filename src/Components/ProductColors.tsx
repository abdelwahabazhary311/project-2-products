import type { HTMLAttributes } from "react"

interface Iprops extends HTMLAttributes<HTMLSpanElement>{
color:string

}
const ProductColors = ({color , ...rest}:Iprops) => {
  return <span {...rest} className={` block w-5 h-5  rounded-full cursor-pointer  `} style={{backgroundColor:color}} />
}

export default ProductColors