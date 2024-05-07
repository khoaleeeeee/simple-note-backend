const post = (_, res) => {
  res.cookie('sessionToken', '', {
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'strict'
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

export default post;
