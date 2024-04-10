import { Typography, Divider } from '@mui/material'
import { Link } from 'react-router-dom'

function About() {

    return (
        <>
            <Typography variant='h5' color={"primary"} sx={{ m: "2rem 0" }}>
                <center>Welcome to my Demo!</center>
            </Typography>
            <Typography variant='h6' color={"dark"} sx={{ m: "2rem 0" }}>
                <center>This is a demo website aiming to demonstrate some basics of my web development skills.</center>
            </Typography>
            <Typography variant='h6' color={"dark"} sx={{ m: "2rem 0" }}>
                <center>Please try <Link to="/listToDoItems">the demonstration</Link> I have prepared for you.</center>
            </Typography>

            <Divider />

            <Typography variant='h5' color={"dark"} sx={{ m: "2rem 0" }}>
                <center>My Info</center>
            </Typography>

            <Typography variant='h6' color={"dark"} sx={{ m: "2rem 0" }}>
                <b>Working Experience</b><br />
                1. The Hong Kong Polytechnic University - Specialist<br />
                Duty:<br />
                <ul style={{ marginTop: 0 }}>
                    <li>To build various web apps for the university (including both frontend & backend) for various purposes (including Event Management, Campus Access Control, etc)</li>
                    <li>To deploy the apps I have built to OpenShift</li>
                    <li>To lead some junior staff</li>
                </ul>
                2. Hospital Authority - Student Programmer<br />
                Duty:<br />
                <ul style={{ marginTop: 0 }}>
                    <li>To build an internal learning web app for the company (including both frontend & backend)</li>
                    <li>To enhance an internal request handling web app</li>
                </ul>

            </Typography>

            <Typography variant='h6' color={"dark"} sx={{ m: "2rem 0" }}>
                <b>Academic Background</b><br />
                BSc in Computer Science Holder<br />
                Graduated from <a href="https://www.cityu.edu.hk/">City University of Hong Kong</a> back in 2021<br />
                <a href="https://www.topuniversities.com/universities/city-university-hong-kong">(QS Ranked #48 back in 2021)</a><br />
                <a href="https://www.timeshighereducation.com/world-university-rankings/city-university-hong-kong">(THE Ranked #82 in 2024)</a>
            </Typography>

        </>
    )
}

export default About;