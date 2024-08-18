// // add meeting
// import { NextApiRequest, NextApiResponse } from "next";
// import { meetingController } from "@/backends/controllers/meeting.controller";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method == "POST") return meetingController.addMeeting(req, res);
//   else
//     return res.status(400).json({
//       message: "METHOD NOT ALLOWED",
//     });
// }

import { meetingController } from "@/backends/controllers/meeting.controller";
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from "next";
import path from 'path';

// Configure Multer for file storage
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = ['.pdf', '.doc', '.docx', '.jpeg', '.png'];
    const extname = path.extname(file.originalname).toLowerCase();
    if (allowedFileTypes.includes(extname)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    upload.single('report')(req as any, res as any, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      return meetingController.addMeeting(req, res);
    });
  } else {
    return res.status(405).json({
      message: "METHOD NOT ALLOWED",
    });
  }
}