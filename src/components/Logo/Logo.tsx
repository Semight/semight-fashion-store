import React from "react";
import Image from "next/image";
import logo from "@/assets/my-logo2.jpg"

const Logo = () => {
    return ( 
            <div className="">
                <Image src={logo} alt={"logo"} className="object-conver w-[70px] h-[70px] rounded-full" />
            </div>
     );
}
 
export default Logo;