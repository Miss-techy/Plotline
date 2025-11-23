import { useState } from "react";
import "./Login.css";



//prop for a function which will be called when the user successfully logins/ signs up
function Login( {onAuthSuccess} ) {


	const [isLogin, setIsLogin] = useState(true);  //determines which form to show:true shows login form and false show sigupform(setToggle is used to toggle between them)
	const [email, setEmail] = useState("");  //stores user's email 
  const [username,setUsername] = useState("") //stores username
	const [password, setPassword] = useState("") //stores user's password
	const [confirmPassword, setConfirmPassword] = useState("") //used in only sign-up mode 
	const [error, setError] = useState("") //holds error messages


// function to run when the form is submitted
	const handleSubmit = (e) => {
		e.preventDefault(); //prevents the page from reloading when the form is submitted
		setError(""); //clear previous error messages before checking new input

		// if the email or password fields are empty, set an error message and stop further execution using return
		if(!email || !password || !username) {
			setError("Please fill in all fields.");
			return
		}

		// if in signup mode, check whether the two passwords fields match. If not set an error message
		if(!Login && password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		// if successful store the user's email in the browser's localStorage
		localStorage.setItem("user", username);
		onAuthSuccess(username) // notifies the parent component that the user is logged in
	}



	return (

			<>


    <div className="auth-container">

    {/* display login title, if it is true else display sign up heading */}
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

      <form onSubmit={handleSubmit}>
       <label>Username</label>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* show this if the user is signing up */}
        {!isLogin && (
          <>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        )}

        {/* if there is an error message display error message */}
        {error && <p className="error">{error}</p>}


        {/* change the label of the button based on whether the user is logging or registering */}
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>

      {/* if login is true show register text, else show login text */}
      <p>
        {isLogin ? (
          <>
            Don’t have an account?{" "}

            {/* show sign up form when clicked */}
            <span className="link" onClick={() => setIsLogin(false)}>
              Register here
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            {/* show login form */}
            <span className="link" onClick={() => setIsLogin(true)}>
              Login here
            </span>
          </>
        )}
      </p>
    </div>
  );



			</>

		);


}


export default Login