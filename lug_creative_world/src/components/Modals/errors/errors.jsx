import "./errors.css";

const Error = (props) =>{
    return(<>
        <div id="error_wrapper">
            <p className="error_message">
            {props.err_message}
            </p>

            <button className="error_btn" onClick={props.handleErrorClick}>Go back</button>
        </div>
    </>);

}


export default Error;