import "./button.css";

const Button = ({name, onClick, className}) =>
{
    return (
        <>
        <button onClick={onClick} id="app_btn" className={className}>
            {name}
        </button>
        </>
    );
}

export default Button