import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    IconButton,
    TextField,
    FormControl,
    InputAdornment,
    Typography,
    Box,
    FormLabel,
    FormControlLabel,
    Checkbox,
    FormGroup,
    Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


export function PickerAccordion(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [listForSearch, setListForSearch] = useState(props?.list || []);

    useEffect(() => {
        setListForSearch(props.list)
    }, [props.list])

    useEffect(() => {
        if (keyword === '') {
            setListForSearch(props?.list || []);
        } else {
            setListForSearch(
                props.list?.filter((item) => item.name.includes(keyword))
            )
        }
    }, [keyword])

    return (
        <>
            <Accordion expanded={isOpen} onChange={() => { setIsOpen(!isOpen) }} sx={{  backgroundColor: props.selected?.length > 0 ? "#fcefe6" : '#e6fce6' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ height: "3rem" }} >
                    <Grid container>
                        <Grid item xs={2}><Typography variant='h5' align='left'>{props.label}</Typography></Grid>
                        <Grid item xs={10}>
                            <Typography variant='h6' align='right' color={"grey"} noWrap>
                                {props.selected?.length > 0 ?
                                    props.selected?.sort((n1, n2) => {
                                        if (n1.name > n2.name) { return 1; } else if (n1.name < n2.name) { return -1; } else return 0;
                                    })?.map((si) => si.name)?.join(", ")
                                    : "No Filter"}
                            </Typography>
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Box maxHeight="200px" sx={{ overflow: "scroll", overflowX: "hidden" }}>
                        <Grid container spacing={1}>
                            <Grid item xs>
                                <TextField
                                    size={"small"}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            {/* <IconButton
                                    onClick={() => { props.setSelected([]); }}
                                    edge="end"
                                >
                                    <DeleteOutlineIcon />
                                </IconButton> */}
                                        </InputAdornment>,
                                    }}
                                    value={keyword}
                                    onChange={(e) => { setKeyword(e.target.value) }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs="auto">
                                <Button
                                    variant="contained"
                                    onClick={() => { props.setSelected([...props.selected, ...listForSearch]); }}
                                    endIcon={<AddIcon />}
                                    sx={{ height: "2.5rem" }}
                                    color={"info"}
                                    disabled={!keyword}
                                >
                                    Add All Filtered Results
                                </Button>
                            </Grid>
                            <Grid item xs="auto">
                                <Button
                                    variant="contained"
                                    onClick={() => { props.setSelected([]); }}
                                    endIcon={<DeleteOutlineIcon />}
                                    sx={{ height: "2.5rem" }}
                                    color={"error"}
                                >
                                    Clear All
                                </Button>
                            </Grid>
                        </Grid>
                        <FormControl sx={{ 1: 2 }}>
                            <FormGroup row>
                                {
                                    listForSearch?.map((item) => {
                                        return <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={!!props.selected?.find((si) => si.id === item.id)}
                                                    onChange={() => {
                                                        if (!!props.selected?.find((si) => si.id === item.id)) {
                                                            props.setSelected(props.selected?.filter((si) => si.id !== item?.id))
                                                        } else {
                                                            props.setSelected([...props.selected, item])
                                                        }
                                                    }}
                                                />
                                            }
                                            label={item?.name}
                                            key={item?.name}
                                        />
                                    })
                                }
                            </FormGroup>
                        </FormControl>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </>
    );
}

export default PickerAccordion;