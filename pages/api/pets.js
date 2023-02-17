const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getAllOwners(req, res) {
  try {
    const owners = await prisma.owner.findMany({
      include: { pets: true },
    });
    res.status(200).json(owners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createOwner(req, res) {
  try {
    const owner = await prisma.owner.create({ data: req.body });
    res.status(201).json(owner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateOwner(req, res) {
  try {
    const { id } = req.params;
    const owner = await prisma.owner.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(owner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteOwner(req, res) {
  try {
    const { id } = req.params;
    await prisma.owner.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllPets(req, res) {
  try {
    const pets = await prisma.pet.findMany({
      include: { owner: true },
    });
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createPet(req, res) {
  try {
    const pet = await prisma.pet.create({ data: req.body });
    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updatePet(req, res) {
  try {
    const { id } = req.params;
    const pet = await prisma.pet.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deletePet(req, res) {
  try {
    const { id } = req.params;
    await prisma.pet.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllOwners,
  createOwner,
  updateOwner,
  deleteOwner,
  getAllPets,
  createPet,
  updatePet,
  deletePet,
};
