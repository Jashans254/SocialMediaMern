import { createContext, useContext, useEffect, useState } from "react";
import toast, {Toaster} from 'react-hot-toast'
import axios from "axios";
const UserContext = createContext();

export const UserContextProvider = ({children}) =>{

    const [user , setUser] = useState([])
    const [isAuth , setIsAuth] = useState(false)
    const [loading ,setLoading] = useState(true)
    async function loginUser ( email , password , navigate  , fetchPosts){
        setLoading(true)
        try {
            const {data} = await axios.post('/api/auth/login', {email , password})

            toast.success(data.message)
            navigate('/')
            setIsAuth(true)
            setUser(data.user)
            setLoading(false)
            fetchPosts();
        } catch (error) {
            toast.error(error.response.data.message)
            setLoading(false)
        }
    }
    async function registerUser ( formdata, navigate , fetchPosts){
        setLoading(true)
        try {
            const {data} = await axios.post('/api/auth/register', formdata)

            toast.success(data.message)
            navigate('/')
            setIsAuth(true)
            setUser(data.user)
            setLoading(false)
            fetchPosts();
        } catch (error) {
            toast.error(error.response.data.message)
            setLoading(false)
        }
    }
    async function fetchUser (){
        try {
            const {data} = await axios.get('/api/user/me')

            setUser(data)
            setIsAuth(true)
            setLoading(false)
        } catch (error) {
            setIsAuth(false)
            setLoading(false)
        }
    }

    async function logoutUser (navigate) {
        try {
            const {data} = await axios.get('/api/auth/logout')

            if(data.message){
                toast.success(data.message)
                setUser([])
                setIsAuth(false)
                navigate("/login")
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    async function followUser(id , fetchUser){
        try {
            const {data} = await axios.post("/api/user/follow/"+id)
            toast.success(data.message)
            fetchUser()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    async function updateProfilePic (id , formdata , setFile) {
        try {
            const {data} = await axios.put("/api/user/"+id , formdata)

            toast.success(data.message)
            fetchUser()
            setFile(null)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    async function updateProfileName (id , name ,  setShowInput) {
        try {
            const {data} = await axios.put("/api/user/"+id , {name})

            toast.success(data.message)
            fetchUser()
            setName(null)
            setShowInput(false)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    useEffect(()=>{
        fetchUser()
    } , [])
    return (
        <UserContext.Provider value = {{loginUser , isAuth , setIsAuth , user , setUser, loading , logoutUser, registerUser ,  followUser , updateProfilePic ,  updateProfileName}}>
            {children}
            <Toaster/>
        </UserContext.Provider>
    )
}

export const UserData = () => useContext(UserContext);