import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import axios from '../axios';

export default function Calendar({ id }) {
  const [data, setData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const getData = () => {
    axios.get(`/dashboard/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Paper>
      <Scheduler
        data={data}
      >
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={setCurrentDate}
        />
        <WeekView
          startDayHour={8}
          endDayHour={18}
        />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <Appointments />
        <AppointmentTooltip
          showCloseButton
        />
      </Scheduler>
    </Paper>
  );
}

Calendar.propTypes = {
  id: PropTypes.string.isRequired,
};
