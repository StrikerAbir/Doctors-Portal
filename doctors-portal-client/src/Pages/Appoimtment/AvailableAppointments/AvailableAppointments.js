import { format } from 'date-fns';
import React from 'react';

const AvailableAppointments = ({selectedDate}) => {
    return (
      <section>
        <p className="text-center text-xl font-semibold text-primary">
          Available Appointments on {format(selectedDate, "PP")}
        </p>
      </section>
    );
};

export default AvailableAppointments;