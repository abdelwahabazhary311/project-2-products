import type { ButtonHTMLAttributes, ReactNode } from "react"

interface Iprops extends ButtonHTMLAttributes<HTMLButtonElement> {
children:ReactNode,
className?:string,
width?:'w-fit'|  'w-full'
}
const Button = ({children , className, width = "w-full" , ...rest}:Iprops) => {
  return (
    
     <button className={`${className} ${width} rounded-md  p-2 cursor-pointer  `} {...rest}>{children}</button>
    
  )
}

export default Button