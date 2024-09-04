// importar os modulo de express para esse arquivo
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
// criar uma variavel para termos acesso aos métodos 
const app = express();

const prisma = new PrismaClient();
// o express por padrão não utiliza json
// por isso precisamos dessa linha, pra usar json
app.use(express.json())
app.use(cors())

// utilizando
// os métodos precisam de:
//  1) Tipo de rota/método http
//  2) Endereço

// CRIAR USUARIO
app.post('/usuarios', async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    }
  })
  res.status(201).json(req.body)
})

// LISTAR USUARIOS
app.get('/usuarios', async (req, res) => {
  let users = [];

  if(req.query) {
    users = await prisma.user.findMany( {
      where: {
        name: req.query.name,
        email: req.query.email,
        age: req.query.age
      }
    })
  }else {
    users = await prisma.user.findMany();
  }
  
  res.status(200).json(users)
});

// EDITAR USUÁRIO ESPECÍFICO
app.put('/usuarios/:id', async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    }
  })
  res.status(201).json(req.body)
});

// DELETAR USUARIO
app.delete('/usuarios/:id', async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id
    }
  })

  res.status(200).json({message: "Usuário deletado com sucesso."})
})

// setei a porta que vai rodar
app.listen(3000);

// após isso dar um node server.js no terminal 
// abrir no navegador localhost:3000/usuarios

/* CRIAR API DE USUÁRIOS 
  1) CRIAR USUARIO
  2) LISTAR USUARIO
  3) EDITAR USUARIO
  4) DELETAR USUARIO
*/