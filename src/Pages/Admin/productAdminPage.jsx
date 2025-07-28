import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function ProductAdminPage() {
    return (
       <div className="w-full h-full border-[3px]">
<Link to="/admin/addProduct" className=" cursor-pointer fixed right-[60px] bottom-[60px] text-white bg-black p-[20px] rounded-[10px]"><BiPlus className="text-3xl"/></Link>
       </div>
    )
}