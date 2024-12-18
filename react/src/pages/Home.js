import "../assets/css/Home.css";
import Footer from "../components/Footer";
import Content from "../components/Content";
import Header from "../components/Header";

function Home() {
	return (
		<>
			<Header page="Home" />
			<Content page="Home" />
			<Footer />
		</>
	);
}

export default Home;