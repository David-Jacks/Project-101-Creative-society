import DOMpurify from "dompurify";
import "react-quill/dist/quill.snow.css";
import "./articletext.css";
import { useSelector } from "react-redux/es/hooks/useSelector";

function Articletext({body}) {
  // const article = useSelector((state) => state.article.value);
  //to presvent some security risks like xss and html injection, we are making use of dompurify to render purified html content
  const sanitizedHTML = DOMpurify.sanitize(body);
  return (
    <div className="article_view_para ql-editor" dangerouslySetInnerHTML={{ __html: sanitizedHTML }}></div>
  )
}

export default Articletext;