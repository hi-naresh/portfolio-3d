// pages/api/cv/save.ts
import { db } from "../../../firebaseConfig";
import { NextApiRequest, NextApiResponse } from "next";
import { doc, updateDoc, Timestamp } from "firebase/firestore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { data, currentVersion } = req.body;

    try {
        // Reference to the specific document based on the current version
        const versionDocRef = doc(db, 'cvVersions', currentVersion as string);

        // Update the document with new data
        await updateDoc(versionDocRef, {
            data,
            updatedAt: Timestamp.now()
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error saving CV:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
