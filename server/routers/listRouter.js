const router = require("express").Router();
const List = require("../models/listModel");
const auth = require("../auth/auth");

router.get("/", auth, async (req, res) => {
  const list = await List.findOne({
    _id: req.user.id,
    username: req.user.username,
  });
  const content = {
    content: req.body.content,
    status: false,
  };
  if (!list) res.json({ success: false, status: "list not found!" });
  res.json(list.list);
});

router.put("/addlist", auth, async (req, res) => {
  await List.findOne({ _id: req.user.id, username: req.user.username })
    .then((data) => {
      const content = {
        content: req.body.content,
      };
      const list = [...data.list, content];
      data.list = list;
      data.save();
      res.json({ success: true, status: "added to list", data: list });
    })
    .catch((err) => console.log("error in updating lists collections"));
});

router.get("/:id", auth, async (req, res) => {
  const id = await req.params.id;
  const list = await List.findOne({
    _id: req.user.id,
    username: req.user.username,
  });
  const newList = list.list.find((li) => li._id.toString() === id);
  if (!newList) res.status(404).json({ success: false, status: "not found!" });
  res.json(newList);
});

router.delete("/:id", auth, async (req, res) => {
  const id = await req.params.id;
  await List.findOne({ _id: req.user.id, username: req.user.username })
    .then((data) => {
      const newList = data.list.filter((li) => {
        return li._id.toString() !== id;
      });
      data.list = newList;
      data.save();
      res.status(200).json({
        success: true,
        data: newList,
      });
    })
    .catch((err) => {
      console.log("error in delete list");
    });
});

router.put("/:id/update", auth, async (req, res) => {
  const id = await req.params.id;

  if (
    req.body.status !== true &&
    req.body.status !== false &&
    !req.body.content
  )
    res.status(301).json({ success: false, status: "failed!" });
  await List.findOne({ _id: req.user.id, username: req.user.username })
    .then((data) => {
      const newList = data.list.map((li) => {
        if (li._id.toString() === id) {
          if (req.body.status === true || req.body.status === false) {
            if (req.body.content) {
              li.status = req.body.status;
              li.content = req.body.content;
              return li;
            } else {
              li.status = req.body.status;
              return li;
            }
          } else {
            li.content = req.body.content;
            return li;
          }
        } else {
          return li;
        }
      });
      data.list = newList;
      data.save();
      res.json({
        success: true,
        status: "list by id " + id + " successfully updatede",
        data: newList,
      });
    })
    .catch((err) => console.log("error in put status", err));
});

module.exports = router;
