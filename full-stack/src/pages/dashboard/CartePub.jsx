/* eslint-disable react/prop-types */
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

function CartePub({ publication }) {
  const user = JSON.parse(localStorage.getItem("utilisateur"));
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => {
      return axios.delete(`http://localhost:3000/publications/${id}`);
    },
    // eslint-disable-next-line no-unused-vars
    onError: (error) => {
      toast.error("Une erreur est survenue !");
    },
    onSuccess: () => {
      queryClient.invalidateQueries("publications");
      toast.success("Publication supprimée avec succès !");
    },
  });

  const supprimerPublication = (id) => {
    mutation.mutate(id);
  };

  return (
    <Box
      key={publication.id}
      width={"100%"}
      bgcolor={"#ffff"}
      borderRadius={4}
      marginBottom={3}
      padding={2}
    >
      <Stack direction={"row"} alignItems={"center"} gap={2}>
        <Avatar src={publication.photoUtilisateur} />
        <Typography>{publication.auteur}</Typography>
      </Stack>
      <Typography>{publication.textePublication}</Typography>
      {user.id === publication.idUtilisateur && (
        <IconButton
          aria-label="delete"
          onClick={() => supprimerPublication(publication.id)}
        >
          <DeleteIcon />
        </IconButton>
      )}
      <img
        src={publication.imagePublication}
        alt="Publication"
        style={{
          width: "100%",
        }}
      />
    </Box>
  );
}

export default CartePub;
