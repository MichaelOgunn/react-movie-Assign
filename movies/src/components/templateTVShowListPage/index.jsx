import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import TVShowCard from "../tvShowCard";

function TemplateTVShowListPage({ shows, title, action }) {


  
  return (
    <Grid container sx={{ padding: '20px ' }}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        {shows.map((s) => (
          <Grid key={s.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <TVShowCard key={s.id} show={s} action={action} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
export default TemplateTVShowListPage;