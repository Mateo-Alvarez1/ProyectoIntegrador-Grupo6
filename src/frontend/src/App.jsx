import "./App.css";
import "./Components/Header/header.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin/Admin";
import Home from "./routes/Home/Home";
import Producto from "./routes/Producto/Producto";
import Login from "./routes/Login/Login";
import SignUp from "./routes/SignUp/SignUp";
import SignUpAdm from "./routes/SignUpAdm/SignUpAdm";
import UserContextProvider from "./context/userContext";
import EditarProducto from "./pages/Admin/EditarProducto/EditarProducto";
import Reservas from "./routes/Reservas/Reservas";
import HistorialReserva from "./Components/HistorialReserva/HistorialReserva";
import ListadoFavs from "./Components/ListadoFavs/ListadoFavs";
import whatsapp from "./assets/whatsapp.png"
import ReservaConfirmacion from "./Components/ReservaConfirmación/ReservaConfirmacion";

function App() {
  return (
    <UserContextProvider>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signupadm" element={<SignUpAdm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/reservas/:productoId" element={<Reservas />} />
          <Route
            path="/reservas/confirmadas/:reservaID"
            element={<ReservaConfirmacion/>}
          />
          <Route path="producto/:productoId" element={<Producto />} />
          <Route path="/editarprod/:id" element={<EditarProducto />} />
          <Route path="historial/:userEmail" element={<HistorialReserva />} />
          <Route path="listadofavs/:userEmail" element={<ListadoFavs />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
        <div className="whatsapp-button">
          <a
            href="https://wa.me/5491132994468?text=Hola,%20PitchPlease!%20Quiero%20hacer%20una%20consulta."
            target="blank"
          >
            <img src={whatsapp} alt="whatsapp pitch" />
          </a>
        </div>
        <Footer />
      </>
    </UserContextProvider>
  );
}

export default App;
