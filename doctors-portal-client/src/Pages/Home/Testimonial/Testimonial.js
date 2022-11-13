import React from "react";
import quote from "../../../assets/icons/quote.svg";
import people1 from "../../../assets/images/people1.png";
import people2 from "../../../assets/images/people2.png";
import people3 from "../../../assets/images/people3.png";
import Review from "./Review/Review";

const Testimonial = () => {
  const reviews = [
    {
      _id: 1,
      name: "Winson Herry",
      feedback:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      location: "California",
      img: people1,
    },
    {
      _id: 2,
      name: "Winson Herry",
      feedback:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      location: "California",
      img: people2,
    },
    {
      _id: 1,
      name: "Winson Herry",
      feedback:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      location: "California",
      img: people3,
    },
  ];
  return (
    <section className="mt-24">
      <div className="flex justify-between">
        <div>
          <p className="text-xl font-bold text-primary">Testimonial</p>
          <h2 className="text-4xl font-semibold">
            What Our Patients Says
          </h2>
        </div>
        <figure>
          <img src={quote} alt="" className="lg:w-48 w-24" />
        </figure>
      </div>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
        {reviews.map((review) => (
          <Review key={review._id} review={review}></Review>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
