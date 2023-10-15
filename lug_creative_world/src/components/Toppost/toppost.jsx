import { useEffect, useState } from "react";
import Articlelist from "../Articlelist/articlelist";
import "./toppost.css";
import { getToppost } from "../../api";
import { useQuery } from "react-query";
const Toppost = () => 
{
    const {data: topData, error: topError, isLoading: topisLoading, refetch} = useQuery("topdata", getToppost);
   
    return(
        <>
            <div id="toppost">
                <h1>Top Posts</h1>
               {topData && topData.map((data)=>( <Articlelist article={data}/>))}
            </div>
        </>
    );
}

export default Toppost