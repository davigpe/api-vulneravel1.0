const User = require('../models/User');

// GET: Lista todos os usuários
exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

// POST: Cria novo usuário
exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  await user.save();
  res.status(201).json({ message: 'Usuário criado', user });
};

// PUT: Atualiza dados de um usuário
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedUser) return res.status(404).json({ message: 'Usuário não encontrado' });
  res.status(200).json({ message: 'Usuário atualizado', updatedUser });
};

// DELETE: Exclui um usuário
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) return res.status(404).json({ message: 'Usuário não encontrado' });
  res.status(200).json({ message: 'Usuário deletado' });
};

// [ATAQUE] Rota vulnerável a NoSQL Injection
exports.findUser = async (req, res) => {
  try {
    const { username } = req.body; // VULNERÁVEL: aceita objetos como entrada
    const user = await User.findOne({ username }); 
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};