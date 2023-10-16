// import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login_Register/login';
import Forgot from './Forgot_password/forgot';
import Navbar from './Component/Navbar/Navbar';
import MainPage from './Component/Homepage/MainPage';
import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';
import Footer from './Component/Footer/Footer';
import Privacy from './Component/More/Privacy';
import FAQ from './Component/More/FAQ';
import TAC from './Component/More/TAC';
import Myuploads from './Component/demopage/Myuploads';
import { AdminAuth } from './Component/Auth/AdminAuth';
import Admindash from './Component/AdminPage/Admindash';


function App() {
	return (
   
        <Router>
          <Routes>
          <Route path="/Login" element= {<><Login /></>}/>
          <Route path="/" element= {<><ChakraProvider> <ColorModeScript initialColorMode={theme.config.initialColorMode}/><Navbar /> <MainPage /><Footer/></ChakraProvider></>}/>
          <Route path="/myuploads" element= {<><ChakraProvider> <ColorModeScript initialColorMode={theme.config.initialColorMode}/><Navbar /> <Myuploads/><Footer/></ChakraProvider></>}/>
          <Route path="/forgot" element= {<><Forgot /></>}/>
          {/* <Route path ="/home" element ={<><Profile/></>}/> */}
          <Route path="/tac" element= {<><TAC/></>}/>
          <Route path="/faq" element= {<><FAQ/></>}/>
          <Route path="/privacy" element= {<><Privacy/></>}/>
          <Route path="/privacy" element= {<><Privacy/></>}/>



          <Route element={<AdminAuth />}>
          <Route exact path='/admin/dashboard' element={<><ChakraProvider> <ColorModeScript initialColorMode={theme.config.initialColorMode}/><Navbar /> <Admindash/></ChakraProvider></>} />
          {/* <Route exact path='/admin/products/view' element={<ViewProducts />} />
          <Route exact path='/admin/product/add' element={<AddProduct />} />
          <Route exact path='/admin/product/edit/:productId' element={<EditProduct />} />
          <Route exact path='/admin/user/view' element={<ViewUsers />} />
          <Route exact path='/admin/user/edit/:userId' element={<EditUser />} />
          <Route exact path='/admin/feedbacks/view' element={<ViewFeedbacks />} /> */}
         </Route>
          

          </Routes>
        </Router>
        
  )
  }
  
export default App;