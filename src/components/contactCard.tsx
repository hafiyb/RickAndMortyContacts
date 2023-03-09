import { Grid } from '@mui/material';
import Link from 'next/link';

const styles = {
  container: {
    backgroundColor: 'primary.main',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    my:2,
    p:2,
    borderRadius:2
  },
  gridItem:{
    display:'flex',
    justifyContent:'center',
    textAlign:'center'
  }
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
        <Grid item xs={3} sx={styles.gridItem}>
          {name}
        </Grid>
        <Grid item xs={3} sx={styles.gridItem}>{status}</Grid>
        <Grid item xs={3} sx={styles.gridItem}>{species}</Grid>
        <Grid item xs={3} sx={styles.gridItem}>{gender}</Grid>
      </Grid>
    </Link>
  );
};

export default ContactCard;
