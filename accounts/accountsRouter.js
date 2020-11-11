const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

router.post("/", (req, res) => {
  const account = req.body;

  db("accounts")
    .insert(account)
    .then((id) => {
      res.status(201).json(id);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then((a) => {
      res.send(a);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put("/:id", (req, res) => {
  const accountId = req.params.id;
  const changes = req.body;

  db("accounts")
    .where({ id: accountId })
    .update(changes)
    .then((count) => {
      res.status(200).json(`${count} record(s) affected`);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete("/:id", (req, res) => {
  const accountId = req.params.id;

  db("accounts")
    .where({ id: accountId })
    .del()
    .then((count) => {
      res.status(200).json({ message: `${count} record(s) affected` });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
