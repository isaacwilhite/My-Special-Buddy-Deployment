import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { useChatContext } from './ChatContext';
import CustomSnackbar from './CustomSnackbar'
// import AlertBar from './AlertBar'

const VolunteerLogin = () => {
  const navigate = useNavigate()
  const { setChatUser } = useChatContext();
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  
//   const [email, setEmail] = useState('')
//   const [pass, setPass] = useState('')
//   const [alertMessage, setAlertMessage] = useState(null);
//   const [snackType, setSnackType] = useState('');
const handleError = (message) => {
  setSnackbarMessage(message);
  setSnackbarSeverity('error');
  setSnackbarOpen(true);
};

  const formSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required("Please enter an email."),
    password: yup.string().required("Please enter a password.").min(5)
  })
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch('/login/volunteer', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('jwt_token', data.token); 
        setChatUser({ userType: 'volunteer', userId: data.volunteer.id, userName: data.volunteer.name, userBio: data.volunteer.bio, userLocation: data.volunteer.location })
        navigate('/volunteer_home');
      })
      .catch(error => {
        handleError(`Invalid credentials`);
      })
    }
  })
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  return (
    <div className="login-form-container">
      <form onSubmit={formik.handleSubmit} id='formikLogin' className="login-form">
        <h1 className='modaltitle'>Login</h1>
        <h3 className='modaltag'>Please enter your email and password.</h3>
        <input id='email' className='loginInput' type='text' onChange={formik.handleChange} value={formik.values.email} placeholder="Enter Email"></input>
        <input id='password' className='loginInput' type='password' onChange={formik.handleChange} value={formik.values.password} placeholder="Enter Password"></input>
        <div id='loginButtons'>
          <button className='modalbutton' type='submit'>Login</button>
          <button className='modalbutton' onClick={() => navigate('/')}>Cancel</button>
          <CustomSnackbar 
        open={isSnackbarOpen} 
        handleClose={handleCloseSnackbar} 
        message={snackbarMessage} 
        severity={snackbarSeverity} 
      />
    </div>
    </form>
  </div>  
)
}

export default VolunteerLogin;