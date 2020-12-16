const express = require("express")
const db = require("../data/config")

const router = express.Router()

router.get("/", async (req, res, next) => {
    try{
     const messages = await db
     .select("*")
     .from("messages")
     res.json(messages)
    }catch (err) {
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try{
        const [message] = await db
        .select("*")
        .from("messages")
        .where("id", req.params.id)
        .limit(1)

        res.json(message)
    }catch (err) {
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    try{
        const payload = {
            title: req.body.title,
            contents: req.body.contents,
        }

        const [id] =await  db.insert(payload).into("messages")

        const message = await db("messages").first().where("id", id)
        res.status(201).json(message)

    }catch (err) {
        next(err)
    }
})

router.put("/:id", async (req, res, next) => {
    try{
        const payload = {
            title: req.body.title,
            contents: req.body.contents,
        }
        await db("messages").first().where("id", req.params.id).update(payload)

    }catch (err) {
        next(err)
    }
})

router.delete("/:id", async (req, res, next) => {
    try{

        const message = await db("messages").first().where("id", req.params.id)
        res.json(message)

    }catch (err) {
        next(err)
    }
})

module.exports = router