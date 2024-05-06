import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react'

export default function Calendar() {

    const [_events, setEvents] = useState([
        {
            title: 'Sainsburys - £4 discount for over £20 - All Coffee',
            start: '2024-05-08',
            end: '2024-05-22',
            backgroundColor: "orange",
            borderColor: "orange",
            editable: false
        },
        {
            title: 'Morrisons - Giving £5 Coupon for over £30 - All Coffee',
            start: '2024-05-25',
            end: '2024-05-28',
            editable: false
        },
        {
            title: 'Morrisons - £10 Discount for over £40 - All Coffee',
            start: '2024-05-29',
            end: '2024-06-11',
            editable: false
        },
        {
            title: 'Morrisons - Buy 2 for £6 - Taylors of Harrogate Lazy Sunday Ground Roast Coffee 227g',
            start: '2024-05-08',
            end: '2024-05-22',
            editable: false
        },
        {
            title: 'Ocado - £3 Discount - Lavazza Qualità Oro Coffee Beans 250g',
            start: '2024-05-01',
            end: '2024-05-04',
            backgroundColor: "#538c59",
            borderColor: "#538c59",
            editable: true
        }
    ])

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            editable={true}
            droppable={true}
            events={_events}
            eventDragStart={(info) => { console.log(info) }}
        />
    )
}