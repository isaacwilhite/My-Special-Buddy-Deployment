
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useChatContext } from './ChatContext'
import CustomSnackbar from './CustomSnackbar'
import ashley from './home_styling/images/ashley.jpg'
import autumn from './home_styling/images/autumn.jpg'
import kai from './home_styling/images/Kai.jpg'
import ellie from './home_styling/images/Ellie.jpg'
import gavin from './home_styling/images/Gavin.jpg'

const MeetVolunteers = () => {
    const [volunteers, setVolunteers] = useState([]);
    const navigate = useNavigate();
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const handleError = (message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
  };
  
    useEffect(() => {
      const token = localStorage.getItem('jwt_token');
      const fetchVolunteers = async () => {
        try {
          const response = await fetch('/volunteers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
          if (!response.ok) {
            handleError('Network response was not okay!');
          }
          const data = await response.json();
          setVolunteers(data); 
        } catch (error) {
          handleError(`Error fetching Buddies: ${error}`);
        }
      };

      fetchVolunteers(); 
    }, []);
    const onCreateChatRoom = async (volunteerId) => {
      const token = localStorage.getItem('jwt_token'); 
      try {
        const response = await fetch('/create_chat_room', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify({ volunteer_id: volunteerId }),
        });
    
        if (!response.ok) {
          handleError(`HTTP error! Status: ${response.status}`);
        }
    
        const chatRoom = await response.json();
        navigate(`/chat/${chatRoom.chat_room_id}`, { state: { volunteerId: volunteerId }})
      } catch (error) {
        handleError(`Failed to create chat room: ${error}`);
        
      }
    };

    const handleBackToHome = () => {
      navigate('/user_home'); 
    };

    const handleCloseSnackbar = () => {
      setSnackbarOpen(false);
    };

  //   const handlePictureSelect = (volunteerName) => {
  //     switch (volunteerName) {
  //         case "Ashley":
  //             return ashley;
  //         case "Autumn":
  //             return autumn;
  //         case "Kai":
  //             return kai;
  //         case "Ellie":
  //             return ellie;
  //         case "Gavin":
  //             return gavin;
  //         default:
  //             return "defaultImagePath"; // Replace with a default image path if needed
  //     }
  // };
  
    return (
      <div className="volunteer-container">
        <button onClick={handleBackToHome} className="back-home-button">Back to Home</button> {/* Back to Home button */}
        {volunteers.map((volunteer) => (
          <div key={volunteer.id} className="volunteer-profile">
            {/* <img src={handlePictureSelect(volunteer.name)} alt={volunteer.name} /> */}
            <h3>{volunteer.name}</h3>
            <p>Bio: {volunteer.bio}</p>
            <p>Location: {volunteer.location}</p>
            <button onClick={() => onCreateChatRoom(volunteer.id)} className="message-button">Message</button>
            <CustomSnackbar 
        open={isSnackbarOpen} 
        handleClose={handleCloseSnackbar} 
        message={snackbarMessage} 
        severity={snackbarSeverity} 
      />
          </div>
        ))}
      </div>
    );
};

export default MeetVolunteers;
