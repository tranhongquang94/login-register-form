import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const navButton = { mt: "1rem", mr: "2rem" };
const formStyle = {
  mt: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
};

const googleLinkStyle = {
  fontSize: "0.875rem",
  textDecoration: "none",
  m: 2,
  fontWeight: 500,
  letterSpacing: "0.02857em",
  textTransform: "uppercase",
  padding: "1rem .5rem",
  "&:hover": {
    backgroundColor: "rgba(25, 118, 210, 0.04)",
  },
};

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  
  useEffect(() => {
    const param = new URLSearchParams(window.location.search);
    if (param.get('user')) {
      setUsername(param.get('user'));
      setIsLoggedIn(true);
      localStorage.setItem('user',param.get('user'));
    }
  }, []);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUsername(loggedInUser);
      setShowForm(false);
    }
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    let fullName;
    if (e.target.fullName) {
      fullName = e.target.fullName.value;
    }
    let actionUrl;
    if (showRegister) {
      actionUrl = "api/register";
    } else {
      actionUrl = "api/login";
    }

    axios
      .post(actionUrl, { email, password, fullName })
      .then((res) => {
        if (res.data.length) {
          setIsLoggedIn(true);
          setUsername(res.data[0].full_name);
          setShowForm(false);
          localStorage.setItem('user', res.data[0].full_name);
        } else {
          alert("Username or password is incorrect!");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogOut = () => {
    axios.get('api/logout')
    .then(res => {
      setIsLoggedIn(false);
      setUsername("");
      localStorage.removeItem('user');
      window.location.href="/"
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <nav className="header">
        <Button
          sx={navButton}
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Home
        </Button>
        {isLoggedIn ? 
        (
          <>
          <Typography component="span">{`Welcome, ${username}`}</Typography>
          <Button sx={navButton} onClick={() => handleLogOut()}>Log Out</Button>
          </>
        ) : 
        (
          <Button
            sx={navButton}
            onClick={() => {
              setShowForm(true);
              setShowRegister(false);
            }}
          >
            Log In
          </Button>
        )}
      </nav>
      {!showForm && !isLoggedIn && "Please press the login button to login."}
      {showForm && (
        <div className="modal-container">
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Box
            onSubmit={(e) => handleSubmit(e)}
            method="POST"
            component="form"
            sx={formStyle}
          >
            <Typography component="h1" variant="h5">
              {showRegister ? "Sign Up" : "Sign In"}
            </Typography>

            {showRegister && (
              <TextField
                required
                margin="normal"
                name="fullName"
                label="Full Name"
                type="text"
                fullWidth
              />
            )}

            <TextField
              required
              name="email"
              label="Email"
              type="text"
              margin="normal"
              fullWidth
            />

            <TextField
              required
              name="password"
              label="Password"
              type="password"
              margin="normal"
              fullWidth
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mb: 2 }}>
              {showRegister ? "Sign Up" : "Sign In"}
            </Button>
          </Box>

          <Link href="api/auth/google" sx={googleLinkStyle}>
            Authentication with Google
          </Link>

          <Button onClick={() => {
            setShowRegister(prevState => !prevState);
          }}>
            {showRegister
              ? "Already have an account ? Sign In"
              : "Don't have an account? Sign Up"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
