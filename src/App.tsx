import { useState, type ChangeEvent, type FormEvent,  } from 'react'
import ProductCard from './Components/ProductCard'
import Modal from './Components/ui/Modal'
import { categories,  colors, formInputList, productList } from './data'
import Button from "../src/Components/ui/Button"
import Inputs from './Components/ui/Inputs'
import type { IProduct } from './interfaces'
import { productValidation } from './validation'
import ErrorsMessage from './Components/ErrorsMessage'
import ProductColors from './Components/ProductColors'
import { v4 as uuid } from "uuid";
import  Select  from './Components/ui/Select'
import type { productNameTypes } from './types'
import toast, { Toaster } from 'react-hot-toast';
const App = () => {
  const defaultProductOpj ={
      title:'',
      description:'',
      imageURL:'',
      price:'',
      colors:[],
      // category:categories[0]
      category:{
        name:'',
        imageURL:''
      }
    }
  /**______________state__________ */
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const[products , setProducts] = useState<IProduct[]>(productList)
    const[productToEdit , setProductToEdit] = useState<IProduct>(defaultProductOpj)
    const[productToEditIdx , setProductToEditIdx] = useState<number>(0)
    const[product , setProduct] = useState<IProduct>(defaultProductOpj)
    const[errors , setErrors] = useState({title:'', description:'', imageURL:'', price:'',})
    const[tempColor , setTempColor] = useState<string[]>([])
    const [selectCategory, setSelectCategory] = useState(categories[0])
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

   
    
  // console.log(tempColor);
  
      /**______________Handler__________ */

    function open() {
      setIsOpen(true)
    }
  
    function close() {
      setIsOpen(false)
    }
    function openEditModal() {
      setIsOpenEditModal(true)
    }
  
    function closeEditModal() {
      setIsOpenEditModal(false)
    }
    const onChangeHandler = (event:ChangeEvent<HTMLInputElement>)=>{
      const {value , name} = event.target;
      setProduct({
        ...product,
        [name] :value
      })
      setErrors({
        ...errors,
        [name]:''
      })
    }
    const onChangeEditHandler = (event:ChangeEvent<HTMLInputElement>)=>{
      const {value , name} = event.target;
      setProductToEdit({
        ...productToEdit,
        [name] :value
      })
      setErrors({
        ...errors,
        [name]:''
      })
    }

      const submitHandler = (event: FormEvent<HTMLFormElement>): void=> {
    event.preventDefault();
    const errors = productValidation({title:product.title ,description:product.description
      , imageURL:product.imageURL , price:product.price,
    })
    // console.log(errors);

    // const hasErrorMessage = Object.values(errors).some(value => value !== '');

    const hasErrorMessage = 
    Object.values(errors).some(value => value == '') && Object.values(errors).every(value => value=='');

    // console.log(hasErrorMessage);
    if(!hasErrorMessage){
      setErrors(errors)
      return;
    }
    setProducts(prev=>[...prev , {...product , id:uuid() , colors:tempColor , category:selectCategory}])
    setProduct(defaultProductOpj);
    setTempColor([]);
    close()
    
  }
      const submitEditHandler = (event: FormEvent<HTMLFormElement>): void=> {
        const{ title , description , imageURL , price} = productToEdit
        event.preventDefault();
        
        const errors = productValidation({
          title,
          description,
          imageURL,
          price,
        })
    const hasErrorMessage = 
    Object.values(errors).some(value => value == '') && Object.values(errors).every(value => value=='');

    
    if(!hasErrorMessage){
      setErrors(errors)
      return;
    }
    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = {...productToEdit , colors: tempColor.concat(productToEdit.colors)};
    setProducts(updatedProducts);
    setProductToEdit(defaultProductOpj);
    setTempColor([]);
    closeEditModal()
    
  }


  const onCancel = ()=>{
    console.log("cancel"); 
    setProduct(defaultProductOpj)
    close()
  }

  // Delete Product
  const removeProductHandler = () => {
    console.log("product id" , productToEdit.id);
    const filtered = products.filter(product => product.id !== productToEdit.id);
    setProducts(filtered);
    setProductToEdit(defaultProductOpj);
    closeConfirmModal();
    toast('Product removed successfully')
  }


   function closeConfirmModal() {
      setIsOpenConfirmModal(false);
    }

    const openConfirmModal = () => setIsOpenConfirmModal(true);
    
      /**______________Render_________ */
  const renderProductList = products.map((product , idx)=>
      <ProductCard 
  
        openEditModal={openEditModal} 
        setProductToEdit={setProductToEdit} 
        product={product} 
        key={product.id}
        idx={idx}
        setProductToEditIdx={setProductToEditIdx}
        openConfirmModal={openConfirmModal}
        />
    
)
  
  
  
  const renderFormInputList= formInputList.map(input => 
  <div key={input.id} className='flex flex-col'>
    <label htmlFor={input.id} className='text-sm mb-2 '>{input.label}</label>
    <Inputs name={input.name} type='text' id={input.id} value={product[input.name]} onChange={onChangeHandler} />
    <ErrorsMessage msg={errors[input.name]}/>
  </div>)

  const renderProductColors = colors.map(color => <ProductColors key={color} color={color} 
    onClick={()=>{
      if(tempColor.includes(color)){
        setTempColor(prev => prev.filter(item => item !== color))
        return
      }
      if(productToEdit.colors.includes(color)){
        setTempColor(prev => prev.filter(item => item !== color))
        return
      }
      setTempColor(prev=>[...prev , color])
    }}/>)


    const renderProductEditWithErrorMsg = (id:string , label:string , name:productNameTypes)=>{
      return(
        <div  className='flex flex-col'>
          <label htmlFor={id} className='text-sm mb-2 '>{label}</label>
          <Inputs name={name} type='text' id={id} value={productToEdit[name]} onChange={onChangeEditHandler} />
          <ErrorsMessage msg={errors[name]}/>
        </div>
      )
    }
    


  return (
    <main className='max-w-7xl mx-auto px-6 py-10'>
      <Button width='w-fit' className=" text-white bg-indigo-700  " onClick={open}>BUILD A PRODUCT</Button>

      <div className='m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md'>
      
      {renderProductList}
    </div>
    {/* Add Modal */}
    <Modal isOpen={isOpen} close={close} title='Add a new product'>
      
      <form className='space-y-3' onSubmit={submitHandler}>
        {renderFormInputList}

        <Select  selected={selectCategory} setSelected={setSelectCategory}/>
        
        <div className="flex items-center flex-wrap space-x-1 my-3" > {renderProductColors}</div>
        <div className="flex items-center flex-wrap space-x-1 my-3" >
            {tempColor.map(color=> <span key={color} className='text-white text-sm rounded-md p-1 ' style={{backgroundColor:color}}>{color}</span> )}
        </div>
        
        
         <div className='flex items-center space-x-3'>
        <Button  className=" text-white bg-indigo-700 hover:bg-indigo-500 transition-all  ">SUBMIT</Button>
        <Button onClick={onCancel} className=" text-white bg-gray-400 hover:bg-gray-500 transition-all  " >CANCEL</Button>
      </div>
      </form>
      
     
    </Modal>
    {/* Edit Modal */}
    <Modal isOpen={isOpenEditModal} close={closeEditModal} title='Edit product'>

    

      <form className='space-y-3' onSubmit={submitEditHandler}>

          {renderProductEditWithErrorMsg('title', 'Product title' , 'title')}
          {renderProductEditWithErrorMsg('description', 'Product description' , 'description')}
          {renderProductEditWithErrorMsg('imageURL', 'Product imageURL' , 'imageURL')}
          {renderProductEditWithErrorMsg('price', 'Product price' , 'price')}

        <Select  selected={productToEdit.category} 
        setSelected={value=>setProductToEdit({...productToEdit , category:value})}/>

        <div className="flex items-center flex-wrap space-x-1 my-3" > {renderProductColors}</div>
        <div className="flex items-center flex-wrap space-x-1 my-3" >
            { tempColor.concat(productToEdit.colors).map(color=> <span key={color} className='text-white text-sm rounded-md p-1 ' style={{backgroundColor:color}}>{color}</span> )}
        </div>
        
        
         <div className='flex items-center space-x-3'>
        <Button  className=" text-white bg-indigo-700 hover:bg-indigo-500 transition-all  ">SUBMIT</Button>
        <Button onClick={onCancel} className=" text-white bg-gray-400 hover:bg-gray-500 transition-all  " >CANCEL</Button>
      </div>
      </form>
      
     
    </Modal>


    {/* DELETE PRODUCT CONFIRM MODAL */}
          <Modal
            
            isOpen={isOpenConfirmModal}
            close={closeConfirmModal}
            title="Are you sure you want to remove this Product from your Store?"
          >
            <div className="flex items-center space-x-3">
              <Button className="bg-[#c2344d] hover:bg-red-800" onClick={removeProductHandler}>
                Yes, remove
              </Button>
              <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={closeConfirmModal}>
                Cancel
              </Button>
            </div>
          </Modal>

          <Toaster/>
    </main>
    
  )
}

export default App
