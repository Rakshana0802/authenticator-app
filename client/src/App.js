import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Home from "./pages/Home";
function App() {
	return (
		<div className="container">
			<Routes>
      <Route
					exact
					path="/"
					element={<Login />}
				/>
				<Route
					exact
					path="/home"
					element={<Home />}
				/>
				<Route
					exact
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/signup"
					element={<Signup />}
				/>
			</Routes>
		</div>
	);
}

export default App;

