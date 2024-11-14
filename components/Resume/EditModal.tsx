// components/EditModal.tsx
import { useState } from 'react';
import {CVData} from "../../data/cvData";

interface EditModalProps {
    data: CVData;
    onSave: (data: CVData) => void;
    onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ data, onSave, onClose }) => {
    const [editedData, setEditedData] = useState<CVData>(data);

    const handleChange = (section: keyof CVData, value: any) => {
        setEditedData((prev) => ({
            ...prev,
            [section]: value,
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">Edit CV</h2>

                {/* Personal Info */}
                <section className="mb-6">
                    <h3 className="text-xl font-bold mb-2">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            value={editedData.personalInfo.firstName}
                            onChange={(e) => handleChange('personalInfo', {
                                ...editedData.personalInfo,
                                firstName: e.target.value,
                            })}
                            className="border rounded px-2 py-1"
                            placeholder="First Name"
                        />
                        {/* Add more fields for personal info */}
                    </div>
                </section>

                {/* Skills */}
                <section className="mb-6">
                    <h3 className="text-xl font-bold mb-2">Skills</h3>
                    {editedData.skills.map((skill, index) => (
                        <div key={index} className="mb-4">
                            <input
                                type="text"
                                value={skill.category}
                                onChange={(e) => {
                                    const newSkills = [...editedData.skills];
                                    newSkills[index].category = e.target.value;
                                    handleChange('skills', newSkills);
                                }}
                                className="border rounded px-2 py-1 mb-2"
                                placeholder="Skill Category"
                            />
                            <input
                                type="text"
                                value={skill.items.join(', ')}
                                onChange={(e) => {
                                    const newSkills = [...editedData.skills];
                                    newSkills[index].items = e.target.value.split(',').map(item => item.trim());
                                    handleChange('skills', newSkills);
                                }}
                                className="border rounded px-2 py-1 w-full"
                                placeholder="Skills (comma-separated)"
                            />
                        </div>
                    ))}
                </section>

                {/* Add more sections for education, experience, etc. */}

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(editedData)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Save as New Version
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;