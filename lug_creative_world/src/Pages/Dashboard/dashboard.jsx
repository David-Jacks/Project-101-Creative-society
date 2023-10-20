import Articlecard from "../../components/Articlecard/articlecard";
import Topbar from "../../components/Topbar/topbar";
import Toppost from "../../components/Toppost/toppost";
import "./dashboard.css";
import profile_img from "../../images/profile6.JPG"
import profile_img2 from "../../images/image2.jpg"
import { useQuery } from "react-query";
import { fetchPostData, getArticleByCat, getArticleByTitle, getCat } from "../../api";
import {FaSearch} from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../../components/Modals/loadingmodal/loading";
import { useEffect, useState } from "react";
const Dashboard = () =>
{
    const [searchresult, setSearchResult] = useState();
    const [searching, setSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [titleQuery, setTitleQuery] = useState("");
    // const {search} = useLocation();
    // console.log(location);
    const {data: articleData, error: articleerror, isLoading: articleisloading} = useQuery("postdata", fetchPostData);
    // const {data: articleDataSearch, error: articleerrorSearch, isLoading: articleSearchisloading} = useQuery(["searchdata", searchQuery], getArticleByCat(searchQuery), { 
    //     enabled: searchQuery !== undefined});
    const {data: catsData, error: catserror, isLoading: catsisloading} = useQuery("catsdata", getCat);

    useEffect(()=>{
        async function searcher(){
            const ans = await getArticleByCat(searchQuery);
            setSearchResult(ans);
        }
       
        searcher();
    },[searchQuery])

    useEffect(()=>{
       
        async function searchByTitle(){
            const ans = await getArticleByTitle(titleQuery);
            setSearchResult(ans);
        }
       
        searchByTitle();
    },[titleQuery])

    let sortedPosts;

    const handleCatClick = (val)=>{
        setSearching(true);
        setSearchQuery(val);
        console.log(val);
    }
    const handleSearch = (e) =>{
        e.preventDefault();
        setSearching(true);
        console.log(titleQuery);

        // setTitleQuery(titleQuery)
       
    }
    // this is to sort the post according to the time they were created
    if (!searching){
        sortedPosts = articleData ? [...articleData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];
    }else if (searching){
        sortedPosts = searchresult ? [...searchresult].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];
    }

    if (articleisloading || catsisloading){
        return(<Loading />);
    }

    return(
        <>
            <div id="dashboard">
            <Topbar showBottomBoxShadow={true} />
                <div className="dashboard_wrapper">
                    <div className="dashboard_left">
                        <div className="search_div">
                            <input className="search" 
                            type="text" 
                            name="" 
                            value={titleQuery}
                            onChange={(e)=>setTitleQuery(e.target.value)}
                            placeholder="Search by article title..."
                            />
                            <FaSearch 
                            className="search_icon" 
                            onClick={handleSearch}
                            />
                        </div>
                        <div id="categories">
                            <h1>Categories</h1>
                            <ul>
                                {catsData && catsData.map((data)=>(
                                    <li key={data.id} value={data} onClick={()=>{handleCatClick(data)}} className="link">{data}</li>
                                ))}
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