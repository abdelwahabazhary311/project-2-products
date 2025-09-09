import type { InputHTMLAttributes } from "react"

interface Iprops extends InputHTMLAttributes<HTMLInputElement> {

}
const Inputs = ({...rest}:Iprops) => {
  return <input {...rest}  className='border-2 border-gray-400
  focus:border-indigo-400 focus:ring-1 focus:outline-none 
  focus:ring-indigo-400 p-2 rounded-md text-md shadow-md'/>
}

export default Inputs