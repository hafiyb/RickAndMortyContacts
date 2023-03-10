import Head from 'next/head';
import {
  Box,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/helper';
import { useRouter } from 'next/router';

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
  headerCell: {
    color: 'inherit',
    width: '50px',
    backgroundColor: 'primary.main',
  },
  bodyCell: {
    color: 'inherit',
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

  const router = useRouter();

  const debouncedFilter = useDebounce(filter, 500);

  const handleFetch = () => {
    fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${debouncedFilter}`
    )
      .then((res) => res.json())
      .then((data) => setCharacters(data));
  };
  useEffect(() => {
    handleFetch();
  }, [page]);

  useEffect(() => {
    setPage(1);
    if (page === 1) {
      handleFetch();
    }
  }, [debouncedFilter]);

  return (
    <>
      <Head>
        <title>Contact List - SleekFlow</title>
        <meta
          name='description'
          content='View our list of contacts with their related information'
        />
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
          <Typography sx={{ my: 2, fontSize: '28px' }}>Contacts</Typography>
          <TextField
            placeholder='Search here'
            onChange={(e) => setFilter(e.target.value)}
          />
        </Box>
        {/* =================================================================================== */}
        {/* Contact list table starts here */}
        {/* =================================================================================== */}
        <TableContainer component={Paper} sx={{ height: '70%' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={styles.headerCell}>Name</TableCell>
                <TableCell sx={styles.headerCell}>Status</TableCell>
                <TableCell sx={styles.headerCell}>Species</TableCell>
                <TableCell sx={styles.headerCell}>Gender</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {characters?.results?.map((character: any, index: number) => (
                <TableRow
                  onClick={() => router.push(`contact/${character.id}`)}
                  sx={{
                    ':hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <TableCell sx={styles.bodyCell}>{character.name}</TableCell>
                  <TableCell sx={styles.bodyCell}>{character.status}</TableCell>
                  <TableCell sx={styles.bodyCell}>
                    {character.species}
                  </TableCell>
                  <TableCell sx={styles.bodyCell}>{character.gender}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* =================================================================================== */}
        {/* End of contact list table */}
        {/* =================================================================================== */}
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
