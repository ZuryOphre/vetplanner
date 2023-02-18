import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return handleGetRequest(req, res)
    case 'POST':
      return handlePostRequest(req, res)
    case 'PUT':
      return handlePutRequest(req, res)
    case 'DELETE':
      return handleDeleteRequest(req, res)
    default:
      res.status(405).end() // Method Not Allowed
  }
}

async function handleGetRequest(req, res) {
  try {
    const owners = await prisma.owner.findMany({
      include: {
        pets: true,
      },
    })
    res.json(owners)
  } catch (e) {
    res.status(500).json({ error: 'Error fetching owners' })
  }
}

async function handlePostRequest(req, res) {
  const { name, email, phone, address } = req.body

  try {
    const newOwner = await prisma.owner.create({
      data: {
        name,
        email,
        phone,
        address,
      },
    })
    res.json(newOwner)
  } catch (e) {
    res.status(500).json({ error: 'Error creating owner' })
  }
}

async function handlePutRequest(req, res) {
  const { id, name, email, phone, address } = req.body

  try {
    const updatedOwner = await prisma.owner.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        phone,
        address,
      },
    })
    res.json(updatedOwner)
  } catch (e) {
    res.status(500).json({ error: 'Error updating owner' })
  }
}

async function handleDeleteRequest(req, res) {
  const { id } = req.query

  try {
    const deletedOwner = await prisma.owner.delete({
      where: {
        id: parseInt(id),
      },
    })
    res.json(deletedOwner)
  } catch (e) {
    res.status(500).json({ error: 'Error deleting owner' })
  }
}
