import jwt from 'jsonwebtoken';

export async function verifyToken(req, res, next) {
  const token = await req.headers.token;
  if (token) {
    const accessToken = token.split(' ')[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
      // console.log(user);
      if (err) {
        return res.status(403).json('Token is not valid !');
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json("You're not authenticated");
  }
}

export async function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    // id của mình == với id người mình muốn xóa hoặc mình là admin
    if (req.user.id == req.params.id || req.user.admin) {
      next();
    } else {
      return res.status(403).json("You're not allowed to delete other");
    }
  });
}
