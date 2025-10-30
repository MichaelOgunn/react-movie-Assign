import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";

export default function MovieCredits({ movie }) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["credits", { id: movie?.id }],
    queryFn: getMovieCredits,
    enabled: !!movie?.id, // ✅ only runs once movie.id is ready
  });

  if (!movie?.id) return <Spinner />;
  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const credits = data?.cast || [];

  if (credits.length === 0) {
    return <p>No cast information available.</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="movie credits table">
        <TableHead>
          <TableRow>
            <TableCell>Actor</TableCell>
            <TableCell align="center">Character</TableCell>
            <TableCell align="center">Department</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {credits.map((c) => (
            <TableRow key={c.cast_id || c.credit_id}>
              <TableCell component="th" scope="row">
                {c.name}
              </TableCell>
              <TableCell align="center">{c.character || "—"}</TableCell>
              <TableCell align="center">{c.known_for_department}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
