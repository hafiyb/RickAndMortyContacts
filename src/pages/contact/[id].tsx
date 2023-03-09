import EpisodeCard from '@/components/episodeCard';
import PersonalInfoLine from '@/components/personalInfoLine';
import { Box, Typography } from '@mui/material';

const styles = {
  container: {
    p: '5%',
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'secondary.main',
    px: {
      xs: '5%',
      sm: '20%'
    },
    py: 3,
    m: 4,
    borderRadius: 2,
  },
  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'primary.main',
    p: 2,
    m: 4,
    borderRadius: 2,
  },
};

interface Prop {
  character: any;
  episodes: [];
}

const CharacterPage = (prop: Prop) => {
  let character = prop.character;
  let episodes = Array.isArray(prop.episodes) ? prop.episodes : [prop.episodes];
  return (
    <Box sx={styles.container}>
      <Box sx={styles.headerContainer}>
        <Box
          component='img'
          src={character.image}
          sx={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            border: '5px solid',
            borderColor: 'primary.main',
          }}
        />
        <Typography sx={{ width: '100%', textAlign: 'center' }}>
          {character.name}
        </Typography>
      </Box>

      <Box sx={styles.sectionContainer}>
        <Typography>Personal info</Typography>
        <PersonalInfoLine title={'Status'} value={character.status} />
        <PersonalInfoLine title={'Gender'} value={character.gender} />
        <PersonalInfoLine title={'Location'} value={character.location} />
        <PersonalInfoLine title={'Origin'} value={character.origin} />
        <PersonalInfoLine title={'Species'} value={character.species} />
      </Box>

      <Box sx={styles.sectionContainer}>
        <Typography>Episodes</Typography>
        <Box sx={{ width: '100%', maxHeight: '500px', overflow: 'auto' }}>
          {episodes.map((ep: any) => (
            <EpisodeCard episode={ep} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch('https://rickandmortyapi.com/api/character');
  const posts = await res.json();

  // const paths = posts.results.map((post: any) => ({
  //   params: { id: post.id.toString() },
  // }));

  const paths = []
  for(let i = 1; i <= posts.info.pages; i++){
    paths.push({
      params: { id: i.toString()}
    })
  }

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const resCharacter = await fetch(
    `https://rickandmortyapi.com/api/character/${params.id}`
  );
  const character = await resCharacter.json();

  const episodeList = character.episode.map((ep: any) => {
    let epSplit = ep.split('/');
    return epSplit[epSplit.length - 1];
  });

  const resEpisode = await fetch(
    `https://rickandmortyapi.com/api/episode/${episodeList.toString()}`
  );

  const episodes = await resEpisode.json();

  return {
    props: {
      character,
      episodes,
    },
  };
};

export default CharacterPage;
