// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  let pincodes = {   //created object
    "852106": ["simri bakhtiyarpur", "Bihar"], //create array
    "852201": ['saharsa', 'Bihar']
  }
  res.status(200).json(pincodes)
  // res.status(200).json([852106, 852216, 852201, 852105, 852106, 852210, 852217])
}
