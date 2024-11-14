// // pages/api/cv/[version].ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { db } from "../../../firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";
//
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== 'GET') {
//         return res.status(405).json({ message: 'Method not allowed' });
//     }
//
//     const { version } = req.query;
//
//     try {
//         // Use the doc and getDoc methods from Firestore SDK
//         const docRef = doc(db, 'cvVersions', version as string); // Specify the document reference
//         const cvDataSnapshot = await getDoc(docRef);
//
//         const cvData = cvDataSnapshot.data()?.data; // Accessing the 'data' field inside the document
//
//         // const cvData = await getDoc(docRef); // Fetch the document
//
//         if (!cvData.exists()) {
//             return res.status(404).json({ message: 'Version not found' });
//         }
//
//         return res.status(200).json(cvData);
//
//         return res.status(200).json(cvData.data());
//     } catch (error) {
//         console.error('Error fetching CV data:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// }


// pages/api/cv/[version].ts
import { db } from "../../../firebaseConfig";
import { NextApiRequest, NextApiResponse } from "next";
import { doc, getDoc } from "firebase/firestore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { version } = req.query;

    try {
        // Reference to the document in Firestore
        const cvDocRef = doc(db, 'cvVersions', version as string);
        const cvDocSnapshot = await getDoc(cvDocRef);

        // Check if the document exists
        if (!cvDocSnapshot.exists()) {
            return res.status(404).json({ message: 'Version not found' });
        }

        // Extract and return the `data` field from the document
        const cvData = cvDocSnapshot.data();
        if (cvData && cvData.data) {
            return res.status(200).json(cvData.data);
        } else {
            return res.status(500).json({ message: 'Data field not found in document' });
        }
    } catch (error) {
        console.error('Error fetching CV data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
