import React, { useState, useContext } from "react";
import { Context } from "../js/store/appContext";
import { Link } from "react-router-dom";


const RegisterForm = () => {
    const { actions } = useContext(Context);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await actions.register(email, password, name);

        if (result.success) {
            setMensaje("Registro exitoso ✅");
            setError(null);
            // Limpiar el formulario
            setName("");
            setEmail("");
            setPassword("");
        } else {
            setError(result.error || "Error al registrarse.");
            setMensaje(null);
        }
    };

    return (
        <div className="flex justify-center items-center w-full min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 bg-opacity-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Registrarse</h2>

                {mensaje && (
                    <div className="mb-4 p-3 rounded bg-green-100 text-green-800 text-sm">
                        {mensaje}
                    </div>
                )}

                {error && (
                    <div className="mb-4 p-3 rounded bg-red-100 text-red-800 text-sm">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
                >
                    Registrarse
                </button>
                <p className="mt-4 text-center text-gray-700">
                    ¿Ya tenés cuenta?{" "}
                    <Link to="/login" className="text-blue-600 underline hover:text-blue-800">
                        Iniciar sesión
                    </Link>
                </p>

            </form>
        </div>
    );
};

export default RegisterForm;
