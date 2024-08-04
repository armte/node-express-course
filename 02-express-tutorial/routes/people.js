const express = require("express");
const router = express.Router();
const { getPeople, addPeople, getPerson } = require("../controllers/people")

router.get('/', (req, res) => {
  return getPeople(req, res);
});

router.post('/', (req, res) => {
  return addPeople(req, res);
});

router.get('/:personID', (req,res) => {
  const idToFind = parseInt(req.params["personID"])
  return getPerson(req, res, idToFind);
});

module.exports = router;
