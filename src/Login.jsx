import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("alice@inboderland.com");
  const [password, setPassword] = useState("password");
  const [message, setMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchProfilData = async () => {
      try {
        const response = await fetch("/api/me", {
          credentials: "include", // Assurez-vous d'inclure les credentials si nécessaire
        });
        if (!response.ok) {
          throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setMessage("Tu es connecté, tu peux aller sur la page profil :");
        setIsConnected(true);
      } catch (error) {
        setMessage(
          "Tu n'es pas connecté, tu peux aller sur la page profil, mais tu n'auras pas tes infos :"
        );
        // console.error(
        //   "Erreur lors de la récupération des données du profil",
        //   error
        // );
      }
    };

    fetchProfilData();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      setMessage("Tu es connecté, tu peux aller sur la page profil :");
      setIsConnected(true);
    } catch (error) {
      console.error("Erreur lors de la connexion", error);
    }
  };

  return (
    <>
      {/* <a href="/api/me">me !!!!</a> */}
      {isConnected ? (
        <div>
          <p>{message}</p>
        </div>
      ) : (
        <>
          <form style={{ textAlign: "center" }} onSubmit={handleLogin}>
            <p>
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </p>
            <p>
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </p>
            <button type="submit">Login</button>
          </form>
          <p>{message}</p>
        </>
      )}
      <Link to="/profil">page profil !!!!</Link>
    </>
  );
}

export default Login;
