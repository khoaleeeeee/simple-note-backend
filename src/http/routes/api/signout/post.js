const post = (_, res) => {
  res.cookie('sessionToken', '', {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? 'None' : 'Lax',
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

export default post;
