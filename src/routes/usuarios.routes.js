import { Router } from "express";
import UsersRepository from "../models/users/UsersRepository.js";

const usuariosRoutes = Router();
const userList = new UsersRepository();


usuariosRoutes.get("/", (req, res) => {
  const usuarios = userList.getAllUsers();
  return res.status(200).json({

    message:
      usuarios.length == 0
        ? "Não há usuários cadastrados"
        : `Total de usuários: ${usuarios.length}`,
    usuarios,
  });
});

usuariosRoutes.post("/", (req, res) => {
  const { name, email, password } = req.body;

  const user = userList.addUser(name, email, password);
  return res.status(201).json({
    message: "Usuário cadastrado com sucesso!",
    user,
  });
  });

  usuariosRoutes.get("/:id", (req, res) => {
    const { id } = req.params;

    const user = userList.getUserById(id);
    if (!user) {
      return res.status(404).json({
        message: 'Usuário com id ${id} não encontrado!',
      });
    }

    return res.status(200).json({
      message: "Usuário com id ${id} encontrado com sucesso!",
      user,
    });

});

usuariosRoutes.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const user = userList.updateUser(id, name, email, password);  

  if (!user) {
    return res.status(404).json({
      message: 'Usuário com id ${id} não encontrado!',
    });
  }

  return res.status(200).json({
    message: "Usuário com id ${id} atualizado com sucesso!",
    user,
  });
 });


 usuariosRoutes.delete("/:id", (req, res) => { 

 });

export default usuariosRoutes
