import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import './output.css'
import { projectContext } from './Core/Context';
import Layouts from './Layouts/Layouts'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import Category from './Pages/Category';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Post from './Pages/Post';

function App({ dataFromServer }) {
  const [cart, setCart] = useState([]);
  const [prices, setPrices] = useState([]);
  return (
    <projectContext.Provider value={{ cart, setCart, prices, setPrices }}>
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route index element={<Home dataFromServer={dataFromServer} />} />
          <Route path="/category/:name" element={<Category dataFromServer={dataFromServer} />} />
          <Route path="/category/:name/products/:slug" element={<Post dataFromServer={dataFromServer} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </projectContext.Provider>
  )
}

export default App
