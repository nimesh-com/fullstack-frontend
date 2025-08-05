import { useParams } from "react-router-dom";
export default function Overview() {
    const params = useParams();
    
    return (
        <div>
<h1>hello overview product is {params.productId}</h1>
        </div>
    )

}