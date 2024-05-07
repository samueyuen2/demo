import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import GradeIcon from '@mui/icons-material/Grade';

import MainCard from '../../components/MainCard';

export default function Ranking() {
  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={6}>
        <Paper elevation={1} sx={{ p: 1, mt: 3 }}>
          <Typography variant='h5' color={"dark"} sx={{ m: "1rem 0" }}>
            <center>Top 5 Biggest Price Drop <TrendingDownIcon /></center>
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <EmojiEventsIcon style={{ color: "gold" }} fontSize='large' />
              </ListItemIcon>
              <ListItemText primary={
                <Grid container>
                  <Grid item xs="auto">
                    <img src={"https://s3.eu-central-1.amazonaws.com/bn.production.core-images/7613287005700"} height="70" width="100%" />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6">
                      <b>Nescafe Alta Rica Instant Coffee 190g</b><br />
                      <Chip label={"£8.5 > £5"} sx={{ fontSize: 20 }} /> <Chip label={"Save £3.5"} sx={{ fontSize: 20 }} color='success' />
                    </Typography>
                  </Grid>
                </Grid>
              } />
            </ListItem>
            <Divider sx={{ my: "0.75rem" }} />
            <ListItem disablePadding>
              <ListItemIcon>
                <EmojiEventsIcon style={{ color: "silver" }} fontSize='large' />
              </ListItemIcon>
              <ListItemText primary={
                <Grid container>
                  <Grid item xs="auto">
                    <img src={"https://s3.eu-central-1.amazonaws.com/bn.production.core-images/8000070046542"} height="70" width="100%" />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6">
                      <b>Carte Noire Classique Instant Coffee 180g</b><br />
                      <Chip label={"£7 > £4"} sx={{ fontSize: 20 }} /> <Chip label={"Save £3"} sx={{ fontSize: 20 }} color='success' />
                    </Typography>
                  </Grid>
                </Grid>
              } />
            </ListItem>
            <Divider sx={{ my: "0.75rem" }} />
            <ListItem disablePadding>
              <ListItemIcon>
                <EmojiEventsIcon style={{ color: "#CD7F32" }} fontSize='large' />
              </ListItemIcon>
              <ListItemText primary={
                <Grid container>
                  <Grid item xs="auto">
                    <img src={"https://s3.eu-central-1.amazonaws.com/bn.production.core-images/7613287220455"} height="70" width="100%" />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6">
                      <b>Nescafe Gold Blend Roastery Collection Dark Roast Instant Coffee 100g</b><br />
                      <Chip label={"£5 > £2.5"} sx={{ fontSize: 20 }} /> <Chip label={"Save £2.5"} sx={{ fontSize: 20 }} color='success' />
                    </Typography>
                  </Grid>
                </Grid>
              } />
            </ListItem>
            <Divider sx={{ my: "0.75rem" }} />
            <ListItem disablePadding>
              <ListItemIcon>
                <EmojiEventsIcon style={{ color: "#CD7F32" }} fontSize='large' />
              </ListItemIcon>
              <ListItemText primary={
                <Grid container>
                  <Grid item xs="auto">
                    <img src={"https://s3.eu-central-1.amazonaws.com/bn.production.core-images/5060426630798"} height="70" width="100%" />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6">
                      <b>Green Origins Organic Japanese Ceremonial Matcha Green Tea Powder 30g</b><br />
                      <Chip label={"£10 > £7.5"} sx={{ fontSize: 20 }} /> <Chip label={"Save £2.5"} sx={{ fontSize: 20 }} color='success' />
                    </Typography>
                  </Grid>
                </Grid>
              } />
            </ListItem>
            <Divider sx={{ my: "0.75rem" }} />
            <ListItem disablePadding>
              <ListItemIcon>
                <EmojiEventsIcon style={{ color: "#CD7F32" }} fontSize='large' />
              </ListItemIcon>
              <ListItemText primary={
                <Grid container>
                  <Grid item xs="auto">
                    <img src={"https://s3.eu-central-1.amazonaws.com/bn.production.core-images/7613287005700"} height="70" width="100%" />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6">
                      <b>Nescafe Gold Blend Roastery Collection Light Roast Instant Coffee 100g</b><br />
                      <Chip label={"£5 > £2.5"} sx={{ fontSize: 20 }} /> <Chip label={"Save £2.5"} sx={{ fontSize: 20 }} color='success' />
                    </Typography>
                  </Grid>
                </Grid>
              } />
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={1} sx={{ p: 1, mt: 3 }}>
          <Typography variant='h5' color={"dark"} sx={{ m: "1rem 0" }}>
            <center><GradeIcon />New Arrivals <GradeIcon /></center>
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <GradeIcon style={{ color: "gold" }} fontSize='large' />
              </ListItemIcon>
              <ListItemText primary={
                <Grid container columnSpacing={1}>
                  <Grid item xs="auto">
                    <img src={"https://s3.eu-central-1.amazonaws.com/bn.production.core-images/0039745001904"} height="70" width="100%" />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6">
                      <b>Thompson's Everyday 80 Tea Bags 250g</b><br />
                      <Chip label={"EAN : 0039745001904"} sx={{ fontSize: 20 }} color='warning' />
                    </Typography>
                  </Grid>
                </Grid>
              } />
            </ListItem>
            <Divider sx={{ my: "0.75rem" }} />
            <ListItem disablePadding>
              <ListItemIcon>
                <GradeIcon style={{ color: "gold" }} fontSize='large' />
              </ListItemIcon>
              <ListItemText primary={
                <Grid container columnSpacing={1}>
                  <Grid item xs="auto">
                    <img src={"https://s3.eu-central-1.amazonaws.com/bn.production.core-images/562662011"} height="70" width="100%" />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6">
                      <b>Good Earth Teabags Orange and Passionfruit 15 per pack</b><br />
                      <Chip label={"EAN : 5000208015245"} sx={{ fontSize: 20 }} color='warning' />
                    </Typography>
                  </Grid>
                </Grid>
              } />
            </ListItem>
            <Divider sx={{ my: "0.75rem" }} />
            <ListItem disablePadding>
              <ListItemIcon>
                <GradeIcon style={{ color: "gold" }} fontSize='large' />
              </ListItemIcon>
              <ListItemText primary={
                <Grid container columnSpacing={1}>
                  <Grid item xs="auto">
                    <img src={"https://s3.eu-central-1.amazonaws.com/bn.production.core-images/5000208025459"} height="70" width="100%" />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6">
                      <b>Tetley Herbal Fresh Mint 20 Tea Bags 32g</b><br />
                      <Chip label={"EAN : 5000208025459"} sx={{ fontSize: 20 }} color='warning' />
                    </Typography>
                  </Grid>
                </Grid>
              } />
            </ListItem>
            <Divider sx={{ my: "0.75rem" }} />
            <ListItem disablePadding>
              <ListItemIcon>
                <GradeIcon style={{ color: "gold" }} fontSize='large' />
              </ListItemIcon>
              <ListItemText primary={
                <Grid container columnSpacing={1}>
                  <Grid item xs="auto">
                    <img src={"https://s3.eu-central-1.amazonaws.com/bn.production.core-images/5000208029372"} height="70" width="100%" />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6">
                      <b>Tetley Herbals Rosehip & Hibiscus 20 Tea Bags 20pk</b><br />
                      <Chip label={"EAN : 5000208029372"} sx={{ fontSize: 20 }} color='warning' />
                    </Typography>
                  </Grid>
                </Grid>
              } />
            </ListItem>
            <Divider sx={{ my: "0.75rem" }} />
            <ListItem disablePadding>
              <ListItemIcon>
                <GradeIcon style={{ color: "gold" }} fontSize='large' />
              </ListItemIcon>
              <ListItemText primary={
                <Grid container columnSpacing={1}>
                  <Grid item xs="auto">
                    <img src={"https://s3.eu-central-1.amazonaws.com/bn.production.core-images/5000208030699"} height="70" width="100%" />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6">
                      <b>Tetley Original 80 Tea Bags 80pk</b><br />
                      <Chip label={"EAN : 5000208030699"} sx={{ fontSize: 20 }} color='warning' />
                    </Typography>
                  </Grid>
                </Grid>
              } />
            </ListItem>
          </List>
        </Paper>
      </Grid>
    </Grid>
  )
}