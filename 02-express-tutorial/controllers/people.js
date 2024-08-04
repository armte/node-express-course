const { people } = require("../data")

function getPeople(req, res) {
  return res.status(200).json(people);
};

function addPeople(req, res) {
  if (!req.body.name) {
    return res.status(400).json({ success: false, message: "Please provide a name" });
  }
  people.push({id: people.length + 1, name: req.body.name});
  return res.status(201).json({ success: true, name: req.body.name });
};

function getPerson(req, res, id) {
  let person = people.find( (elem) => elem.id == id);
  if (!person) {
    return res.status(404).json({ success: false, message: `Could not find person with id ${idNum}` });
  }
  return res.status(201).json(person);
};

module.exports = { getPeople, addPeople, getPerson };