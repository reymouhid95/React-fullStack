import { Button, Stack, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function AjouterPublication() {
  const user = JSON.parse(localStorage.getItem("utilisateur"));
  const {
    register,
    handleSubmit,
    reset,
    // eslint-disable-next-line no-unused-vars
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (pub) => {
      return axios.post("http://localhost:3000/publications", pub);
    },
    // eslint-disable-next-line no-unused-vars
    onError: (error) => {
      toast.error("Une erreur est survenue !");
    },
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries(["publications"]);
      toast.success("Publication ajoutée avec succès !");
    },
  });

  const onSubmit = (data) => {
    const publication = {
      ...data,
      idUtilisateur: user.id,
      datePublication: new Date(),
      likePublication: 0,
      auteur: user.nomUtilisateur,
    };
    mutation.mutate(publication);
  };
  return (
    <Stack width={"60%"} margin={"auto"}>
      <h1>Ajouter une publication</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 4 }}>
        <Stack gap={2}>
          <TextField
            id="filled-basic"
            label="Parlez-nous de votre journée"
            variant="outlined"
            fullwidth
            size="small"
            type="text"
            multiline
            rows={4}
            {...register("textPublication", {
              required: "Veullez saisir un text",
              minLength: {
                value: 10,
                message: "Veuillez saisir un text de plus de 10 caractères",
              },
            })}
          />
          <TextField
            id="filled-basic"
            label="Entrez l'url de l'image"
            variant="outlined"
            fullwidth
            size="small"
            type="text"
            {...register("imagePublication", {
              required: "Veullez saisir l'url",
            })}
          />
          <Button variant="contained" type="submit">
            Publier
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}

export default AjouterPublication;
