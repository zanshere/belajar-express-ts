import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the CRUD API');
});

// Example route to get all students
// Create siswa
app.post('/siswa', async (req, res) => {
    const { nama, kelas, umur } = req.body;
    try {
        const siswa = await prisma.siswa.create({
            data: {
                nama,
                kelas,
                umur
            }
        });
        res.status(201).json(siswa);

    } catch (error: any) {
        res.status(500).json({
            error: error.message || 'An error occurred while creating the student'
        });
    }
});

// Membaca seluruh data siswa
app.get('/siswa', async (req, res) => {

    try {
        const siswa = await prisma.siswa.findMany();
        res.status(200).json(siswa);

    } catch (error: any) {
        res.status(500).json({
            error: error.message || 'An error occurred while fetching students'
        });
    }
});

// Edit data siswa
app.put('/siswa/:id', async (req, res) => {
    const { id } = req.params;
    const { nama, kelas, umur } = req.body;

    try {
        const siswa = await prisma.siswa.update({
            where: { id },
            data: {
                nama,
                kelas,
                umur
            }
        });

        res.status(200).json(siswa);
    } catch (error: any) {
        res.status(500).json({
            error: error.message || 'An error occurred while updating the student'
        });
    }
});

// Hapus data siswa
app.delete('/siswa/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        await prisma.siswa.delete({
            where: { id },
        });
        
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({
            error: error.message || 'An error occurred while deleting the student'
        });
    }
});


// Listening 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});