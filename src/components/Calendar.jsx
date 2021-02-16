import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Paper from '@material-ui/core/Paper';
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

export default function Calendar() {
  const [data, setData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setLoading] = useState(true);

  // temp ID
  const id = 2;

  const getData = () => {
    axios.get(`/dashboard/${id}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return (
      <>
        <Row className="mt-5 d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Row>
      </>
    );
  }

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
