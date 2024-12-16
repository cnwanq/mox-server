export const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  let origin = req.header('Origin');
  // console.log(origin);
  // development
  if (origin.includes('localhost')) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else if (origin.includes('xiaomox.com')) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}