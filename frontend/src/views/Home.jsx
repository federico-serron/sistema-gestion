import React, { useContext, useEffect } from 'react'
import { Context } from '../js/store/appContext.jsx';
import { Link } from "react-router-dom";



function Home() {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    const getMsgDemo = async () => {
      const msg = await actions.demoFunction();
      if (!msg) {
        store.demoMsg = "Error fetching message";
        return false;
      }
    };
    getMsgDemo();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8 space-y-6">
      <h1 className="text-4xl font-bold text-blue-600">¡Bienvenido a la App!</h1>
      <p className="text-gray-700 text-center max-w-md">
        Para comenzar, podés iniciar sesión si ya tenés cuenta o registrarte si sos nuevo.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Iniciar sesión
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Registrarse
        </Link>
      </div>
    </div>
  );
}

export default Home;