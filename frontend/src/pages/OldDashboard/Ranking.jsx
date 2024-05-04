import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

import MainCard from '../../components/MainCard';

export default function Ranking() {
  return (
    <>
      <Grid container sx={{ m: "1rem 0" }}>
        <Grid item xs="6">
          <MainCard>
            <Typography variant='h6' color={"dark"} sx={{ m: "1rem 0" }}>
              Sales Ranking - Saintberry
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemIcon>
                  <MilitaryTechIcon />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="h6"><b>Our Brand</b></Typography>} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <SentimentNeutralIcon />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="h6">lalalaDa</Typography>} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <SentimentNeutralIcon />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="h6">SiPep</Typography>} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <SentimentNeutralIcon />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="h6">TaFan</Typography>} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <ThumbDownAltIcon />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="h6">SolveDrink</Typography>} />
              </ListItem>
            </List>
          </MainCard>
        </Grid>
        <Grid item xs="6">
          <MainCard>
            <Typography variant='h6' color={"dark"} sx={{ m: "1rem 0" }}>
              Sales Ranking - Morry'sGirl
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemIcon>
                  <MilitaryTechIcon />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="h6"><b>Our Brand</b></Typography>} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <SentimentNeutralIcon />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="h6">TaFan</Typography>} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <SentimentNeutralIcon />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="h6">lalalaDa</Typography>} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <SentimentNeutralIcon />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="h6">SolveDrink</Typography>} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <ThumbDownAltIcon />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="h6">SiPep</Typography>} />
              </ListItem>
            </List>
          </MainCard>
        </Grid>
      </Grid>
    </>
  )
}