import Event from '../models/event.model.js';
import Reminder from '../models/reminder.model.js';

export async function createEvent(request, response, next) {

    try {

        const { event, description, country, city, date, userId, reminder, reminderData } = request.body;

        if (!event || !description || !country || !city || !date) {
            return response.status(400).json({
                message: "Event data must require",
                success: false
            })
        }

        if (reminder) {
            if (!reminderData.from || !reminderData.subject || !reminderData.description || !reminderData.date) {
                return response.status(400).json({
                    message: "Reminder data must be required",
                    success: false
                });
            }
        }

        let reminderId = null;
        if (reminderData) {
            const newReminder = new Reminder({
                from: reminderData.from,
                subject: reminderData.subject,
                description: reminderData.description,
                date: reminderData.date
            });
            const savedReminder = await newReminder.save();
            reminderId = savedReminder._id;
        }

        const newEvent = new Event({
            event,
            description,
            country,
            city,
            date,
            user: userId,
            reminder: reminderId
        });

        const savedEvent = await newEvent.save();
        return response.status(201).json({
            success: true,
            message: 'Event created successfully',
        });
    } catch (error) {
        next(error);
    }

};

export async function getAllEvents(request, response, next) {
    try {
        const events = await Event.find()
            .sort({ createdAt: -1 });

        if (!events.length) {
            return response.status(404).json({
                message: 'No events found',
                success: false
            });
        }

        return response.status(200).json({
            success: true,
            events
        });
    } catch (error) {
        next(error);
    }
};

export async function deleteEvent(request, response, next) {
    const { eventId } = request.params;
    
    try {

        const event = await Event.findById(eventId);
        if (!event) {
            return response.status(404).json({
                message: 'Event not found',
                success: false
            });
        }
        if (event.reminder) {
            await Reminder.findByIdAndDelete(event.reminder);
        }
        await Event.findByIdAndDelete(eventId);

        return response.status(200).json({
            success: true,
            message: 'Event and reminder deleted successfully',
        });
    } catch (error) {
        next(error); 
    }
}

// export async function updateEvent(request, response, next) {
//     const { eventId } = request.params;
//     const { eventName, description, city, country, date, reminder } = request.body; 
//     try {
//         const event = await Event.findById(eventId);

//         if (!event) {
//             return response.status(404).json({
//                 message: 'Event not found',
//                 success: false
//             });
//         }

//         if (reminder !== undefined) {
//             if (reminder) {
//                 if (!event.reminder) {
//                     const newReminder = new Reminder({
//                         event: eventId,
//                     });
//                     await newReminder.save();
//                     event.reminder = newReminder._id;
//                 }
//             } else {
//                 if (event.reminder) {
//                     await Reminder.findByIdAndDelete(event.reminder);
//                     event.reminder = null;
//                 }
//             }
//         }

//         event.eventName = eventName;
//         event.description = description;
//         event.city = city;
//         event.country = country;
//         event.date = date;

//         await event.save();

//         return response.status(200).json({
//             success: true,
//             message: 'Event updated successfully',
//             event
//         });

//     } catch (error) {
//         next(error);
//     }
// }


export async function getEvent(request, response, next) {
    const { eventId } = request.params; 

    try {
        const event = await Event.findById(eventId).populate('reminder');
        if (!event) {
            return response.status(404).json({
                message: 'Event not found',
                success: false
            });
        }
        return response.status(200).json({
            success: true,
            event
        });

    } catch (error) {
        next(error);
    }
}