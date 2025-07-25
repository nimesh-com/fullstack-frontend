export default function ProductCard(props) {
    return (
        <div className="max-w-sm bg-white rounded-2xl shadow-md overflow-hidden p-4 hover:shadow-lg transition-shadow duration-300">
            <img 
                src={props.image} 
                alt={props.name} 
                className="w-full h-48 object-cover rounded-md"
            />
            <div className="mt-4">
                <h2 className="text-xl font-semibold text-gray-800">{props.name}</h2>
                <p className="text-gray-600 mt-1">Price: <span className="font-medium text-green-600">${props.price}</span></p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
                    View More
                </button>
            </div>
        </div>
    );
}
