import { ToastContainer } from "react-toastify";
import AppRouter from "./infrastucture/router/AppRouter";

export default function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}