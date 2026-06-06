import { Link } from "react-router";

const HomePage = () => {
  return (
    <section>
      <h2>Home</h2>
      <p>Welcome to Product Management App.</p>

      <Link to="/products">Go to product list</Link>
    </section>
  );
};

export default HomePage;
