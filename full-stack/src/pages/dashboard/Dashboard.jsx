import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AjouterPublication from "./components/AjouterPublication";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CartePub from "./CartePub";
function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const utilisateur = localStorage.getItem("utilisateur");
    if (!utilisateur) {
      navigate("/connexion");
    }
  });

  const queryClient = useQueryClient();
  const {
    data: publications,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["publications"],
    queryFn: () =>
      axios.get("http://localhost:3000/publications").then((res) => res.data),
    onerror: (error) => console.log(error),
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  let pubTrier = publications.sort((a, b) => {
    return new Date(b.datePublication) - new Date(a.datePublication);
  });

  return (
    <Box bgcolor={"#eef4ff"}>
      <Navbar />
      <AjouterPublication />
      <Box width={"60%"} margin={"auto"} marginTop={4}>
        {publications &&
          pubTrier.map((publication) => (
            <CartePub key={publication.id} publication={publication} />
          ))}
      </Box>
    </Box>
  );
}

export default Dashboard;
