// pages/api/cv/saveAs.ts
import { db } from "../../../firebaseConfig";
import { NextApiRequest, NextApiResponse } from "next";
import { collection, query, where, getDocs, setDoc, Timestamp, doc } from "firebase/firestore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { data, currentVersion, newVersionName } = req.body;

    try {
        // Reference to the 'cvVersions' collection
        const versionsCollectionRef = collection(db, 'cvVersions');

        // Check if the version name already exists
        const versionQuery = query(versionsCollectionRef, where('name', '==', newVersionName));
        const existingVersionSnapshot = await getDocs(versionQuery);

        if (!existingVersionSnapshot.empty) {
            return res.status(400).json({ message: 'Version name already exists' });
        }

        // Create a new document with the specified name as ID and set data
        const newVersionRef = doc(versionsCollectionRef, newVersionName);
        await setDoc(newVersionRef, {
            data,
            name: newVersionName,
            baseVersion: currentVersion,
            createdAt: Timestamp.now()
        });

        return res.status(200).json({ newVersion: newVersionName });
    } catch (error) {
        console.error('Error saving new CV version:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
