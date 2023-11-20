/* eslint-disable no-unused-vars */
import { Stack, Box, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Inscription() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data.motDePasse !== data.motDePasseConfirmation) {
      toast.error("Les mots de passe ne correspondent pas!");
    } else {
      axios
        .get(
          `http://localhost:3000/posts?mailUtilisateur=${data.mailUtilisateur}`
        )
        .then((res) => {
          if (res.data.length > 0) {
            toast.error("Un compte existe déjà avec cette adresse mail");
          } else {
            axios
              .get("http://localhost:3000/posts", data)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
                toast.error("Une erreur est survenue");
              });
            toast.success("Inscription réussie!");
            navigate("/connexion");
          }
        });
    }
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
        {" "}
        <Typography variant="h3">Inscription</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={"column"} gap={2}>
            <TextField
              id="filled-basic"
              label="Veuillez saisir votre nom"
              variant="outlined"
              fullWidth
              size="small"
              type="text"
              {...register("nomUtilisateur", {
                required: "Veullez saisir un nom",
                minLength: {
                  value: 5,
                  message: "Veuillez saisir un nom de plus de 5 caractères",
                },
              })}
            />
            <TextField
              id="filled-basic"
              label="Veuillez saisir votre adresse mail"
              variant="outlined"
              fullWidth
              size="small"
              type="email"
              {...register("mailUtilisateur", {
                required: "Veullez saisir votre mail",
                pattern: "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/",
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
                required: "Veullez saisir un mot de passe",
                minLength: {
                  value: 6,
                  message:
                    "Veuillez saisir un mot de passe de plus de 6 caractères",
                },
              })}
            />
            <TextField
              id="filled-basic"
              label="Veuillez confirmer votre mot de passe"
              variant="outlined"
              fullWidth
              size="small"
              type="password"
              {...register("motDePasseConfirmation", {
                required: "Veullez saisir un mot de passe",
                minLength: {
                  value: 6,
                  message:
                    "Veuillez saisir un mot de passe de plus de 6 caractères",
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
            Inscription
          </Button>
          <Typography paddingTop={2}>
            Avez-vous déjà un compte ?{" "}
            <Link to="/connexion">Cliqueuz ici !</Link>
          </Typography>
        </form>
      </Box>
    </Stack>
  );
}

export default Inscription;
