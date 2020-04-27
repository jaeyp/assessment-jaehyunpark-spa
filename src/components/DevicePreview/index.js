import React, { useState } from 'react';

export default ({ link, styles = { width: "100%", height: "60vh" } }) => {
    const [width, setWidth] = useState("w-full")
    const handle = {
        mobile: _ => setWidth("w-1/3"),
        tablet: _ => setWidth("w-3/5"),
        desktop: _ => setWidth("w-full")
    }

    return (
        <div className="rounded-lg overflow-hidden mx-4 shadow-lg">
            <div className="window-nav flex justify-between bg-blue-400">
                <div className="flex items-center">
                    <span className="text-md font-bold my-3 ml-5 mr-3">Preview:</span>
                    <button className="hidden md:block flex items-center hover:bg-blue-500 text-sm font-extrabold p-1 mr-2 rounded" onClick={handle.mobile}><svg className="h-6 w-6 fill-current text-blue-100 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M358.856 32H153.143C130.512 32 112 50.326 112 72.728v366.545C112 461.674 130.512 480 153.143 480h205.713C381.488 480 400 461.674 400 439.272V72.728C400 50.326 381.488 32 358.856 32zM364 400H148V112h216v288z" /></svg></button>
                    <button className="hidden md:block flex items-center hover:bg-blue-500 text-sm font-extrabold p-1 mr-2 rounded" onClick={handle.tablet}><svg className="h-6 w-6 fill-current text-blue-100 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M392 32H120c-13.3 0-24 10.7-24 24v400c0 13.3 10.7 24 24 24h272c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24zm-8 384H128V80h256v336zm-128 46c-7.7 0-14-6.5-14-14.1 0-7.5 6.2-14 14-14 7.7 0 14.1 6.4 14.1 14-.1 7.6-6.4 14.1-14.1 14.1z" /></svg></button>
                    <button className="hidden md:block flex items-center hover:bg-blue-500 text-sm font-extrabold p-1 mr-2 rounded" onClick={handle.desktop}><svg className="h-6 w-6 fill-current text-blue-100 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M437.333 32H74.667C51.198 32 32 51.197 32 74.666v282.667C32 380.802 51.198 400 74.667 400h138.666l-42.666 48v32h170.666v-32l-42.666-48h138.666C460.802 400 480 380.802 480 357.333V74.666C480 51.197 460.802 32 437.333 32zm0 288H74.667V74.666h362.666V320z" /></svg></button>
                    <a href={link} className="flex items-center hover:bg-blue-500 text-sm font-extrabold p-1 mr-2 rounded" target="_blank" rel="noopener"><svg className="h-6 w-6 fill-current text-blue-100 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M405.34 405.332H106.66V106.668H240V64H106.66C83.191 64 64 83.197 64 106.668v298.664C64 428.803 83.191 448 106.66 448h298.68c23.469 0 42.66-19.197 42.66-42.668V272h-42.66v133.332zM288 64v42.668h87.474L159.999 322.133l29.866 29.866 215.476-215.47V224H448V64H288z"></path></svg></a>
                </div>
            </div>
            <div className="flex content-center justify-center" style={styles}>
                <iframe src="https://assessment-jaehyunpark-spa.now.sh/networth" className={width} title="preview"></iframe>
            </div>
        </div>
    )
}