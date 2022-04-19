import React from 'react';
import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import Footer from './components/footer/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import Navbar from './components/navbar/Navbar';
import { getAuthUser } from './context/Action';
import { Context } from './context/Context';
import GlobalStyle from './globaleStyles';
import Blogs from './pages/Blogs/Blogs';
import CategoryPage from './pages/Categories/CategoryPage';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Messages from './pages/Messages/Messages';
import Notifications from './pages/Notifications/Notifications';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import Single from './pages/Single/Single';
import AudioPost from './pages/Write/AudioPost';
import ImagePost from './pages/Write/ImagePost';
import VideoPost from './pages/Write/VideoPost';
import Write from './pages/Write/Write';

//import "slick-carousel/slick/slick.css"; 
//import "slick-carousel/slick/slick-theme.css";

function App() {
  const {user, socket, dispatch} = useContext(Context);

  useEffect(() => {
    const loadAuthUser = async () => {
      if(user != null){
        await getAuthUser(dispatch, user.id);
        socket.emit("addUser", user.id);
      }
    }
    loadAuthUser();
  }, [user, socket, dispatch]);

  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <ScrollToTop />
      <ToastContainer position="bottom-right" hideProgressBar/>
      <Switch>
         <Route path='/' exact component={user? Home : Login} />
         <Route path='/blogs' component={user? Blogs : Login} />
         <Route path='/write' component={user? Write : Login} />
         <Route path='/write-image-post' component={user? ImagePost : Login} />
         <Route path='/write-video-post' component={user? VideoPost : Login} />
         <Route path='/write-audio-post' component={user? AudioPost : Login} />
         <Route path='/profile/:id' component={user? Profile : Login} />
         <Route path='/messages' component={user? Messages : Login} />
         <Route path='/notifications' component={user? Notifications : Login} />
         <Route path='/categories' component={user? CategoryPage : Login} />
         <Route path='/postswrf4:idwrf4:user' component={user? Single : Login} />
         <Route path='/sign-in' component={user? Home :Login} />
         <Route path='/sign-up' component={user? Home : Register} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
