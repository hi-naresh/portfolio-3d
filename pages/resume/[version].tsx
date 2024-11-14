// import { useCallback, useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { CVData } from "../../data/cvData";
// import CV from "@components/Resume";
// import { Edit } from "lucide-react";
// import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
// import Loading from "@components/Layout/loading";
// import { auth } from '../../firebaseConfig'; // Import the initialized auth instance
// import { onAuthStateChanged, User } from "firebase/auth";
//
// const ResumePage = () => {
//     const router = useRouter();
//     const { version } = router.query;
//     const [cvData, setCvData] = useState<CVData | null>(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [versions, setVersions] = useState<Array<{ name: string; id: string }>>([]);
//     const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);
//
//     const fetchCVData = useCallback(async () => {
//         try {
//             const response = await fetch(`/api/cv/${version}`);
//             const data = await response.json();
//             setCvData(data);
//         } catch (error) {
//             console.error('Error fetching CV data:', error);
//         }
//     }, [version]);
//
//     useEffect(() => {
//         onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 setAuthenticatedUser(user);
//             } else {
//                 setAuthenticatedUser(null);
//             }
//         });
//     }, []);
//
//     useEffect(() => {
//         if (version) {
//             fetchCVData().then(r => console.log(r));
//             fetchVersions().then(r => console.log(r));
//         }
//     }, [fetchCVData, version]);
//
//     const fetchVersions = async () => {
//         try {
//             const response = await fetch('/api/cv/versions');
//             const data = await response.json();
//             setVersions(data.versions);
//         } catch (error) {
//             console.error('Error fetching versions:', error);
//         }
//     };
//
//     const handleSave = async (newData: CVData, newVersionName?: string) => {
//         try {
//             const endpoint = newVersionName ? '/api/cv/saveAs' : '/api/cv/save';
//             const response = await fetch(endpoint, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     data: newData,
//                     currentVersion: version,
//                     newVersionName
//                 }),
//             });
//
//             if (response.ok) {
//                 const { newVersion } = await response.json();
//                 if (newVersionName) {
//                     router.push(`/resume/${newVersion}`);
//                 } else {
//                     fetchCVData(); // Refresh current version
//                 }
//                 setIsEditing(false);
//                 fetchVersions();
//             }
//         } catch (error) {
//             console.error('Error saving CV:', error);
//         }
//     };
//
//     if (!cvData) return <Loading />;
//
//     return (
//         <div className="relative">
//             {authenticatedUser && (
//                 <EditMode isEditing={isEditing} setIsEditing={setIsEditing} />
//             )}
//             <CV
//                 data={cvData}
//                 isEditing={isEditing}
//                 onSave={handleSave}
//             />
//         </div>
//     );
// };
//
// const EditMode = (
//     { isEditing, setIsEditing }: { isEditing: boolean; setIsEditing: (arg0: boolean) => void }
// ) => {
//     return (
//         <div className="fixed top-0 right-0 z-50 space-x-2">
//             <button
//                 onClick={() => setIsEditing(!isEditing)}
//                 className={`m-6 p-2 rounded-full ${
//                     isEditing ? 'bg-gray-500' : 'bg-blue-500'
//                 } text-white`}
//             >
//                 {isEditing ? <CloseIcon /> : <Edit />}
//             </button>
//         </div>
//     );
// };
//
// export async function getServerSideProps(context: { params: { version: any } }) {
//     const version = context.params.version;
//     const res = await fetch(`http://localhost:3000/api/cv/${version}`);
//     const cvData = await res.json();
//
//     return { props: { cvData } };
// }
//
// export default ResumePage;

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged, signOut } from "firebase/auth";
import CV from "@components/Resume";
import AuthModal from "@components/AuthModal";
import { Edit } from "lucide-react";
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Loading from "@components/Layout/loading";
import {CVData} from "../../data/cvData";
import {useIsMobile} from "@libs/hooks/useIsMobile";

const ResumePage = () => {
    const router = useRouter();
    const { version } = router.query;
    const [versions, setVersions] = useState([]);
    const [cvData, setCvData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const isMobile = useIsMobile();

    const fetchCVData = useCallback(async () => {
        try {
            const response = await fetch(`/api/cv/${version}`);
            const data = await response.json();
            setCvData(data);
        } catch (error) {
            console.error('Error fetching CV data:', error);
        }
    }, [version]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // @ts-ignore
            return setAuthenticatedUser(user);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (version) fetchCVData();
    }, [fetchCVData, version]);

    const fetchVersions = async () => {
        try {
            const response = await fetch('/api/cv/versions');
            const data = await response.json();
            setVersions(data.versions);
        } catch (error) {
            console.error('Error fetching versions:', error);
        }
    };

    const handleSave = async (newData: CVData, newVersionName?: string) => {
        try {
            const endpoint = newVersionName ? '/api/cv/saveAs' : '/api/cv/save';
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: newData,
                    currentVersion: version,
                    newVersionName
                }),
            });

            if (response.ok) {
                const { newVersion } = await response.json();
                if (newVersionName) {
                    router.push(`/resume/${newVersion}`);
                } else {
                    fetchCVData(); // Refresh current version
                }
                setIsEditing(false);
                fetchVersions();
            }
        } catch (error) {
            console.error('Error saving CV:', error);
        }
    };


    const handleLogout = async () => {
        await signOut(auth);
        setAuthenticatedUser(null);
    };

    if (!cvData) return <Loading />;

    return (
        <div className="relative">
            {authenticatedUser ? (
                <>
                    <EditMode isEditing={isEditing} setIsEditing={setIsEditing} />
                    <button
                        onClick={handleLogout}
                        className="fixed top-0 left-0 m-4 p-2 bg-red-500 text-white rounded"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <>
                    {
                        !isMobile&& (
                            <div className="fixed top-0 left-0 m-4 space-x-4">
                                <button
                                    onClick={() => setShowAuthModal(true)}
                                    className="p-2 bg-blue-500 text-white rounded"
                                >
                                    Login
                                </button>
                            </div>
                        )
                    }
                </>
            )}
            <CV data={cvData} isEditing={isEditing} onSave={handleSave}/>
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </div>
    );
};

const EditMode = (
    {isEditing, setIsEditing }: { isEditing: boolean; setIsEditing: (arg0: boolean) => void }
) => {
    return (
        <div className="fixed top-0 right-0 z-50 m-4">
            <button
                onClick={() => setIsEditing(!isEditing)}
                className={`p-2 rounded-full ${isEditing ? 'bg-gray-500' : 'bg-blue-500'} text-white`}
            >
                {isEditing ? <CloseIcon /> : <Edit />}
            </button>
        </div>
    );
};

export default ResumePage;
