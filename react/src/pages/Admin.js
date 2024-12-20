import "../assets/css/Admin.css";
import Footer from "../components/Footer";
import Content from "../components/Content";
import Header from "../components/Header";

function Admin() {
	return (
		<>
			<Header page="Admin" />
			<Content page="Admin" />
			<Footer />
		</>
	);
}

export default Admin;