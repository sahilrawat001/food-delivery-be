const UserModel = require('../model/user');
const bcrypt = require('bcrypt');

const signup = async (req, res, next)=>{
  const {password, email} = req.body();

  const hasedPassword = await bcrypt.hash(password, 12);
  try {
     const user = new UserModel({
        ...req.body, password: hasedPassword 
     });
     user.save();
     req.session.islogin = true;
     req.session.user = user._id;
     res.status(201).json({message: 'You have successfully registered. Please login now'})
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const login = async (req, res, next)=>{
  const {password, email} = req.body;
  
  try {
    const user = await UserModel.findOne({email: email}).exce();
    if(!user){
        return res.status(400).json({message: 'Invalid email or password'})
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      return res.status(400).json({message: 'Invalid email or password'})
    }
    
    req.session.islogin = true;
    req.session.user = user._id;
    user.password = undefined;
    res.status(200).json({message: 'you have login successfully', user});

  } catch (error) {
    res.status(500).json({message: error});
  }
 
  
}

const logout = async (req, res, next) =>{
    req.session.islogin = false;


  }


  module.exports = {signup, login, logout}