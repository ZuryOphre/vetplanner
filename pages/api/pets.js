import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method, body, query: { id } } = req;

  switch (method) {
    case 'GET':
      if (id) {
        const pet = await prisma.pet.findUnique({
          where: {
            id: Number(id)
          },
          include: {
            owner: true
          }
        });
        if (pet) {
          res.status(200).json(pet);
        } else {
          res.status(404).json({ message: `Pet with id ${id} not found.` });
        }
      } else {
        const pets = await prisma.pet.findMany({
          include: {
            owner: true
          }
        });
        res.status(200).json(pets);
      }
      break;
    case 'POST':
      const { name, observations, admission, ownerId } = body;
      const newPet = await prisma.pet.create({
        data: {
          name,
          observations, 
          admission: new Date(admission),
          ownerId: Number(ownerId)
        },
        include: {
          owner: true
        }
      });
      res.status(201).json(newPet);
      break;
    case 'PUT':
      const petToUpdate = await prisma.pet.findUnique({
        where: {
          id: Number(id)
        }
      });
      if (petToUpdate) {
        const { name, age, diagnosis, instructions, observations, admission, discharge, ownerId } = body;
        const updatedPet = await prisma.pet.update({
          where: {
            id: Number(id)
          },
          data: {
            name: name || petToUpdate.name,
            age: age ? Number(age) : petToUpdate.age,
            diagnosis: diagnosis || petToUpdate.diagnosis,
            instructions: instructions || petToUpdate.instructions,
            observations: observations || petToUpdate.observations,
            admission: admission ? new Date(admission) : petToUpdate.admission,
            discharge: discharge ? new Date(discharge) : petToUpdate.discharge,
            ownerId: ownerId ? Number(ownerId) : petToUpdate.ownerId
          },
          include: {
            owner: true
          }
        });
        res.status(200).json(updatedPet);
      } else {
        res.status(404).json({ message: `Pet with id ${id} not found.` });
      }
      break;
    case 'DELETE':
      const petToDelete = await prisma.pet.findUnique({
        where: {
          id: Number(id)
        }
      });
      if (petToDelete) {
        await prisma.pet.delete({
          where: {
            id: Number(id)
          }
        });
        res.status(200).json({ message: `Pet with id ${id} deleted.` });
      } else {
        res.status(404).json({ message: `Pet with id ${id} not found.` });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
