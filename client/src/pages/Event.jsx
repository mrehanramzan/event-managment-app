import React, { useContext, useState, useEffect } from 'react';
import FormInput from '../components/FormInput';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';

const EventPage = () => {

  const navigate = useNavigate();
  
  const {state} = useLocation();
  useEffect(() => {
    if (state?.eventId) {
      fetchEventData(state.eventId);
    }
  }, [state?.eventId]);

  
  const {backendUrl, user} = useContext(AppContext);
  const [setReminder, setSetReminder] = useState(false);
  const [eventData, setEventData] = useState({
    event: '',
    description: '',
    country: '',
    city: '',
    date: '',
  });

  const [reminderData, setReminderData] = useState({
    from: '',
    subject: '',
    description: '',
    date: ''
  });

  const handleEventChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleReminderChange = (e) => {
    setReminderData({ ...reminderData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = () => {
    setSetReminder(!setReminder);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  const fetchEventData = async (eventId) => {
    try {
      const response = await axios.get(`${backendUrl}/api/events/${eventId}`);
      const event = response.data.event;
      setEventData({
        event: event.event,
        description: event.description,
        country: event.country,
        city: event.city,
        date: formatDate(event.date),
      });
      if (event.reminder) {
        setSetReminder(true);
        setReminderData({
          from: event.reminder.from,
          subject: event.reminder.subject,
          description: event.reminder.description,
          date: formatDate(event.reminder.date),
        });
      }
    } catch (error) {
      toast.error("Error fetching event data");
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/events/event`, 
        {...eventData, userId:user?.id, reminder:setReminder, reminderData: setReminder ? {...reminderData}:null} , 
        { withCredentials: true }
      );
      toast.success("Event Added successfully",{
          onClose: () => {
            navigate("/");
          }
      })
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
      else toast.error("Please try again later")
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Create Event</h2>
        <form onSubmit={handleSubmit} className="flex justify-center">
          <div
            className={`w-full sm:w-1/2 space-y-4${setReminder ? 'lg:w-1/2' : 'lg:w-1/3'
              }`}
          >
            <FormInput
              label="Event Name"
              value={eventData.event}
              onChange={handleEventChange}
              placeholder="Enter event name"
              required={true}
              name="event"
            />
            <FormInput
              label="Event Description"
              value={eventData.description}
              onChange={handleEventChange}
              placeholder="Enter event description"
              required={true}
              name="description"
            />
            <FormInput
              label="Country"
              value={eventData.country}
              onChange={handleEventChange}
              placeholder="Enter country"
              required={true}
              name="country"
            />
            <FormInput
              label="City"
              value={eventData.city}
              onChange={handleEventChange}
              placeholder="Enter city"
              required={true}
              name="city"
            />
            <FormInput
              label="Event Date"
              type="date"
              value={eventData.date}
              onChange={handleEventChange}
              required={true}
              name="date"
            />

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={setReminder}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label>Set Reminder</label>
            </div>
            <CustomButton
              label={state?.eventId ? "Update Event" : "Create Event" }
            />
          </div>

          {setReminder && (
            <div className="w-full sm:w-1/2 space-y-4 lg:w-1/2 ml-8">
              <FormInput
                label="Sender Email"
                type="email"
                value={reminderData.from}
                onChange={handleReminderChange}
                placeholder="Enter sender's email"
                required={setReminder}
                name="from"
              />
              <FormInput
                label="Subject"
                value={reminderData.subject}
                onChange={handleReminderChange}
                placeholder="Enter reminder subject"
                required={setReminder}
                name="subject"
              />
              <FormInput
                label="Reminder Description"
                value={reminderData.description}
                onChange={handleReminderChange}
                placeholder="Enter reminder description"
                required={setReminder}
                name="description"
              />
              <FormInput
                label="Reminder Date"
                type="date"
                value={reminderData.date}
                onChange={handleReminderChange}
                required={setReminder}
                name="date"
              />
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default EventPage;