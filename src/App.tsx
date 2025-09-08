import ProductCard from './Components/ProductCard'
import { productList } from './data'

const App = () => {
  const renderProductList = productList.map(product=><ProductCard product={product} key={product.id}/>)
  return (
    <main className='max-w-7xl mx-auto px-6 py-10'>
      <div className='m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md'>
      
      {renderProductList}
    </div>
    </main>
  )
}

export default App
