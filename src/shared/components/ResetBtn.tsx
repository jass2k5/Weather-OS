interface ResetProps{
    onClick:()=>void;
    label:string;
}
export const Reset = ({ onClick, label = "Reset" }:ResetProps) => {
    return (
        <button className="reset-btn" onClick={onClick}>
            <span>{label}</span>
        </button>
    );
};