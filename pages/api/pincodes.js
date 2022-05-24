import pincodes from '../../pincodes.json'
export default function handler(req, res) {
  res.status(200).json(pincodes)
  // res.status(200).json([852106, 852216, 852201, 852105, 852106, 852210, 852217])
}
