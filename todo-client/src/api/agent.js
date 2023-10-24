import axios from "axios";

export const BASE_URL="http://localhost:3000/api/todo";

const axiosInstance=axios.create({
    baseURL:BASE_URL
})

export const agent={
    getAll:async(url)=>{
        let responsData=[]

        await axiosInstance.get(`${url}`)
        .then(res=>{
            responsData=res.data
        })
        .catch(err=>{
            console.log('err',err)
            throw err;
        })

        return responsData
    },
    getById:async (url,id)=>{
        let response={}
        await axiosInstance.get(`${url}/${id}`)
        .then(res=>{
            response=res.data
        })
       if(response==null){
        throw "404 Data not found"
       }

       return response
    },
    getByPost: async (url, data) => {
        let response = {};
    
        await axiosInstance.post(`${url}`, data).then((res) => {
          response = res.data;
        });
    
        return response;
      },
      getByDelete: async (url, id) => {
        let response = {};
    
        await axiosInstance.delete(`${url}/${id}`).then((res) => {
          response = res.data;
        });
    
        return response;
      },
      getByPut:async(url,id,data)=>{
        let response = {};
        await axiosInstance.put(`${url}/${id}`,data)
        .then(res=>{
          response=res.data
        })
        return response
      }
    
}