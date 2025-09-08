


import Image from "./Image"
import Button from "./ui/Button"
import { productList } from "../data"
import type { IProduct } from "../interfaces"
import { txtSlicer } from "../utils/functions"

interface Iprops {
 product:IProduct
}
const ProductCard = ({product}:Iprops) => {
  const {categoury,colors,description,imageURL,price,title,id}=product
  return (
    <div className="justify-between h-full  border rounded-md p-2 flex flex-col ">
        <Image imgURL={imageURL} alt="car image" className="rounded-md w-full h-52 lg:object-cover" />
        <h3 className=" my-2.5 text-2xl ">{title}</h3>
        <p className="text-gray-500">{txtSlicer(description)}</p>


        <div className="flex items-center space-x-2 my-3">
          <span  className=" w-5 h-5 bg-indigo-600 rounded-full cursor-pointer  " />
        <span  className=" w-5 h-5 bg-yellow-600 rounded-full   cursor-pointer  "   />
        <span  className=" w-5 h-5 bg-red-600 rounded-full      cursor-pointer  "      />
        </div>

        <div className="flex items-center justify-between my-2">
          <span className="text-indigo-600">{price}</span>
          
          <Image imgURL={categoury.imageURL} alt={categoury.name} className="w-10 h-10 rounded-full" />
        </div>

        <div className=" flex  items-center justify-between space-x-2">
          <Button 
          onClick={()=>{ console.log("clicked");}} 
          width="w-full"
          className=" text-white bg-indigo-700  ">
            Edit
            </Button>
          <Button className=" text-white  bg-red-700 ">Delete</Button>
        </div>
    </div>
  )
}

export default ProductCard