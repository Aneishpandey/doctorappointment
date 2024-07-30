import * as React from 'react';

interface EmailTemplateProps {
  fullName: string;
  email:string;
  type?: string;
  date?: any;
  time?:any
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  fullName, email, type, date, time
}) => (
  <div>
    {type === "user" ? <h1>Welcome, {fullName}! Your appointment has been booked for {date}, {time} </h1> : <div>
            <h1 className=''>Appointment Alert! A Client named {fullName}! with email {email} has booked an appointment with you at {date}, {time}</h1>
        </div>}
  </div>
);
