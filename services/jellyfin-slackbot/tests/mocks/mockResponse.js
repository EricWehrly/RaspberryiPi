/**
 * Creates a mock Express response object for testing
 * @returns {Object} Mock response object with jest.fn() methods
 */
const mockResponse = () => {
  const res = {};
  
  // Common Express response methods
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.sendStatus = jest.fn().mockReturnValue(res);
  res.end = jest.fn().mockReturnValue(res);
  res.set = jest.fn().mockReturnValue(res);
  res.type = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  res.clearCookie = jest.fn().mockReturnValue(res);
  res.redirect = jest.fn().mockReturnValue(res);
  res.render = jest.fn().mockReturnValue(res);
  
  // Additional properties
  res.headersSent = false;
  res.locals = {};

  return res;
};

module.exports = mockResponse;
