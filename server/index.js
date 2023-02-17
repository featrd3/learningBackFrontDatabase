const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// Route to get all posts
    //SELECT recipe_id, GROUP_CONCAT(tag_id) FROM `recipe2tag` GROUP BY recipe_id
app.get("/api/get", (req,res)=>{
    db.query("SELECT recipes.id, recipes.image, recipes.name, recipes.notes, GROUP_CONCAT(tags.name_tag) as tag_name, GROUP_CONCAT(tags.colour) as tag_colour FROM recipes LEFT JOIN recipe2tag ON recipe2tag.recipe_id = recipes.id LEFT JOIN tags ON recipe2tag.tag_id = tags.id_tag GROUP BY recipes.id ",
    (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    });   
});

// Route to get one post
    //dodać zapytanie o tagi
app.get("/api/getRecipeId/:id", (req,res)=>{

    const id = req.params.id;
    db.query("SELECT recipes.*, GROUP_CONCAT(tags.name_tag) as tag_name, GROUP_CONCAT(tags.colour) as tag_colour FROM recipes LEFT JOIN recipe2tag ON recipe2tag.recipe_id = recipes.id LEFT JOIN tags ON recipe2tag.tag_id = tags.id_tag WHERE recipes.id = ? GROUP BY recipes.id ", id, 
    (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    });   
});

app.get("/api/getAllTags", (req,res)=>{

    db.query("SELECT * FROM tags",
    (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    });   
    
    
})

// Route for creating the post
    //dodać zapytanie o tagi
app.post('/api/create', (req,res)=> {

    const name = req.body.recipeName
    const recipe = req.body.recipeRecipe
    const ingredients = req.body.recipeIngedients
    const cheatSheet = req.body.recipeCheatSheet
    const image = req.body.recipeImage
    const notes = req.body.recipeNotes
    const nutrients = req.body.recipeNutrients

    db.query("INSERT INTO recipes (name, recipe, ingredients, cheatSheet, image, notes, nutrients) VALUES (?,?,?,?,?,?,?)",
        [name,recipe,ingredients,cheatSheet,image,notes,nutrients],
        (err,result)=>{
            if(err) {
            console.log(err)
            } res.send(result)
        });
    
})
/*
    // Route to like a post
    app.post('/api/like/:id',(req,res)=>{

        const id = req.params.id;
        db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?",id, (err,result)=>{
            if(err) {
        console.log(err)   } 
        console.log(result)
            });    
        res.send("you liked post id: " + id)
    });
*/

// Route to delete a post
/*
app.delete('/api/delete/:id',(req,res)=>{
    const id = req.params.id;

    db.query("DELETE FROM posts WHERE id= ?", id, (err,result)=>{
    if(err) {
    console.log(err)
            } else{res.send("you liked removed id: " + id)} }) })
*/
app.listen(PORT, ()=>{
    console.log("Server is running on port "+ PORT)
})
