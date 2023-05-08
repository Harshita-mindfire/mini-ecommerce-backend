import express, { Application, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
const app: Application = express();
const prisma = new PrismaClient()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

app.use(express.json());

// testing route
app.get("/", (_req, res: Response) => {
    res.send(`Server is running on port: ${PORT}`);
});

// get users
app.get('/api/users', async (req: Request, res: Response) => {
    try {
        const allUsers = await prisma.user.findMany();
        return res.json({
            success: true,
            data: allUsers
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error
        });
    }
});

// Adding todo route
app.post('/api/addUser', async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });
        return res.json({
            success: true,
            data: newUser
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error
        });
    }
});

app.get("/heatlh", (_req, res: Response) => {
    res.send(`ok`);
})

app.listen(PORT, () => {
    console.log(`Auth-Service at ${PORT}`);
});