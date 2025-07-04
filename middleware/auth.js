// middlewares/auth.js
const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== 'mysecretapikey') {
    return res.status(401).json({ message: 'Unauthorized: Invalid API Key' });
  }

  next();
};

export default apiKeyAuth;
