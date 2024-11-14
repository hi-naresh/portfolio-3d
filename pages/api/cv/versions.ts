// pages/api/cv/versions.ts
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebaseConfig";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Reference to the 'cvVersions' collection
        const versionsRef = collection(db, 'cvVersions');

        // Query to get all documents in the collection ordered by 'createdAt' in descending order
        const versionsQuery = query(versionsRef, orderBy('createdAt', 'desc'));
        const versionsSnapshot = await getDocs(versionsQuery);

        // Map document IDs from the query result
        const versions = versionsSnapshot.docs.map((doc) => doc.id);

        return res.status(200).json({ versions });
    } catch (error) {
        console.error('Error fetching versions:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
