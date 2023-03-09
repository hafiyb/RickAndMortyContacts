import { Box, Grid, Typography } from '@mui/material';
import Link from 'next/link';

const styles = {
  container: {
    display: 'flex',
    my: 2,
    width: '100%',
    backgroundColor: 'black',
    p: 2,
    borderRadius: 2,
  },
};

const PersonalInfoLine = ({
  title,
  value,
}: {
  title: string;
  value: string | { name: 'string'; url: 'string' };
}) => {
  return (
    <Grid container sx={styles.container}>
      <Grid item xs={3} sm={2}>
        {title}
      </Grid>
      <Box sx={{ width: '2px', backgroundColor: 'secondary.main', mx: 2 }} />
      {typeof value === 'string' ? (
        <Grid item xs={3} sm={2}>
          {value}
        </Grid>
      ) : typeof value === 'object' ? (
        <Grid item xs={3} sm={2}>
          <Link href={value.url}>{value.name}</Link>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default PersonalInfoLine;
