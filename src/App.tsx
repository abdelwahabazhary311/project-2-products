import { useState } from 'react'
import ProductCard from './Components/ProductCard'
import Modal from './Components/ui/Modal'
import { productList } from './data'
import Button from "../src/Components/ui/Button"

const App = () => {
    let [isOpen, setIsOpen] = useState(false)
  
    function open() {
      setIsOpen(true)
    }
  
    function close() {
      setIsOpen(false)
    }
  const renderProductList = productList.map(product=><ProductCard product={product} key={product.id}/>)
  return (
    <main className='max-w-7xl mx-auto px-6 py-10'>
      <Button width='w-fit' className=" text-white bg-indigo-700  " onClick={open}>SUBMIT</Button>

      <div className='m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md'>
      
      {renderProductList}
    </div>
    <Modal isOpen={isOpen} close={close} title='Add a new product'>
      <div className='flex items-center space-x-3'>
        <Button className=" text-white bg-indigo-700  ">SUBMIT</Button>
        <Button className=" text-white bg-gray-300  " onClick={close}>CANCEL</Button>
      </div>
    </Modal>
    </main>
    
  )
}

export default App
