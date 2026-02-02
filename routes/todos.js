const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async (req, res) => {
  try {
    const { description, completed } = req.body;

    const newTodo = await pool.query(
      "INSERT INTO todo (description, completed) VALUES ($1, $2) RETURNING *",
      [description, completed || false]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


router.put("/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const{description,completed} = req.body;

        const updatedTodo = await pool.query(
            "UPDATE todo SET description = $1,completed =$2 WHERE todo_id = $3 RETURNING *",
            [description,completed,id] 
        );
        res.json({
            message:"Todo was updated!",
            todo : updatedTodo.rows[0],
        });
    }
    catch(err){ 
    console.log(err.message);
    res.status(500).send("Server Error");
    }
})


router.get("/list",async(req,res)=>{
    try{
    
     const getTodo = await pool.query(
        "SELECT * FROM todo",
    );
     res.json(getTodo.rows);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});




router.delete("/:id",async(req,res)=>{
    try{
    const {id} = req.params;
    
    const deleteTodo =await pool.query(
        "DELETE FROM todo WHERE todo_id =$1 RETURNING *",
        [id]
    );
    res.json(deleteTodo.rows[0]);
}
    catch(err){  
      console.log(err.message);
      res.status(500).send("Server Error");
  }
})

module.exports = router;
