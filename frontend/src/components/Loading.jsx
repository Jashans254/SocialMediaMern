export const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div 
                className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4"
                style={{
                    borderColor: "transparent",
                    borderTopColor: "#3498db", // Blue
                    borderBottomColor: "#9b59b6", // Purple
                    boxShadow: "0px 4px 10px rgba(52, 152, 219, 0.5)", // Subtle glow
                }}>
            </div>
        </div>
    );
};


export const LoadingAnimation = () => {
    return (
        <div 
            className="inline-block w-6 h-6 border-t-2 border-b-2 border-r-transparent rounded-full animate-spin"
            style={{
                borderTopColor: "#e74c3c", // Red
                borderBottomColor: "#f39c12", // Orange
                borderRightColor: "transparent", // To create a spinning effect
                transition: "all 0.3s ease-in-out", // Smooth transitions
            }}>
        </div>
    );
};
