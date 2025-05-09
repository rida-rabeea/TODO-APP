
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Todo from './models/todo.js'

const app = express()
const PORT = 5000

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://rizwanarrf:Rida2017@cluster0.fuvmzpz.mongodb.net/todo_list?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Successfully connected to MongoDB.")
}).catch((err)=>{
    console.log("Failed to connect to MongoDB.",err)
})

app.post('/todos',async (req,res)=>{

    const {title, completed} = req.body;

    try{

        const newTodo = new Todo({
            title,
            completed
        })

        await newTodo.save()

        res.status(201).json(newTodo)
    }
    catch(err){
        res.status(500).json({message:"Failed to add task to list", error:err})
    }

})

app.get('/todos',async (req,res)=>{

    //fetch the todos
    try
    {
        const todo = await Todo.find()

        res.status(200).json(todo)
    }

    catch(err){
        res.status(500).json({message:"Failed to fetch data.", error:err})
    }

})

app.delete('/todos/:title', async (req,res)=>{

    const {title} = req.params
    try{
        const deleteTodo = await Todo.findOneAndDelete({title})

    if(deleteTodo == null)
    {
        return res.status(404).json({message:"Task not found"})
    }

    res.status(200).json({message:`Todo with title "${title}" has been deleted.`})
    }
    catch(err){
        res.status(500).json({message:"Could not delete task.", error:err})
    }
})

// PUT /todos/title/:title
// In your Express router file
app.put('/todos/title/:title', async (req, res) => {
    try {
      const updatedTodo = await Todo.findOneAndUpdate(
        { title: req.params.title },
        { completed: req.body.completed },
        { new: true }
      );
  
      if (!updatedTodo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
  
      res.json(updatedTodo);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  


app.listen(PORT, ()=>{
    console.log(`Server running succesfully on PORT:${PORT}`)
}
)










