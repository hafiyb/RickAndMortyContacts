import { Grid } from '@mui/material';

const styles = {
  container: {
    display: 'flex',
    my: 2,
    width: '100%',
    backgroundColor: 'black',
    p: 2,
    borderRadius: 2,
  },
  gridItem:{
    px:1,
    overflow:'hidden',
    textOverflow:'ellipsis',
    display:'flex',
    alignItems:'center'
  }
};


const EpisodeCard = ({episode} : {episode:any}) => {
  return (
    <Grid container sx={styles.container}>
      <Grid item xs={4} sx={styles.gridItem}>
        {episode.name}
      </Grid>
      <Grid item xs={4} sx={styles.gridItem}>
        {episode.air_date}
      </Grid>
      <Grid item xs={4} sx={styles.gridItem}>
        {episode.episode}
      </Grid>
    </Grid>
  );
};

export default EpisodeCard;
