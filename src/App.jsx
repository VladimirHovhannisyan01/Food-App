import Header from "./components/Layouts/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";

const App = () => {
  return (
    <>
      <Cart />
      <Header />
      <main>
        <Meals />
      </main>
    </>
  );
};

export default App;
