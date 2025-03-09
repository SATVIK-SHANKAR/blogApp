import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server");
import { writeFile } from 'fs/promises'
const fs = require('fs');

const LoadDB = async () => {
    await connectDB();
}

LoadDB();


//API Endpoint to get all blogs
export async function GET(request) {
    // console.log('Blog GET Hit');
    const blogId = request.nextUrl.searchParams.get("id");
    if (blogId) {
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json(blog);
    }
    else {
        const blogs = await BlogModel.find({});
        return NextResponse.json({ blogs });
    }

}

// API Endpoint to Upload Blog
export async function POST(request) {
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `public/images/${timestamp}_${image.name}`;
    // const path = `.public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);
    const imgUrl = `/images/${timestamp}_${image.name}`;
    // console.log(imgUrl);

    const blogData = {
        title: `${formData.get('title')}`,
        description: `${formData.get('description')}`,
        category: `${formData.get('category')}`,
        author: `${formData.get('author')}`,
        image: `${imgUrl}`,
        author_img: `${formData.get('author_img')}`
    };

    await BlogModel.create(blogData);
    console.log("Blog Saved");

    return NextResponse.json({ success: true, msg: "Blog Added" });
}


// API Endpoint to Delete Blog
export async function DELETE(request) {
    const id = await request.nextUrl.searchParams.get('id');
    const blog = await BlogModel.findByIdAndDelete(id);
    fs.unlink(`./public/images${blog.image}`, () => { });
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({ msg: "Blog Deleted" });
}

// import { connectDB } from "@/lib/config/db";
// const { NextResponse } = require("next/server");
// import { writeFile, mkdir } from 'fs/promises';
// import { existsSync } from 'fs';

// const LoadDB = async () => {
//     try {
//         await connectDB();
//     } catch (error) {
//         console.error("Database connection failed:", error);
//     }
// };

// LoadDB();

// export async function GET(request) {
//     return NextResponse.json({ msg: "API Working" });
// }

// export async function POST(request) {
//     try {
//         const formData = await request.formData();
//         const timestamp = Date.now();
//         const image = formData.get('image');

//         if (!image) {
//             return NextResponse.json({ error: "No image provided" }, { status: 400 });
//         }

//         const imageByteData = await image.arrayBuffer();
//         const buffer = Buffer.from(imageByteData);
//         const dir = "public/images";
//         const path = `${dir}/${timestamp}_${image.name}`;

//         // Ensure directory exists
//         if (!existsSync(dir)) {
//             await mkdir(dir, { recursive: true });
//         }

//         await writeFile(path, buffer);
//         const imgUrl = `/${timestamp}_${image.name}`;
//         console.log("Image saved at:", imgUrl);
//         return NextResponse.json({ imgUrl });

//     } catch (error) {
//         console.error("Error handling POST request:", error);
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
// }
