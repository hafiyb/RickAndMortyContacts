import { Grid } from '@mui/material';
import Link from 'next/link';

const styles = {
  container: {
    backgroundColor: 'primary.main',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    my:2
  },
};

interface contactCardProps {
  id: number;
  name: string;
  status: string;
  species: string;
  gender:string
}

const ContactCard = ({ id, name, status, species, gender }: contactCardProps) => {
  return (
    <Link href={`/contact/${id}`} style={{width:'100%'}}>
      <Grid container sx={styles.container}>
        <Grid item xs={3}>
          {name}
        </Grid>
        <Grid item xs={3}>{status}</Grid>
        <Grid item xs={3}>{species}</Grid>
        <Grid item xs={3}>{gender}</Grid>
      </Grid>
    </Link>
  );
};

export default ContactCard;
