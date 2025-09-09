import { useState } from 'react'
import ProductCard from './Components/ProductCard'
import Modal from './Components/ui/Modal'
import { formInputList, productList } from './data'
import Button from "../src/Components/ui/Button"
import Inputs from './Components/ui/Inputs'

const App = () => {
    let [isOpen, setIsOpen] = useState(false)
  
    function open() {
      setIsOpen(true)
    }
  
    function close() {
      setIsOpen(false)
    }
  const renderProductList = productList.map(product=><ProductCard product={product} key={product.id}/>)
  const renderFormInputList= formInputList.map(input => <div className='flex flex-col'>
    <label htmlFor={input.id} className='text-sm mb-2 '>{input.label}</label>
    <Inputs name={input.name} type='text' id={input.id} />
  </div>)
  return (
    <main className='max-w-7xl mx-auto px-6 py-10'>
      <Button width='w-fit' className=" text-white bg-indigo-700  " onClick={open}>SUBMIT</Button>

      <div className='m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md'>
      
      {renderProductList}
    </div>
    <Modal isOpen={isOpen} close={close} title='Add a new product'>
      <form className='space-y-3'>
        {renderFormInputList}

         <div className='flex items-center space-x-3'>
        <Button className=" text-white bg-indigo-700 hover:bg-indigo-500 transition-all  ">SUBMIT</Button>
        <Button className=" text-white bg-gray-400 hover:bg-gray-500 transition-all  " onClick={close}>CANCEL</Button>
      </div>
      </form>
      
     
    </Modal>
    </main>
    
  )
}

export default App
