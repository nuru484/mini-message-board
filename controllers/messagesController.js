const messagesGet = (req, res) => {
  res.render('index', { title: 'Mini Messageboard' });
};

const addMessagesGet = (req, res) => {
  res.render('form', { title: 'Messages Form' });
};

const addMessagesPost = (req, res) => {
  const { user } = req.body;
  console.log(user);
  console.log(req.body);
};

module.exports = {
  messagesGet,
  addMessagesGet,
  addMessagesPost,
};
