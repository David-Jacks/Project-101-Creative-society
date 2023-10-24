import Articlecard from "../../components/Articlecard/articlecard";
import Topbar from "../../components/Topbar/topbar";
import "./dashboard.css";
import top_author_default_img from "../../images/profilevactor.jpg"
import { useQuery } from "react-query";
import { fetchPostData, getArticleByCat, getArticleByTitle, getCat, getTopAuthors, getToppost } from "../../api";
import {FaSearch} from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../../components/Modals/loadingmodal/loading";
import { memo, useCallback, useEffect, useState } from "react";
import Articlelist from "../../components/Articlelist/articlelist";


const Dashboard = memo(() =>
{
    const [searchresult, setSearchResult] = useState();
    const [searching, setSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [titleQuery, setTitleQuery] = useState("");
    const [articleData, setArticleData] = useState([]);
    const [offset, setOffset] = useState(0);
    // const [hasMore, setHasMore] = useState(true);
    const [sidebar, setShowSidebar] = useState(true);
     // handling toggling for sidebar menu in smaller devices
     const sideBarHandle = useCallback(() =>{
        setShowSidebar(!sidebar);
    }, [sidebar])

    useEffect(()=>{
        console.log("waiting");
          fetchPosts();    
    },[])
    
    const fetchPosts = async () => {
        try {
          const data = await fetchPostData(offset);
          console.log(data);
        //   setArticleData((prevData) => {
        //     return [...prevData, ...data];
        //   });
          
        setArticleData(data);
        console.log(data.length);
        setOffset(offset + data.length);

        if (data.length === 0) {
        // setHasMore(false);
        return;
        }

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }; 

    //     console.log("scroll event trigured");
    //      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
    //     if(hasMore){
    //         console.log("fetching posts...");
    //         fetchPosts();
    //     }}
    //  };

    // useEffect(() => {
    //     console.log("waitingt for i");
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //       window.removeEventListener('scroll', handleScroll);
    //     };
    //   }, [offset, hasMore]);

    // const {data: articleData, error: articleerror, isLoading: articleisloading} = useQuery("postdata", fetchPostData);

    const {data: topData, error: topError, isLoading: topisLoading, refetch} = useQuery("topdata", getToppost);
    const {data: catsData, error: catserror, isLoading: catsisloading} = useQuery("catsdata", getCat);
    const {data: topauthors, error: topauthorserror, isLoading: topauthorsisloading} = useQuery("topauthorsdata", getTopAuthors);
    console.log(topauthors);
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

    const handleCatClick = (val) =>{
        setSearching(true);
        setSearchQuery(val);
        setShowSidebar(true);
        console.log(val);
    }

    const handleSearch = (e) =>{
        e.preventDefault();
        setSearching(true);

        // setTitleQuery(titleQuery)       
    }
    // this is to sort the post according to the api calling state 
    if (!searching){
        sortedPosts = articleData;
    }else if (searching){
        sortedPosts = searchresult;
    };

    if (catsisloading || !articleData){
        return(<Loading />);
    };

    return(
        <>
            <div id="dashboard">
            <Topbar 
            showBottomBoxShadow={true}
            sideBarHandle={sideBarHandle}
            sidebar={sidebar}
            />
                <div className="dashboard_wrapper">
                    <div className={!sidebar ? "dashboard_left" : "show_left"}>
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
                        {/* categories */}
                        <div id="categories">
                            <h1>Categories</h1>
                            <ul>
                                {catsData && catsData.map((data)=>(
                                    <li key={data.id} value={data} onClick={()=>{handleCatClick(data)}} className="link">{data}</li>
                                ))}
                            </ul>
                        </div>
                        {/* toppost */}
                        <div id="toppost">
                            <h1>Top Posts</h1>
                            <ul>
                                {topData && topData.map((data)=>( 
                                <li key={data.id} className="link">
                                <Articlelist article={data}/>
                                </li>))}
                            </ul>
                        </div>
                        {/* topauthors */}
                        <div className="top_authors">
                            <h2>Top Authors</h2>
                            <div className="authors_contain">
                            {/* `}
                            i will add this later*/}
                                {topauthors && topauthors.map((data)=>(<Link key={data.name} to={`/profile/${data.id}`}><img src={data.profilePic ? `data:image/png;base64,${data.profilePic}` : top_author_default_img} alt="top_author_profile" /></Link>))}
                            </div>
                        </div>
                    </div>
                    <div className={sidebar ? "dashboard_right" : "show_right"}>
                    
                       {sortedPosts.map((data)=>( <Articlecard key={data._id} articles={data}/>))};
                    </div>
                </div>
            </div>
        </>
    );
});

export default Dashboard;