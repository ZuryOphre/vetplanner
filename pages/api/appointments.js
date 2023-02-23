import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method, body, query: { id } } = req;

  switch (method) {
    case 'GET':
      if (id) {
        const appointment = await prisma.appointment.findUnique({
          where: {
            id: Number(id)
          },
          include: {
            owner: true,
            pet: true
          }
        });
        if (appointment) {
          res.status(200).json(appointment);
        } else {
          res.status(404).json({ message: `appointment with id ${id} not found.` });
        }
      } else {
        const appointments = await prisma.appointment.findMany({
          include: {
            owner: true,
            pet: true
          }
        });
        res.status(200).json(appointments);
      }
      break;
    case 'POST':
      const { veterinarian, date, ownerId, petId } = body;
      const newAppointment = await prisma.appointment.create({
        data: {
          veterinarian: String(veterinarian),
          date: new Date(date),
          ownerId: Number(ownerId),
          petId: Number(petId)
        },
        include: {
          owner: true,
          pet: true
        }
      });
      res.status(201).json(newAppointment);
      break;
    case 'PUT':
      const appointmentToUpdate = await prisma.appointment.findUnique({
        where: {
          id: Number(id)
        }
      });
      if (appointmentToUpdate) {
        const { veterinarian, date, ownerId, petId } = body;
        const updatedAppointment = await prisma.appointment.update({
          where: {
            id: Number(id)
          },
          data: {
            veterinarian: veterinarian ? String(veterinarian) : appointmentToUpdate.veterinarian,
            date: date ?  new Date(date) : appointmentToUpdate.date ,
            ownerId: ownerId ? Number(ownerId) : petToUpdate.ownerId,
            petId: petId ? Number(petId) : appointmentToUpdate.petId,
          },
          include: {
            owner: true,
            pet: true
          }
        });
        res.status(200).json(updatedAppointment);
      } else {
        res.status(404).json({ message: `Appointment with id ${id} not found.` });
      }
      break;
    case 'DELETE':
      const appointmentToDelete = await prisma.appointment.findUnique({
        where: {
          id: Number(id)
        }
      });
      if (appointmentToDelete) {
        await prisma.appointment.delete({
          where: {
            id: Number(id)
          }
        });
        res.status(200).json({ message: `Appointment with id ${id} deleted.` });
      } else {
        res.status(404).json({ message: `Appointment with id ${id} not found.` });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
