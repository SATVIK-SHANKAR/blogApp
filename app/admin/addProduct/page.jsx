'use client'
import { assets } from '@/assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        title: " ",
        description: " ",
        category: "StartUp",
        author: "Alex Bennet",
        author_img: "/assets/6.jpg"
    });

    const onChnageHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
        console.log(data);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('author', data.author);
        formData.append('author_img', data.author_img);
        const response = await axios.post('/api/blog', formData);
        if (response.data.success) {
            toast.success(response.data.msg);
            setImage(false);
            setData({
                title: " ",
                description: " ",
                category: "StartUp",
                author: "Alex Bennet",
                author_img: "/assets/6.jpg"
            })
        }
        else {
            toast.error("Error");
        }

    }

    return (
        <>
            <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
                <p className='text-xl'>Upload Thumbnail</p>
                <label htmlFor="image">
                    <Image src={!image ? assets.upload_area : URL.createObjectURL(image)} width={250} height={200} alt='' className='mt-4' />
                </label>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                <p className='text-xl mt-4'>Blog Title</p>
                <input name='title' onChange={onChnageHandler} value={data.title} type="text" placeholder='Type here' required className='w-full sm:w-[500px] mt-4 px-4 py-3 border' />
                <p className='text-xl mt-4'>Blog Description</p>
                <textarea name='description' onChange={onChnageHandler} value={data.description} type="text" placeholder='Write Blog Content Here !' required className='w-full sm:w-[500px] mt-4 px-4 py-3 border' rows={6} />
                <p className='text-xl mt-4'>Blog category</p>
                <select name="category" onChange={onChnageHandler} value={data.category} className='w-40 mt-4 px-4 py-3 borber text-gray-500' >
                    <option value="StartUp">StartUp</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Others">Others</option>
                </select>
                <br />
                <button className='mt-8 w-40 h-12 bg-black text-white' type='submit'>ADD</button>
            </form>
        </>
    )
}

export default page