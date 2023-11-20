/* eslint-disable no-unused-vars */
import { Stack, Box, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

function Connexion() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("utilisateur")) {
      navigate("/");
    }
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .get(
        `http://localhost:3000/posts?mailUtilisateur=${data.mailUtilisateur}&motDePasse=${data.motDePasse}`
      )
      .then((res) => {
        if (res.data.length > 0) {
          localStorage.setItem("utilisateur", JSON.stringify(res.data[0]));
          navigate("/");
          toast.success("Connexion réussie !");
        } else {
          toast.error("Les identifiants sont incorrects !");
        }
      })
      .catch((error) => {
        toast.error("Une erreur s'est produite lors de la connexion !");
        console.error(error);
      });
  };

  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      height={"100vh"}
      backgroundColor={"#f5f5"}
    >
      <Box
        width={"400px"}
        sx={{
          backgroundColor: "#fff",
          padding: 3,
        }}
      >
        <Typography variant="h3">Connexion</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={"column"} gap={2}>
            <TextField
              id="filled-basic"
              label="Veuillez saisir votre adresse mail"
              variant="outlined"
              fullWidth
              size="small"
              type="email"
              {...register("mailUtilisateur", {
                required: "Veuillez saisir votre mail",
                pattern: {
                  value:
                    /^[\w-]+([.-]?[\w-]+)*@[\w-]+([.-]?[\w-]+)*(\.\w{2,3})+$/,
                  message: "Veuillez saisir une adresse email valide",
                },
              })}
            />
            <TextField
              id="filled-basic"
              label="Veuillez saisir votre mot de passe"
              variant="outlined"
              fullWidth
              size="small"
              type="password"
              {...register("motDePasse", {
                required: "Veuillez saisir un mot de passe",
                minLength: {
                  value: 6,
                  message:
                    "Veuillez saisir un mot de passe d'au moins 6 caractères",
                },
              })}
            />
          </Stack>
          <Button
            variant="contained"
            sx={{
              marginTop: 2,
            }}
            type="submit"
          >
            Connexion
          </Button>
          <Typography paddingTop={2}>
            Voulez-vous créer un compte ?{" "}
            <Link to="/inscription">Cliquez ici !</Link>
          </Typography>
        </form>
      </Box>
    </Stack>
  );
}

export default Connexion;
