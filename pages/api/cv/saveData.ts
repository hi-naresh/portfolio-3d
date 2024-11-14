// pages/api/cv/saveData.ts
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebaseConfig";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { cvData } from "../../../data/cvData"; // Assuming your data is in this path

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Set a version (you can make this dynamic if needed)
        const version = "1.0"; // Adjust dynamically if you want multiple versions

        // Reference to the Firestore document
        const docRef = doc(collection(db, "cvVersions"), version);

        // Add data to Firestore with a timestamp, nested inside a 'data' field
        await setDoc(docRef, {
            data: cvData, // Nest cvData under the 'data' key
            version: version,
            createdAt: Timestamp.now(),
        });

        // Send success response
        return res.status(200).json({ message: "Data successfully added to Firestore", version });
    } catch (error) {
        console.error("Error saving CV data:", error);
        // @ts-ignore
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
