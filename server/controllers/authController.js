import Users from '../models/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import HttpError from '../models/HttpError.js';

// Get all users from database
export async function getAllUsers(req, res) {
  try {
    const user = await Users.find();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Delete user by id
export async function deleteUser(req, res) {
  try {
    const user = await Users.findById(req.params.id);
    return res.status(200).json('Delete successfully !');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Register user
export async function Register(req, res) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    const users = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: hashed,
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

function generateAccessToken(user) {
  //! Create access Token
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      admin: user.admin,
    },
    process.env.JWT_ACCESS_KEY,
    {
      expiresIn: '60s',
    }
  );
}

function generateRefreshToken(user) {
  //!Create refresh Token
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      admin: user.admin,
    },
    process.env.JWT_REFRESH_KEY,
    {
      expiresIn: '365d',
    }
  );
}

// Login user
export async function Login(req, res) {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return HttpError.UnAuthenticated();
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return HttpError.UnAuthenticated();
    }
    if (user && validPassword) {
      //! Create token
      const accessToken = generateAccessToken(user);
      //! Create refresh token
      const refreshToken = generateRefreshToken(user);

      //! Save refresh token to DB
      user.refreshToken = refreshToken;
      user.save();

      // await Users.findByIdAndUpdate(
      //   { _id: user._id },
      //   { refreshToken },
      //   { new: true }
      // );

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
      });
      const { password, ...other } = user._doc;
      return res.status(200).json({ ...other, accessToken });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Request refresh Token

export async function requestRefreshToken(req, res) {
  //! Take refresh token from user
  const refreshToken = req.cookies.refreshToken; // refreshToken == 'refreshToken'

  if (!refreshToken) return res.status(401).json("You're not authenticated");

  //! Logic : Check the user's refresh Token then use the id information
  //! provided in the refresh_Token to recreate a new accessToken
  const oldToken = await Users.findOne({
    refreshToken: refreshToken,
  });
  console.log('oldTK', oldToken);
  if (!oldToken) {
    return res.json({
      status: 404,
      message: 'Token not available',
    });
  }
  jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (error, user) => {
    if (error) {
      console.log(error);
    }

    //! Create new accessToken , refreshToken
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    //! add new refresh token to array
    try {
      // await Users.findByIdAndUpdate(oldToken._id, {
      //   refreshToken: refreshToken,
      // });
      // await Users.updateOne(oldToken._id, {
      //   refreshToken: newRefreshToken,
      // });
      oldToken.refreshToken = newRefreshToken;
      oldToken.save();

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
      });
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
      });
      return res.status(200).json({ accessToken: newAccessToken });
    } catch (err) {
      return res.status(500).json({ message: error.message });
    }
  });
}
