// import { useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatContext } from './ChatContext'
import MyUserNavbar from './home_styling/MyUserNavbar';
import Footer from './home_styling/Footer';

const UserHome = () => {
  const navigate = useNavigate();
  const { chatUser, setChatUser } = useChatContext()
  console.log(chatUser)


  const handleLogout = () => {
    localStorage.removeItem('jwt_token'); 
    localStorage.removeItem('chatUser')
    setChatUser(null)
    navigate('/');
  };

  return (
    <>
      <MyUserNavbar />
    <div className="user-home">
      <h1>Welcome, {chatUser.userName}</h1>
      <div>
        <h2>Profile Details:</h2>
        <p><strong>Child's Name:</strong> {chatUser.childName}</p>
        <p><strong>Bio:</strong> {chatUser.userBio}</p>
        <p><strong>Favorite Activities:</strong> {chatUser.activities}</p>
        <p><strong>Location:</strong> {chatUser.userLocation}</p>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
    <Footer />
    </>
  );
};

export default UserHome;