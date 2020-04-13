import React from 'react';
import './AllActivities.css';
import moment from 'moment';

function AllActivities(props) {
    const { currentUser } = props;
    const userActivities = currentUser.activity_periods.map(x => {
        const startDate = new Date(moment(x.start_time, 'LLL'));
        const endDate = new Date(moment(x.end_time, 'LLL'));
        return {
            ...x,
            startDate: `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`,
            startTime:`${startDate.getHours()}:${startDate.getMinutes()}`,
            endDate: `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`,
            endTime:`${endDate.getHours()}:${endDate.getMinutes()}`
        }
    })

    return (
        <div className="all_activities">
            <ul className="activity_list">
                {(userActivities.map(act =>
                    <li className="list_items">
                        <h2>Activity : <span>{act.activity}</span></h2>
                        <div className="duration">
                            <div className="start">
                                <span>Start Date : <p> {act.startDate} </p></span>
                                <span>Start Time : <p> {act.startTime} </p></span>
                            </div>
                            <div className="end">
                                <span>End Date: <p>{act.endDate}</p></span>
                                <span>End Time: <p>{act.endTime}</p></span>
                            </div>
                        </div>
                    </li>
                ))
                }
            </ul>
        </div>
    )
}

export default AllActivities
