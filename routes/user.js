import express from "express";
const userRouter = express.Router();

const getMe = (req, res, next) => {
  try {
    return res.render("users/me");
  } catch (e) {
    console.log(e);
    return res.send("Something Wrong!");
  }
};
const getMeUpdate = (req, res, next) => {
  try {
    return res.render("users/me-update");
  } catch (e) {
    console.log(e);
    return res.send("Something Wrong!");
  }
};

userRouter.get("/me", getMe);
userRouter.get("/me/update", getMeUpdate);

////////////////////////////////////////////////
// 이하는 파라미터를 사용한 url 설정 예시입니다. //
////////////////////////////////////////////////

const usernameRegex = /^@[A-Za-z0-9]+$/;

const getUserDetail1 = (req, res, next) => {
  const pk = req.params.pk;
  try {
    return res.send("Valid URL");
  } catch (e) {
    console.log(e);
    return res.send("Something Wrong!");
  }
};

const getUserDetail2 = (req, res, next) => {
  const username = req.params.username;
  if (!usernameRegex.test(username)) {
    // 입력된 파라미터가 정규식에 부합되지 않을 때
    res.redirect("/");
  }
  try {
    return res.send("Valid URL");
  } catch (e) {
    console.log(e);
    return res.send("Something Wrong!");
  }
};

userRouter.get("/:pk(\\d+)", getUserDetail1); // 'path("/<int:pk>", views.UserDetail.as_view())'; '\\d+'는 정수만을 허용하는 정규식

userRouter.get("/:username", getUserDetail2);

export default userRouter;
