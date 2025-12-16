import React, { useState, useRef, useMemo, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  uploadBlogImage,
  deleteBlogImage,
  createBlog,getAllBlogs,
  putUpdateBlog,getAllProcedures,getBlog,getProcedureBlog} from "../../services/dbservice";

  import { convertToTree } from '../../services/utility';
 import MenuItem from '../../component/MenuItem';

const BlogEditor = () => {
    const quillRef = useRef();
      const prevImagesRef = useRef([]); // Track previous images

  // const [title, setTitle] = useState("");
  // const [subtitle, setSubtitle] = useState("");
  // const [htmlContent, setHtmlContent] = useState("");
   const handleImageUpload = () => {
    console.log("Image upload triggered");
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);

        // const res = await axios.post("http://localhost:5137/api/blog/upload", formData, {
        //   headers: { "Content-Type": "multipart/form-data" }
        // });
 
      const res = await uploadBlogImage(formData);

        const url = res.data.url;
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        console.log(range.index);
const insertAt = range && typeof range.index === "number" ? range.index : 0;
        // quill.insertEmbed(insertAt, "image", url);
         quill.clipboard.dangerouslyPasteHTML(insertAt, `<img src="${url}" />`);
    };
  };
const handleVideoInsert = () => {
  const url = window.prompt("Enter video URL (YouTube, Vimeo, etc):");
  if (url) {
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection();
    const insertAt = range && typeof range.index === "number" ? range.index : 0;
    // Quill supports 'video' embed for YouTube/Vimeo URLs
    quill.insertEmbed(insertAt, "video", url);
  }
};

  const modules = useMemo(() => ({
     
      toolbar: {
        container: [
          
          [{ header: [1, 2, false] }],
          [{ 'color': [] }, { 'background': [] }], // text color and background
          [{ 'size': ['extra-small', 'small', false, 'large', 'extra-large', 'huge'] }], // font size

          ["bold", "italic", "underline"],
          ["link", "image", "video"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["clean"],
        ],
        handlers: {
          image: handleImageUpload,
          video: handleVideoInsert, // <-- Add video handler here
        },
      }
    
  }),[]);

  // const handleSubmit = async () => {
  //   // await axios.post("http://localhost:5000/api/procedures", {
  //   //   title,
  //   //   subtitle,
  //   //   htmlContent
  //   // });
  //   alert("Procedure saved!");
  // };
 const [editorContent, setEditorContent] = useState(""); // stores editor content
  const [htmlContent, setHtmlContent] = useState(""); // stores generated HTML
  const [title, setTitle] = useState(""); // Add title state

  const [procedures, setProcedures] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [blog, setBlog] = useState(null);

    const [selected, setSelected] = useState(null);
    const [selectedProcedureId, setSelectedProcedureId] = useState(""); // For dropdown

      const [isOpen, setIsOpen] = useState(false);

     const [treeData, setTreeData] = useState([]);
  

    useEffect(() => {
      async function fetchProcedures() {
        try {
          const resBlogs = await getAllBlogs();
            const res = await getAllProcedures();
                     
          setProcedures(res.data);
          setBlogs(resBlogs.data);
          setTreeData(convertToTree(res.data));
          console.log("Fetched procedures:", res.data);
                    console.log("Fetched Blogs:", resBlogs.data);

          if (resBlogs.data.length > 0) setSelected(resBlogs.data[0].key || resBlogs.data[0].id);
          setEditorContent(resBlogs.data[0].htmlContent || ""); // Quill's internal format
          setHtmlContent(resBlogs.data[0].htmlContent || ""); // Actual HTML string
                    setTitle(resBlogs.data[0].title || ""); // Set title from first blog
          //setSelectedProcedureId(res.data[0].id || ""); // Set default ProcedureId

            console.log(resBlogs.data[0].htmlContent);
        } catch (err) {
          console.error("Failed to fetch procedures:", err);
        }
      }
      fetchProcedures();
    }, []);
      
     // const treeData = useMemo(() => convertToTree(procedures), []);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  console.log('tree', treeData);

    // const selectedBlog = blogs.find(
      
    //   (p) => p.key === selected || p.id === selected
    // );


   const selectedBlog =   async () =>  await getBlog(selected);
   

    const handleEditorChange =  async (content, delta, source, editor) => {
      const parser = new DOMParser();

  // Get current images
    const newDoc = parser.parseFromString(content, "text/html");
    const newImages = Array.from(newDoc.querySelectorAll("img")).map(
      (img) => img.src
    );

     // Get previous images from ref
    const oldImages = prevImagesRef.current;
      console.log(oldImages);

     // Detect deleted images
    const deleted = oldImages.filter((img) => !newImages.includes(img));
    for (const imgUrl of deleted) {
      const fileName = imgUrl.split("/").pop();
      //await axios.delete(`http://localhost:5137/api/blog/image/${fileName}`);
      await deleteBlogImage(fileName);
    }

    // Update ref for next change
    prevImagesRef.current = newImages;
    setEditorContent(content||""); // Quill's internal format
    setHtmlContent(editor.getHTML()); // Actual HTML string
  };
    const handleSave = async () => {
      if(blog){
         // Update existing blog
         alert("update",selected);

        await putUpdateBlog(blog.id, {id:blog.id, title, htmlContent, ProcedureId: selectedProcedureId||0 });
      } else {
        // Create new blog
        await createBlog({ title, htmlContent, ProcedureId: selectedProcedureId });
      }

   
    alert("Blog saved!");
  };
const getSelectedBlog = async (item) => {
  try {
    setSelected(item.id);
    
    // Fetch the blog data
    const res = await getProcedureBlog(item.id);
    const blog = res.data;
    console.log('selected blog', blog);
    if (!blog || blog.id === 0) {
      setEditorContent("");
      setHtmlContent("");
      setTitle("");
      setSelectedProcedureId("");
    } else {
      setEditorContent(blog.htmlContent || "");
      setHtmlContent(blog.htmlContent || "");
      setTitle(blog.title || "");
      setSelectedProcedureId(blog.procedureId || "");
      setBlog(blog);
    }
  } catch (err) {
    console.error("Failed to fetch blog:", err);
  }
};
 

 
  return (
 <div className="p-4 sm:p-6 bg-[#FDF3C4] min-h-screen">
      <div className="container mx-auto">
        <div className="h-16 md:h-40" />
        <div className="min-h-screen bg-[#FDF3C4] flex flex-col md:flex-row gap-4 md:gap-0">
          {/* Left Side Menu */}
          <aside className={`md:w-1/4 w-full bg-white shadow-lg border-r-2 border-[#b8860b] p-4 sm:p-6 rounded-lg md:rounded-none transition-all duration-300 ${isSidebarOpen ? 'max-h-96 md:max-h-full overflow-y-auto' : 'max-h-16 md:max-h-full'}`}>
        <div className="p-2 sm:p-4 flex justify-between items-center h-14 md:h-16 border-b border-[#b8860b]">
          <h1 className={`text-lg sm:text-xl font-bold text-[#800000] truncate transition-all ${!isSidebarOpen && 'hidden md:block'}`}>
            Procedures
          </h1>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
             className={`md:hidden w-8 h-8 flex items-center justify-center rounded transition font-semibold bg-[#b8860b] text-white hover:bg-[#a07609]`}>
            {isSidebarOpen ? '−' : '+'} 
          </button>
        </div>

         
          {isSidebarOpen || window.innerWidth >= 768 ? (
            <ul className="space-y-1 mt-3 sm:mt-4">
              {treeData.map(item => (
                <MenuItem key={item.id} item={item} onClick={(childItem) => getSelectedBlog(childItem)} />
              ))}
            </ul>
          ) : null}
       
      </aside>
         
          {/* Content Area */}
          <main className="flex-1 p-4 sm:p-6 md:p-8 w-full">
            <div className="max-w-4xl md:max-w-8xl text-base sm:text-lg bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#800000] mb-4 md:mb-6 text-center">Add Blog</h2>

               <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
                className="w-full mb-4 px-3 sm:px-4 py-2 text-sm sm:text-base border border-[#b8860b] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
              />
       <div className="mb-4 md:mb-6">
         <ReactQuill
          ref={quillRef}
           theme="snow"
         value={editorContent}
         onChange={handleEditorChange}
         modules={modules}
           className="bg-white rounded-lg"
          style={{ minHeight: "250px" }} 
        />
       </div>
        <textarea
          value={htmlContent}
          readOnly
          style={{ width: "100%", minHeight: "150px" }}
          className="border border-[#b8860b] rounded-lg p-2 sm:p-3 bg-[#fff8f0] mb-4 text-xs sm:text-sm"
        /> 
          <button
        onClick={handleSave}
        className="w-full md:w-auto mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition text-sm sm:text-base"
      >
    {selected === null ? "Save Blog" : "Update Blog"}
      </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
  
//  return (
//     <div className="min-h-screen bg-[#FDF3C4] py-12">
//       <div className="h-32 md:h-40" />
//       <div className="container mx-auto  bg-white rounded-2xl shadow-lg p-8">
//         <h2 className="text-2xl font-bold text-[#800000] mb-6 text-center">Add Procedure</h2>
//         <ReactQuill
//           ref={quillRef}
//           theme="snow"
//           value={editorContent}
//           onChange={handleEditorChange}
//           modules={modules}
//           className="mb-6 bg-white rounded-lg"
//           style={{ minHeight: "300px" }} 
//         />
//         {/* <h3 className="text-lg font-semibold text-[#800000] mb-2">Preview HTML</h3>
//         <textarea
//           value={htmlContent}
//           readOnly
//           style={{ width: "100%", height: "200px" }}
//           className="border border-[#b8860b] rounded-lg p-2 bg-[#fff8f0] mb-6"
//         /> */}
//           <button
//         onClick={handleSave}
//         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Save Blog
//       </button>
//       </div>
//     </div>
//   );
}
export default BlogEditor;