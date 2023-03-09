import Head from 'next/head';
import {
  Box,
  Grid,
  Pagination,
  TextField,
  Typography,
} from '@mui/material';
import ContactCard from '@/components/contactCard';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/helper';

const styles = {
  page: {
    backgroundColor: 'background',
    width: '100vw',
    height: '100vh',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    px: {
      xs: '5%',
      sm: '10%',
    },
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
  },
};

interface ICharacters {
  info: { count: number; pages: number; next: string; previous: string };
  results: [];
}

export default function Home() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [characters, setCharacters] = useState<ICharacters>({
    info: { count: 0, pages: 1, next: '', previous: '' },
    results: [],
  });

  const pageReset = useDebounce(filter,400)
  const debouncedFilter = useDebounce(filter, 500);

  const handleFetch = () => {
    fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${debouncedFilter}`
    )
      .then((res) => res.json())
      .then((data) => setCharacters(data));
  } 
  useEffect(() => {
    handleFetch()
  }, [page]);

  useEffect(() => {
    setPage(1)
    if(page === 1){
      handleFetch()
    }
  }, [debouncedFilter])

  return (
    <>
      <Head>
        <title>Contact List - SleekFlow</title>
        <meta name='description' content='View our list of contacts with their related information' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box sx={styles.page}>
        <Box
          sx={{
            width: '100%',
            py: '5%',
          }}
        >
          <Typography sx={{my:2, fontSize:'28px'}}>
            Contacts
          </Typography>
          <TextField
            placeholder='Search here'
            onChange={(e) => setFilter(e.target.value)}
          />
        </Box>
        <Grid container sx={{ px: 2 }}>
          <Grid item xs={3} sx={styles.gridItem}>
            <Typography>Name</Typography>
          </Grid>
          <Grid item xs={3} sx={styles.gridItem}>
            <Typography>Status</Typography>
          </Grid>
          <Grid item xs={3} sx={styles.gridItem}>
            <Typography>Species</Typography>
          </Grid>
          <Grid item xs={3} sx={styles.gridItem}>
            <Typography>Gender</Typography>
          </Grid>
        </Grid>
        <Box sx={{ width: '100%', height: '70%', overflow: 'auto' }}>
          {characters?.results?.map((character: any, index: number) => (
            <ContactCard
              key={index}
              id={character.id}
              name={character.name}
              status={character.status}
              species={character.species}
              gender={character.gender}
            />
          ))}
        </Box>
        <Pagination
          sx={{
            my: 2,
          }}
          count={characters?.info?.pages}
          onChange={(e, value) => setPage(value)}
          page={page}
          boundaryCount={0}
          siblingCount={2}
        />
      </Box>
    </>
  );
}
