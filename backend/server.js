// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")
var cors = require('cors')

app.use(cors())
app.use(express.json());

// Server port
var HTTP_PORT = 8000

// Start server
app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`)
});

// Get all todos
app.get("/api/todos", (req, res) => {
    var sql = "select * from todos"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json(rows)
      });
});

// Get a single todo
app.get("/api/todos/:id", (req, res) => {
    var sql = "select * from todos where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json(row)
      });
});

// Create a todo
app.post("/api/todos/", (req, res) => {
    var errors=[]

    if (!req.body.title){
        errors.push("Veuillez spécifier un titre");
    }
    if (!req.body.content){
        errors.push("Veuillez insérer du contenu");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        title: req.body.title,
        content: req.body.content,
    }
    var sql ='INSERT INTO todos (title, content) VALUES (?,?)'
    var params =[data.title, data.content]
    db.run(sql, params, (err, result) => {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.status(201).json(data)
    });
})

// Update a todo
// TODO : User should not update a todo with a non existent ID
app.patch("/api/todos/:id", (req, res) => {
    var data = {
        title: req.body.title,
        content: req.body.content,
    }
    var sql = `UPDATE todos SET title = ?, content = ? WHERE id = ?`
    var params = [data.title, data.content, req.params.id]
    db.run(sql, params, (err, result) => {
            if (err){
                console.log(err)
                res.status(400).json({"error": res.message})
                return;
            }
            res.status(200).json(data)
    });
})

// Delete a todo
// TODO : User should not delete a todo with a non existent ID
app.delete("/api/todos/:id", (req, res) => {

    var sql = `DELETE FROM todos WHERE id = ?`
    db.run(sql, req.params.id, (err, result) => {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.status(200).json({"message":"deleted"})
    });
})