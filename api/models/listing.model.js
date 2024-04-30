import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "You must provide a listing name"],
    },
    description: {
      type: String,
      required: [true, "You must provide a listing description"],
    },
    address: {
      type: String,
      required: [true, "You must provide a listing address"],
    },
    regularPrice: {
      type: Number,
      required: [true, "You must provide a listing regular price"],
    },
    discountPrice: {
      type: Number,
      required: [true, "You must provide a listing discount price"],
    },
    bathrooms: {
      type: Number,
      required: [true, "You must provide a listing number of bathrooms"],
    },
    bedrooms: {
      type: Number,
      required: [true, "You must provide a listing number of bedrooms"],
    },
    furnished: {
      type: Boolean,
      required: [true, "Is the house furnished?"],
    },
    parking: {
      type: Boolean,
      required: [true, "Does the house have parking?"],
    },
    type: {
      type: String,
      required: [true, "You must select a type"],
    },
    offer: {
      type: Boolean,
      required: [true, "Offer is required"],
    },
    imageUrls: {
      type: Array,
      required: [true, "You must provide listing images"],
    },
    userRef: {
      type: String,
      required: [true, "Listing must be created by a user"],
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
