import React from "react";

const Review = ({ review }) => {
  const { name, feedback, img, location } = review;
  return (
    <div>
      <div className="card  shadow-xl">
        <div className="card-body">
          <p className="">{feedback}</p>

          <div className="flex items-center">
            <div className="avatar mr-3 my-3">
              <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={img} alt="" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold"> {name}</h2>
              <p>{location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
