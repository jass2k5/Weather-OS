
export const Reset = ({ onClick, label = "Reset" }) => {
    return (
        <button className="reset-btn" onClick={onClick}>
            <span>{label}</span>
        </button>
    );
};