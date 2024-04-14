import '@fontsource/audiowide'
import '@fontsource/arvo';
import '@fontsource/lobster';
import MyPhoto from '../../assets/me.jpeg';
import WorkBackground from '../../assets/workBackground.jpg';
import { Link } from 'react-router-dom'
import {
    Typography,
    Divider,
    Grid
} from '@mui/material'

function About() {

    return (
        <>
            <Grid container sx={{ mt: "6rem" }}>

                {/* row 1 */}
                <Grid item xs="6">
                    <Typography
                        variant="h1"
                        sx={{
                            mt: "5rem",
                            fontFamily: "audiowide"
                        }}
                    >
                        Samuel<br />
                        Yuen
                    </Typography><br />
                    <Typography
                        variant="h4"
                        sx={{
                            mt: "1rem",
                            fontFamily: "lobster"
                        }}
                    >
                        Please try the demonstration (<Link to="/dashboard">Dashboard</Link>)<br />I have prepared for you.
                    </Typography>
                </Grid>
                <Grid item xs="6">
                    <center><img src={MyPhoto} width="350" height="auto" /></center>
                </Grid>

                {/* row 2 */}
                <Grid item
                    xs="12"
                    sx={{
                        backgroundImage: `url(${WorkBackground})`,
                        backgroundSize: "cover",
                        mt: "6rem"
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            mt: "8rem",
                            fontFamily: "arvo"
                        }}
                    >
                        <u>Working Experience</u>
                    </Typography>
                    <br />

                    {/* Job 1 */}
                    <Typography
                        variant="h3"
                        sx={{
                            mt: "2rem",
                            fontFamily: "arvo"
                        }}
                    >
                        08/2021 - 03/2024
                    </Typography>
                    <br />
                    <Typography
                        variant="h4"
                        sx={{
                            mt: "1rem",
                            fontFamily: "arvo"
                        }}
                    >
                        <b>The Hong Kong Polytechnic University</b>
                    </Typography>
                    <br />
                    <Typography
                        variant="h5"
                        sx={{
                            fontFamily: "arvo"
                        }}
                    >
                        Specialist
                    </Typography>
                    <br />
                    <Typography
                        variant="h6"
                        sx={{
                            fontFamily: "arvo"
                        }}
                    >
                        <ul style={{ marginTop: 0 }}>
                            <li>To build various web apps for the university (including both frontend & backend) for various purposes (including Event Management, Campus Access Control, etc)</li>
                            <li>To deploy the apps I have built to OpenShift</li>
                            <li>To lead some junior staff</li>
                        </ul>
                    </Typography>
                    <br />


                    {/* Job 2 */}
                    <Typography
                        variant="h3"
                        sx={{
                            mt: "2rem",
                            fontFamily: "arvo"
                        }}
                    >
                        07/2020 - 07/2021
                    </Typography>
                    <br />
                    <Typography
                        variant="h4"
                        sx={{
                            mt: "1rem",
                            fontFamily: "arvo"
                        }}
                    >
                        <b>Hospital Authority</b>
                    </Typography>
                    <br />
                    <Typography
                        variant="h5"
                        sx={{
                            fontFamily: "arvo"
                        }}
                    >
                        Student Programmer
                    </Typography>
                    <br />
                    <Typography
                        variant="h6"
                        sx={{
                            fontFamily: "arvo"
                        }}
                    >
                        <ul style={{ marginTop: 0 }}>
                            <li>To build an internal learning web app for the company (including both frontend & backend)</li>
                            <li>To enhance an internal request handling web app</li>
                        </ul>
                    </Typography>
                    <br />
                </Grid>



                {/* row 3 */}
                <Grid item xs="12">
                    <Typography
                        variant="h4"
                        sx={{
                            mt: "3rem",
                            fontFamily: "arvo"
                        }}
                    >
                        <u>Education</u>
                    </Typography>
                    <br />

                    {/* Job 1 */}
                    <Typography
                        variant="h3"
                        sx={{
                            mt: "2rem",
                            fontFamily: "arvo"
                        }}
                    >
                        2021
                    </Typography>
                    <br />
                    <Typography
                        variant="h4"
                        sx={{
                            mt: "1rem",
                            fontFamily: "arvo"
                        }}
                    >
                        <b>City University of Hong Kong</b>
                    </Typography>
                    <br />
                    <Typography
                        variant="h5"
                        sx={{
                            fontFamily: "arvo"
                        }}
                    >
                        BSc in Computer Science
                    </Typography>
                    <br />
                    <Typography
                        variant="h6"
                        sx={{
                            fontFamily: "arvo"
                        }}
                    >
                        <a href="https://www.topuniversities.com/universities/city-university-hong-kong">(QS Ranked #48 back in 2021)</a><br />
                        <a href="https://www.timeshighereducation.com/world-university-rankings/city-university-hong-kong">(THE Ranked #82 in 2024)</a>
                    </Typography>
                    <br />

                </Grid>

            </Grid>
        </>
    )
}

export default About;