// pages/save.tsx
import { useEffect } from "react";

const SavePage = () => {
    useEffect(() => {
        const saveData = async () => {
            try {
                const response = await fetch("/api/cv/saveData", {
                    method: "POST",
                });

                if (!response.ok) throw new Error("Failed to save data");

                const result = await response.json();
                alert(result.message);
            } catch (error) {
                console.error("Error saving data:", error);
                alert("Error saving data");
            }
        };

        saveData();
    }, []);

    return (
        <div>
            <h1>Saving CV Data...</h1>
            <p>You will see a success message shortly if the data was saved successfully.</p>
        </div>
    );
};

export default SavePage;
