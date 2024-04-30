import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json({
      status: 201,
      success: true,
      listing,
    });
  } catch (error) {
    next(error);
  }
};
