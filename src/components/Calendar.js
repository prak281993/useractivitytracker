import React, { useState, useEffect } from 'react';
import './Calendar.css';
import moment from 'moment';

function Calendar(props) {
    const date = new Date();
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const [currentDate, setCurrentDate] = useState(date);
    const [prevMonthDays, setPrevMonthDays] = useState(null);
    const [currentMonthDays, setCurrentMonthDays] = useState(null);
    const [nextMonthDays, setNextMonthDays] = useState(null);

    useEffect(() => {
        const userActivities = props.currentUser.activity_periods;
        const userActivityDate = userActivities.map(activity => {
            const date = new Date(moment(activity.start_time, 'LLL'));
            return {
                activity: activity.activity,
                month: date.getMonth() + 1,
                day: date.getDate() - 1
            }
        });
        const firstDay = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        ).getDay();

        const endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        ).getDate();

        let activityDays = userActivityDate.filter(activity => {
            if (activity.month === currentDate.getMonth() + 1) {
                return activity
            }
        });
        const days = [...Array(endDate).keys()];
        const currentDays = days.map((day, index) => {
            let foundActivity = activityDays.find(x => x.day === day);
            if (foundActivity) {
                return <div id="months_activity" key={index}>
                    {day + 1}
                    <span className="tooltiptext">{foundActivity.activity}</span>
                </div>
            }
            else {
                return <div key={index}>{day + 1}</div>
            }
        })
        setCurrentMonthDays(currentDays);

        const lastMothLastDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0
        ).getDate();

        const lastMothRemainingDays = lastMothLastDate - firstDay + 1;

        const prevDays = [...Array(firstDay).keys()].map((x) => lastMothRemainingDays + x);
        setPrevMonthDays(prevDays);

        const nextMonthRemainingDays = 42 - (endDate + firstDay);

        const nextDays = [...Array(nextMonthRemainingDays).keys()];
        setNextMonthDays(nextDays);
    }, [currentDate.getMonth()])

    const moveDate = (param) => {
        if (param === 'prev') {
            const newDate = new Date(currentDate);
            newDate.setMonth(currentDate.getMonth() - 1);
            setCurrentDate(newDate);
        }
        else {
            const newDate = new Date(currentDate);
            newDate.setMonth(currentDate.getMonth() + 1);
            setCurrentDate(newDate);
        }
    }

    return (
        <div className="wrapper">
            {(currentMonthDays)
                ? <div className="calendar">
                    <div className="month">
                        <div className="prev" onClick={() => moveDate('prev')}>
                            <span>&#10094;</span>
                        </div>
                        <div>
                            <h2 id="month">{months[currentDate.getMonth()]}, {currentDate.getFullYear()}</h2>
                            <p id="date_str">{currentDate.toLocaleString('en-En', { weekday: "long", month: "long", day: "numeric" })}</p>
                        </div>
                        <div className="next" onClick={() => moveDate('next')}>
                            <span>&#10095;</span>
                        </div>
                    </div>
                    <div className="weekdays">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>
                    <div className="days">
                        {prevMonthDays.map((x, i) => <div className="prev_date" key={i}>{x}</div>)}
                        {currentMonthDays}
                        {nextMonthDays.map((x, i) => <div className="prev_date" key={i}>{x + 1}</div>)}
                    </div>
                </div>
                : null}
        </div>
    )
}

export default Calendar
