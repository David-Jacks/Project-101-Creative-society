import "./loading.css";

const Loading = () =>{

    return(
    <div id="load_body">
        {/* partial:index.partial.html */}
        <div className="container">
            <span>LOADING</span>
            <span className="drop"></span>
        </div>

        <svg>
            <defs>
                <filter id="gooey">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur"/>
                    <feColorMatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -20" result="gooey" />
                    <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
                </filter>
            </defs>
        </svg>
{/* <!-- partial --> */}
    </div>);
}

export default Loading;