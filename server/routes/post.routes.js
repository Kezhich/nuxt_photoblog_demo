const passport = require("passport");
const { Router } = require("express");
const upload = require("../middleware/upload");
const ctr = require("../controllers/post.controller");
const router = Router();

// admin
// /api/post/admin
router.post(
  "/admin/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  ctr.create
);

router.get(
  "/admin/",
  passport.authenticate("jwt", { session: false }),
  ctr.getAll
);

router.get(
  "/admin/:id",
  passport.authenticate("jwt", { session: false }),
  ctr.getById
);

router.get(
  "/admin/get/analytics",
  passport.authenticate("jwt", { session: false }),
  ctr.getAnalytics
);

router.put(
  "/admin/:id",
  passport.authenticate("jwt", { session: false }),
  ctr.update
);

router.delete(
  "/admin/:id",
  passport.authenticate("jwt", { session: false }),
  ctr.remove
);

// base
// /api/post/
router.get("/", ctr.getAll);
router.get("/:id", ctr.getById);
router.put("/add/view/:id", ctr.addView);

module.exports = router;
