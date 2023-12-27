import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Profil() {
  const navigate = useNavigate();

  const [profilData, setProfilData] = useState(null);

  useEffect(() => {
    // ne faites pas attention au useEffect, c'est du react, l'important est la requete pour récuperer les infos du profil
    const fetchProfilData = async () => {
      try {
        // Voici la requete fetch pour récupérer les données du profil
        const response = await fetch("http://localhost:3000/me", {
          credentials: "include",
        });
        // Si le serveur répond avec un code d'erreur, on le gère et on s'arrete ici
        if (!response.ok) {
          throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }
        // Si tout se passe bien, on récupère les données en JSON
        const data = await response.json();
        // Et on met à jour le state avec les données du profil
        setProfilData(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données du profil",
          error
        );
      }
    };

    fetchProfilData();
  }, []);

  const handleLogout = async () => {
    try {
      // On envoie la requete vers la bonne route back
      await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include", // ici on envoi le cookie pour la gestion des sessions (le "credentials: include" est obligatoire pour envoyer le cookie, sinon le cookie ne sera pas envoyé)
      });
      // On redirige vers la page de connexion (ou d'accueil dans notre cas) après la déconnexion.
      navigate("/"); // on utilise la fonction navigate de react-router-dom, pour svelte, il faut utiliser l'équivalent.
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  return (
    <div>
      <h1>Ma paaaage !!!! {!profilData ?? "tu n'es pas authentifie"}</h1>

      {profilData ? (
        <div>
          <Link to="/">Retour à la page d'accueil</Link>
          <p>
            Nom d'utilisateur : {profilData.username}{" "}
            <button onClick={handleLogout}>Logout</button>
          </p>
        </div>
      ) : (
        <p>
          Tu n'as rien à faire ici !!! Va te <Link to="/">logger</Link>
        </p>
      )}
    </div>
  );
}

export default Profil;
