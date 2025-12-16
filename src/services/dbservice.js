import axios from "axios";

 
const localapp = "http://localhost:5137/api";
const BASE_URL_LocalHost = "http://localhost:8081/api";
const BASE_URL_Production = "https://api.jyothidental.com/api";

 const BASE_URL =  `${BASE_URL_Production}/blog`;


export const createBlog = async (data) => {
  return await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const putUpdateBlog = async (id, data) => {
  return await axios.put(`${BASE_URL}/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const deleteBlogImage = async (fileName) => {
  return await axios.delete(`${BASE_URL}/image/${fileName}`);
};

export const uploadBlogImage = async (formData) => {
  return await axios.post(`${BASE_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getAllBlogs = async () => {
  return await axios.get(`${BASE_URL}/getall`);
};
export const getBlog = async (id) => {
  return await axios.get(`${BASE_URL}/${id}`);
};
export const getProcedureBlog = async (id) => {
  return await axios.get(`${BASE_URL}/ProcedureBlog/${id}`);
};
// prodcedure specific methods
const PROCEDURE_URL =  `${BASE_URL_Production}/procedure`; //"http://localhost:5137/api/procedure";  


                // Get all procedures
        export const getAllProcedures = async () => {
        return await axios.get(`${PROCEDURE_URL}`);
        };

                // Get procedure by id
        export const getProcedureById = async (id) => {
        return await axios.get(`${PROCEDURE_URL}/${id}`);
        };

        // Create a new procedure 
        export const createProcedure = async (data) => {
  return await axios.post(`${PROCEDURE_URL}/PostProcedure`, data, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

        // Update a procedure
        export const updateProcedure = async (id, data) => {
        return await axios.put(`${PROCEDURE_URL}/${id}`, data, {
            headers: { "Content-Type": "application/json" }, 
        });
        };

        // Delete a procedure
        export const deleteProcedure = async (id) => {
        return await axios.delete(`${PROCEDURE_URL}/${id}`);
        };
