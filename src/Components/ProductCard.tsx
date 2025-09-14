


import Image from "./Image"
import Button from "./ui/Button"
import { productList } from "../data"
import type { IProduct } from "../interfaces"
import { txtSlicer } from "../utils/functions"
import ProductColors from "./ProductColors"

interface Iprops {
 product:IProduct
 setProductToEdit:(product:IProduct)=>void
 idx:number
 setProductToEditIdx:(value:number)=>void
 openEditModal:()=>void
 openConfirmModal:()=>void
}
const ProductCard = ({product,idx,setProductToEditIdx,setProductToEdit,openEditModal,openConfirmModal}:Iprops) => {
  const {category,colors,description,imageURL,price,title}=product
  
  
    const renderProductColors = colors.map(color => <ProductColors key={color} color={color} />)
  
    /**______________Handler__________ */
    const onEdit =()=>{
      setProductToEdit(product);
      openEditModal();
      setProductToEditIdx(idx)
    }
    const onDelete =()=>{
      setProductToEdit(product);
      openConfirmModal();
      
    }
  return (
    <div className="justify-between h-full  border rounded-md p-2 flex flex-col ">
        <Image imgURL={imageURL} alt="car image" className="rounded-md w-full h-52 lg:object-cover" />
        <h3 className=" my-2.5 text-2xl ">{title}</h3>
        <p className="text-gray-500">{txtSlicer(description)}</p>

        <div className="flex items-center flex-wrap space-x-1 my-3" > {renderProductColors}</div>

        
        <div className="flex items-center justify-between my-2">
          <span className="text-indigo-600">{price}</span>

          <Image imgURL={category.imageURL} alt={category.name} className="w-10 h-10 rounded-full" />
        </div>

        <div className=" flex  items-center justify-between space-x-2">
          <Button 
          onClick={onEdit} 
          width="w-full"
          className=" text-white bg-indigo-700  ">
            Edit
            </Button>
          <Button className=" text-white  bg-red-700 " onClick={onDelete}>Delete</Button>
        </div>
    </div>
  )
}

export default ProductCard