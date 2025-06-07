const EventEmitter = require('events');
const emitter = new EventEmitter();

let todos = [];

const getTodos = (req, res) => {
    res.json(todos);
};

const addTodo = (req, res) => {
    const newTodo = { id: Date.now(), text: req.body.text, completed: false };
    todos.push(newTodo);
    emitter.emit('todo_added', newTodo);
    res.status(201).json(newTodo);
};

const updateTodo = (req, res) => {
    const todoIndex = todos.findIndex(t => t.id == req.params.id);
    if (todoIndex === -1) return res.status(404).json({ error: 'Todo not found' });
    todos[todoIndex] = { ...todos[todoIndex], ...req.body };
    emitter.emit('todo_updated', todos[todoIndex]);
    res.json(todos[todoIndex]);
};

const deleteTodo = (req, res) => {
    const filteredTodos = todos.filter(t => t.id != req.params.id);
    if (todos.length === filteredTodos.length) return res.status(404).json({ error: 'Todo not found' });
    todos = filteredTodos;
    emitter.emit('todo_deleted', req.params.id);
    res.status(204).send();
};

module.exports = { getTodos, addTodo, updateTodo, deleteTodo };
