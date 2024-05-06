import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

export default function Calendar() {
    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={[
                {
                    title: 'All Saintberry - 2 Free Cans for over £20',
                    start: '2024-05-08',
                    end: '2024-05-22',
                    backgroundColor: "green",
                    borderColor: "green",
                },
                {
                    title: 'Reading Tesko - Giving £5 Coupon for over £30',
                    start: '2024-05-25',
                    end: '2024-05-28',
                    backgroundColor: "orange",
                    borderColor: "orange",
                },
                {
                    title: '100th Anniversay - All Stores- £10 Discount for over £40',
                    start: '2024-05-29',
                    end: '2024-06-11',
                }
            ]}
        />
    )
}