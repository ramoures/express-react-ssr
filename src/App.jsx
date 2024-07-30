import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import './output.css'
import { projectContext } from './Core/Context';
import Layouts from './Layouts/Layouts'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import Category from './Pages/Category';
import Basket from './Pages/Basket';
import Checkout from './Pages/Checkout';
import Post from './Pages/Post';

function App({ port, dataFromServer }) {
  const [thisPort] = useState(port);
  const [basket, setBasket] = useState([]);
  const [prices, setPrices] = useState([]);
  return (
    <projectContext.Provider value={{ thisPort, basket, setBasket, prices, setPrices }}>
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route index element={<Home dataFromServer={dataFromServer} />} />
          <Route path="/category/:name" element={<Category dataFromServer={dataFromServer} />} />
          <Route path="/category/:name/products/:slug" element={<Post dataFromServer={dataFromServer} />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </projectContext.Provider>
  )
}

export default App
