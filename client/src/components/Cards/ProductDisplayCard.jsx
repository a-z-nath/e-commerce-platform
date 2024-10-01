import { IoBagAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

/*
category
: 
{_id: '66d19aefc02bd7d8c803c063', name: 't-shirt', type: 'men', createdAt: '2024-08-30T10:11:59.457Z', updatedAt: '2024-08-30T10:11:59.457Z', …}
createdAt
: 
"2024-09-11T07:01:11.558Z"
description
: 
"A classic blue denim shirt with a modern fit, perfect for casual and semi-formal occasions."
image
: 
"https://res.cloudinary.com/aznath/image/upload/v1726038071/ration/user-profile/smlxm2mtlrn8x9zejgip.avif"
name
: 
"Casual T-shirt"
price
: 
20.99
size
: 
(2) ['L', 'XL']
stock
: 
25
*/

const ProductDisplayCard = ({ product }) => {
  return (
    <div className="w-72 my-6 bg-white dark:bg-gray-700 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <Link to="#">
        <img
          src={product.image}
          alt="Product"
          className="h-80 w-72 object-cover rounded-t-xl"
        />
        <div className="px-4 py-3 w-72">
          <p className="text-lg font-bold text-black dark:text-white truncate block capitalize">
            {product.name}
          </p>
          <div className="flex items-center">
            <div className="flex items-center gap-x-10 justify-between">
              <p className="text-lg font-semibold text-black dark:text-white">
                ${product.price}
              </p>
            </div>
            <div className="ml-auto" aria-label="Add to Cart">
              <IoBagAddOutline
                className="text-black dark:text-white"
                size={20}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductDisplayCard;
