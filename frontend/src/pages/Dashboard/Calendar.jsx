import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react'
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Typography } from '@mui/material';

export default function Calendar() {

    const [isOpen, setIsOpen] = useState(false)
    const [eventDetails, setEventDetails] = useState(null)

    const [_events, setEvents] = useState([
        {
            title: '-£2 Sainsburys - £4 discount for over £30 - Brew Tea Co English Breakfast Loose Leaf 500g',
            start: '2024-05-08',
            end: '2024-05-22',
            backgroundColor: "orange",
            borderColor: "orange",
            editable: false,
            extendedProps: {
                header: "Brew Tea Co English Breakfast Loose Leaf 500g",
                retailers: ["Sainsburys"],
                basePrice: 20,
                promotedPrice: 18,
                priceDiff: 2
            }
        },
        {
            title: '-£2.5 Morrisons - £5 Discount for over £20 - Ahmad Tea Strawberry Velvet Cake Tea Bags 15 per pack',
            start: '2024-05-25',
            end: '2024-05-28',
            editable: false,
            extendedProps: {
                header: "Ahmad Tea Strawberry Velvet Cake Tea Bags 15 per pack",
                retailers: ["Morrisons"],
                basePrice: 10,
                promotedPrice: 7.5,
                priceDiff: 2.5
            }
        },
        {
            title: '-£5 Morrisons - £10 Discount for over £40 - Drink Me Chai Spiced Chai Latte 250g',
            start: '2024-05-29',
            end: '2024-06-11',
            editable: false,
            extendedProps: {
                header: "Drink Me Chai Spiced Chai Latte 250g",
                retailers: ["Morrisons"],
                basePrice: 20,
                promotedPrice: 15,
                priceDiff: 5
            }
        },
        {
            title: '-£1 Morrisons - Buy 2 for £6 - Ueshima Fuji Mountain Ground 250g',
            start: '2024-05-08',
            end: '2024-05-22',
            editable: false,
            extendedProps: {
                header: "Ueshima Fuji Mountain Ground 250g",
                retailers: ["Morrisons"],
                basePrice: 4,
                promotedPrice: 3,
                priceDiff: 1
            }
        },
        {
            title: '-£3 Ocado - £3 Discount - Lavazza Qualità Oro Coffee Beans 250g',
            start: '2024-05-01',
            end: '2024-05-04',
            backgroundColor: "#538c59",
            borderColor: "#538c59",
            editable: false,
            extendedProps: {
                header: "Lavazza Qualità Oro Coffee Beans 250g",
                retailers: ["Ocado"],
                basePrice: 12,
                promotedPrice: 9,
                priceDiff: 3
            }
        }
    ])

    return (
        <>
            <Paper elevation={1} sx={{ p: 3, mt: 3 }}>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    editable={true}
                    droppable={true}
                    events={_events}
                    eventDragStart={(info) => { console.log(info) }}
                    eventClick={(eventClickInfo) => {
                        setIsOpen(!isOpen);
                        setEventDetails(eventClickInfo.event?.extendedProps)
                    }}
                />
            </Paper>
            <Dialog
                open={isOpen}
                onClose={() => { setIsOpen(!isOpen); setEventDetails(null); }}
            >
                <DialogTitle>Promotion Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="h6">Target Product: {eventDetails?.header}</Typography><br />
                        <Typography variant="h6">Target Retailer(s): {eventDetails?.retailers?.join(',')}</Typography><br />
                        <Typography variant="h6">Base Price: <Chip label={"£" + eventDetails?.basePrice} /></Typography><br />
                        <Typography variant="h6">Promoted Price: <Chip label={"£" + eventDetails?.promotedPrice} /></Typography><br />
                        <Typography variant="h6">Price Difference: <Chip
                            label={(eventDetails?.basePrice > eventDetails?.promotedPrice ? "Save £" : "Incease £") + eventDetails?.priceDiff}
                            icon={eventDetails?.basePrice > eventDetails?.promotedPrice ? <ArrowDownwardIcon color='error' /> : <ArrowUpwardIcon />}
                        /></Typography><br />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setIsOpen(!isOpen); setEventDetails(null); }} variant='contained'>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}