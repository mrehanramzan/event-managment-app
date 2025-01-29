import React, { useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { toast } from 'react-toastify';
import ImgUpdate from "../assets/update.png";
import ImgDelete from "../assets/delete.png";
import { useNavigate } from 'react-router-dom';


export default function Home() {

  const navigate = useNavigate();
  const { user, loggedIn, backendUrl } = useContext(AppContext);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [hoveredEventId, setHoveredEventId] = useState(null);
  const [dateFilter, setDateFilter] = useState('');

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/events/`);
      setEvents(response.data.events);
      setFilteredEvents(response.data.events);
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
      else toast.error("Error Fetching Events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
    if (e.target.value) {
      const filtered = events.filter((event) => {
        const eventDate = new Date(event.date);
        const filterDate = new Date(e.target.value);
        return eventDate.toDateString() === filterDate.toDateString();
      });
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await axios.delete( `${backendUrl}/api/events/${eventId}`, {
        withCredentials:true
      });
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
      setFilteredEvents((prevFilteredEvents) => prevFilteredEvents.filter((event) => event._id !== eventId));
      toast.success('Event deleted successfully');
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
      else toast.error("Error Fetching Events");
    }
  };

  const handleUpdate = async (eventId) => {
      navigate("/event",{
        state:{
          eventId:eventId
        }
      })
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-semibold text-center mb-6">Welcome {user?.fullname}</h1>

        <div className="mb-6 text-center">
          <label htmlFor="eventDate" className="mr-2 text-lg">Filter by Date:</label>
          <input
            type="date"
            id="eventDate"
            value={dateFilter}
            onChange={handleDateFilterChange}
            className="py-2 px-4 border border-gray-300 rounded-md"
          />
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative">

              {
                user?.id===event.user?
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button onClick={() => handleUpdate(event._id)} className="p-2 bg-green-500 rounded-full hover:bg-green-600">
                    <img src={ImgUpdate} alt="Update" className="w-6 h-6" />
                  </button>
                  <button onClick={() => handleDelete(event._id)} className="p-2 bg-red-500 rounded-full hover:bg-red-600">
                    <img src={ImgDelete} alt="Delete" className="w-6 h-6" />
                  </button>
                </div>
                :
                null
              }
              <h2 className="text-2xl font-semibold text-gray-800">{event.event}</h2>
              <p className="text-sm text-gray-600 mt-2">{event.description}</p>
              <p className="mt-2 text-gray-500">Location: {event.city}, {event.country}</p>
              <p className="mt-2 text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
