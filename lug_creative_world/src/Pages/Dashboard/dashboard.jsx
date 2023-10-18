import Articlecard from "../../components/Articlecard/articlecard";
import Topbar from "../../components/Topbar/topbar";
import Toppost from "../../components/Toppost/toppost";
import "./dashboard.css";
import profile_img from "../../images/profile6.JPG"
import profile_img2 from "../../images/image2.jpg"
import { useQuery } from "react-query";
import { fetchPostData, getCat } from "../../api";
// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Modals/loadingmodal/loading";
const Dashboard = () =>
{
    // const {search} = useLocation();
    // console.log(location);
    const {data: articleData, error: articleerror, isLoading: articleisloading} = useQuery("postdata", fetchPostData);
    const {data: catsData, error: catserror, isLoading: catsisloading} = useQuery("catsdata", getCat);
    // this is to sort the post according to the time they were created
    const sortedPosts = articleData ? [...articleData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

    if (articleisloading || catsisloading){
        return(<Loading />);
    }

    return(
        <>
            <div id="dashboard">
            <Topbar showBottomBoxShadow={true} />
                <div className="dashboard_wrapper">
                    <div className="dashboard_left">
                        <input className="search" type="text" name="" id="" placeholder="Search by username..."/>
                        <div id="categories">
                            <h1>Categories</h1>
                            <ul>
                                {catsData && catsData.map((data)=>(<Link to={`/?cat=`} className="link">
                                    <li key={data.id}>{data}</li>
                                </Link>))}
                            </ul>
                        </div>
                        <Toppost />
                        <div className="top_authors">
                            <h2>Top Authors</h2>
                            <div className="authors_contain">
                                <img src={profile_img} alt="" />
                                <img src={profile_img2} alt="" />
                                <img src={profile_img2} alt="" />
                                <img src={profile_img} alt="" />
                                <img src={profile_img2} alt="" />
                                <img src={profile_img} alt="" />
                                <img src={profile_img2} alt="" />
                                <img src={profile_img} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="dashboard_right">
                       {sortedPosts.map((data)=>( <Articlecard key={data._id} articles={data}/>))};
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;