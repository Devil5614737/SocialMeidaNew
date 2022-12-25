import React,{lazy,Suspense} from 'react'
import Login from './pages/Login';
import { SidebarMenu } from './components/SidebarMenu'
import { Layout } from './components/Layout';
import { Routes,Route } from 'react-router-dom';

import Settings from './pages/Settings';

import { AuthContextProvider } from './context/AuthContext';
import { PostContextProvider } from './context/PostContext';
import { HomeLoadingSkeleton } from './components/HomeLoadingSkeleton';
import { ThemeContexProvider } from './context/ThemeContext';


const Home=lazy(()=>import('./pages/Home'));
const Profile=lazy(()=>import('./pages/Profile'));
const Search=lazy(()=>import('./pages/Search'));
const OtherUserProfile=lazy(()=>import('./pages/OtherUserProfile'));
const Friends=lazy(()=>import('./pages/Friends'));


function App() {


  
  return (
<>
  <ThemeContexProvider>
  <AuthContextProvider>
<PostContextProvider>
<Layout>
  <Suspense fallback={<HomeLoadingSkeleton/>}>
  <Routes>
  <Route path='/home' element={<Home/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/settings' element={<Settings/>}/>
    <Route path='/friends' element={<Friends/>}/>
    <Route path='/search' element={<Search/>}/>
    <Route path='/:id' element={<OtherUserProfile/>}/>
  </Routes>
  </Suspense>
</Layout>
</PostContextProvider>
  </AuthContextProvider>
  </ThemeContexProvider>
</>
  )
}

export default App