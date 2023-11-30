
import { useContext } from "react";
import RangePicker from "../../Components/DateRangePicker/RangePicker"
import { userContext } from "../../context/userContext";
import { Navigate } from "react-router";


const Reservas = () => {

  const userContextResults = useContext(userContext)
  const token = userContextResults.userJwt ? userContextResults.userJwt : null;
  console.log('Valor del token:', token);


  return (
    <>
      {!token ? <Navigate to="/login?reservationAlert=true" /> : 
      <div>
        <RangePicker/>
      </div>
      }
    </>
  )
}

export default Reservas
