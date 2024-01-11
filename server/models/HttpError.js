const HttpError = {
  UnAuthenticated: (res, errorMessage) =>
    res.status(403).json({ status: 'Error', message: errorMessage }),
  NotFound: (res, errorMessage) =>
    res.status(404).json({ status: 'Error', message: errorMessage }),
  ServerError: (res, errorMessage) =>
    res.status(500).json({ status: 'Error', message: errorMessage }),
  Conflict: (res, errorMessage) =>
    res.status(409).json({ status: 'Error', message: errorMessage }),
  BadRequest: (res, errorMessage) =>
    res.status(400).json({ status: 'Error', message: errorMessage }),
};

export default HttpError;
