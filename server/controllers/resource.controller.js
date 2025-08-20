const Resource = require("../models/resource.model");

const createResource = async (req, res) => {
  try {
    const { title, content } = req.body;
    const resource = new Resource({ title, content, owner: req.user.id });
    await resource.save();

    res.status(201).json({ msg: "Resource created", resource });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Interval server error" });
  }
};

const getResources = async (req, res) => {
  try {
    const { role, id } = req.user;

    if (["admin", "moderator"].includes(role)) {
      const resources = await Resource.find().populate(
        "owner",
        "name email role"
      );
      return res.json({ total: resources.length, resources });
    }

    const resources = await Resource.find({ owner: id }).populate(
      "owner",
      "name email role"
    );
    res.json({ msg: "User specific resources", resources });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Interval server error" });
  }
};

const getResourceById = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, id: userId } = req.user;

    const resource = await Resource.findById(id).populate(
      "owner",
      "name email role"
    );
    if (!resource) return res.status(404).json({ msg: "Resource not found" });

    if (role === "user" && resource.owner._id.toString() !== userId)
      return res.status(403).json({ msg: "Access denied" });

    res.json(resource);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Interval server error" });
  }
};

const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, id: userId } = req.user;

    const resource = await Resource.findById(id);
    if (!resource) return res.status(404).json({ msg: "Resource not found" });

    if (
      resource.owner._id.toString() !== userId &&
      !["moderator", "admin"].includes(role)
    )
      return res.status(403).json({ msg: "Access denied" });

    const { title, content } = req.body;
    if (title) resource.title = title;
    if (content) resource.content = content;

    await resource.save();

    res.json({ msg: "Resource updated", resource });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Interval server error" });
  }
};

const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, id: userId } = req.user;

    const resource = await Resource.findById(id);
    if (!resource) return res.status(404).json({ msg: "Resource not found" });

    if (
      resource.owner.toString() !== userId &&
      !["moderator", "admin"].includes(role)
    )
      return res.status(403).json({ msg: "Access denied" });

    await resource.deleteOne();

    res.json({ msg: "Resource deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  createResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource,
};
