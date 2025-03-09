// 'use client'
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'next/navigation'
// import { blog_data } from '@/assets/assets'

// const page = ({ params }) => {

//     const [data, setData] = useState(null);

//     const fetchBlogData = () => {
//         for (let i = 0; i < blog_data.length; i++) {
//             if (Number(params.id) === blog_data[i].id) {
//                 setData(blog_data[i]);
//                 console.log(blog_data[i]);
//                 break;
//             }
//         }
//     }
//     useEffect(() => {
//         fetchBlogData();
//     }, [])

//     return (
//         <div>
//             {params.id}
//         </div>
//     )
// }

// export default page



// 'use client'
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'next/navigation'
// import { blog_data } from '@/assets/assets'

// const Page = () => {
//     const params = useParams();
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         if (!params?.id) return;
//         const blog = blog_data.find(blog => Number(params.id) === blog.id);
//         if (blog) {
//             setData(blog);
//         }
//     }, [params?.id]);

//     return (
//         <div>
//             <h1>Blog ID: {params.id}</h1>
//             {data ? (
//                 <div>
//                     <h2>{data.title}</h2>
//                     <p>{data.description}</p>
//                 </div>
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// }

// export default Page;


'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { assets, blog_data } from '@/assets/assets'
import Image from 'next/image'
import Footer from '@/components/Footer'
import Link from 'next/link';
import axios from "axios";



const Page = () => {
    const params = useParams();
    const [data, setData] = useState(null);

    // const fetchBlogData = () => {
    //     if (params?.id) {
    //         for (let i = 0; i < blog_data.length; i++) {
    //             if (Number(params.id) === blog_data[i].id) {
    //                 setData(blog_data[i]);
    //                 break;
    //             }
    //         }
    //     }
    // }

    const fetchBlogData = async () => {
        const response = await axios.get('/api/blog?', {
            params: {
                id: params.id
            }
        });
        setData(response.data);
    }

    useEffect(() => {
        fetchBlogData();
    }, [params?.id]);

    return (data ? <>
        <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
            <div className='flex justify-between items-center'>
                <Link href='/' >
                    <Image src={assets.logo} width={180} alt='' className='w-[130px] sm:w-auto' />
                </Link>
                <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3  sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>
                    Get Started <Image src={assets.arrow} width={25} alt='' />
                </button>
            </div>
            <div className='text-center my-24'>
                <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
                <Image src={assets.logo} width={80} height={70} alt='' className='mx-auto mt-10 border border-white rounded-full ' />
                <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
            </div>
        </div>
        <div className='mx-5 max-w-[500px] md:mx-auto mt-[-100px] mb-10'>
            <Image className='border-4 border-white' src={assets.logo} width={1280} height={720} alt='' />
            <h1 className='my-8 text-[26px] font-semibold'>Introduction:</h1>
            <p>{data.description}</p>
            <h3 className='my-5 text-[18px] font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat iure quam commodi vero error. Ullam impedit laboriosam iure repudiandae illum?</h3>
            <p className='my-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, facilis?</p>
            <p className='my-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, facilis?</p>
            <h3 className='my-5 text-[18px] font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat iure quam commodi vero error. Ullam impedit laboriosam iure repudiandae illum?</h3>
            <p className='my-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, facilis?</p>
            <p className='my-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, facilis?</p>
            <h3 className='my-5 text-[18px] font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat iure quam commodi vero error. Ullam impedit laboriosam iure repudiandae illum?</h3>
            <p className='my-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, facilis?</p>
            <p className='my-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, facilis?</p>
            <h3 className='my-5 text-[18px] font-semibold'>conclusion:</h3>
            <p className='my-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, facilis?</p>
            <div className='my-24 '>
                <p className='text-black font-semibold my-4'>Share this article on Social Media</p>
                <div className='flex'>
                    <Image src={assets.logo} width={50} alt='' />
                    <Image src={assets.logo} width={50} alt='' />
                    <Image src={assets.logo} width={50} alt='' />
                </div>
            </div>
        </div>
        <Footer />
    </> : <></>
    )
}

export default Page
