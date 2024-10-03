import React, {  useState } from "react";

interface ReviewFormProps {
    onSubmit: (name: string, review: string) => void;
    onClose: () => void;
}


const ReviewModal = (
    { onSubmit, onClose }: ReviewFormProps
) => {
    const [name, setName] = useState('');
    const [review, setReview] = useState('');

    const handleSubmit = () => {
        if (!name) {
            alert("Name is required.");
            return;
        }
        onSubmit(name, review);
        onClose();  // Close the modal after submission
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-black p-6 rounded-3xl ">
                <h2 className="text-lg text-center font-bold mb-4">Leave a Review and like it!</h2>
                <input
                    type="text"
                    className="border opacity-60 rounded-3xl p-2 px-4 w-full mb-4"
                    placeholder="Your Name (Required)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <textarea
                    className="border opacity-60 rounded-3xl p-2 px-4 w-full mb-4"
                    placeholder="Your Review (Optional)"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
                <div className="flex justify-end  space-x-2">
                    <button className="px-4 py-2 rounded-3xl bg-black" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="px-4 py-2 rounded-3xl bg-secondary text-white" onClick={handleSubmit}>
                        Like it!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;