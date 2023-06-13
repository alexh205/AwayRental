const express = require('express');

//? Validation
const {
  validateSpot,
  filterQueryValidator,
  reviewValidation,
  spotIdValidation,
  bookingValidation,
} = require('../../utils/validation');

//? Models
const { User, Spot, Review, Image, Booking } = require('../../db/models');

//? Authentication
const { requireAuth, restoreUser } = require('../../utils/auth');

const router = express.Router();
const { Op } = require('sequelize');

/**********************************************************************************/
//! Get all spots by query filters
router.get('/', filterQueryValidator, async (req, res) => {
  const {
    maxLat,
    minLat,
    minLng,
    maxLng,
    minPrice,
    maxPrice,
    type,
    minBedrooms,
    maxBedrooms,
    minBathrooms,
    maxBathrooms,
    numGuests,
    startDate,
    endDate,
    city,
    state,
    country,
  } = req.query;

  const query = {
    where: {},
  };

  //* Type, City, State, Country filters
  if (type) query.where.type = type;
  if (city) {
    query.where.city = {
      [Op.like]: `%${city}%`,
    };
  }
  if (state) query.where.state = state;
  if (country) query.where.country = country;

  //* maxGuests Filter
  if (numGuests) {
    query.where.maxGuests = {
      [Op.lte]: numGuests,
      [Op.gte]: 1,
    };
  }

  //* Bedroom Filters
  if (minBedrooms && maxBedrooms) {
    query.where.bedroom = {
      [Op.lt]: maxBedrooms,
      [Op.gt]: minBedrooms,
    };
  } else if (minBedrooms && !maxBedrooms) {
    query.where.bedroom = {
      [Op.gt]: minBedrooms,
    };
  } else if (!minBedrooms && maxBedrooms) {
    query.where.bedroom = {
      [Op.lt]: maxBedrooms,
    };
  }
  //* Bathroom Filters
  if (minBathrooms && maxBathrooms) {
    query.where.bathroom = {
      [Op.lt]: maxBathrooms,
      [Op.gt]: minBathrooms,
    };
  } else if (minBathrooms && !maxBathrooms) {
    query.where.bathroom = {
      [Op.gt]: minBathrooms,
    };
  } else if (!minBathrooms && maxBathrooms) {
    query.where.bathroom = {
      [Op.lt]: maxBathrooms,
    };
  }

  //* Page filters
  let page = req.query.page;
  !page ? (page = 0) : (page = parseInt(req.query.page));

  //* Size filters
  let size = req.query.size;
  !size ? (size = 20) : (size = parseInt(req.query.size));

  //* Limit & Offset parameters
  if (page > 0 && size > 0) {
    query.limit = size;
    query.offset = size * (page - 1);
  }

  //* Latitude filters
  if (minLat && maxLat) {
    query.where.lat = {
      [Op.lt]: maxLat,
      [Op.gt]: minLat,
    };
  } else if (minLat && !maxLat) {
    query.where.lat = {
      [Op.gt]: minLat,
    };
  } else if (!minLat && maxLat) {
    query.where.lat = {
      [Op.lt]: maxLat,
    };
  }

  //* Longitude filters
  if (minLng && maxLng) {
    query.where.lng = {
      [Op.lt]: maxLng,
      [Op.gt]: minLng,
    };
  } else if (minLng && !maxLng) {
    query.where.lng = {
      [Op.gt]: minLng,
    };
  } else if (!minLng && maxLng) {
    query.where.lng = {
      [Op.lt]: maxLng,
    };
  }

  //* Price filters
  if (minPrice && maxPrice) {
    query.where.price = {
      [Op.lt]: maxPrice,
      [Op.gt]: minPrice,
    };
  } else if (minPrice && !maxPrice) {
    query.where.price = {
      [Op.gt]: minPrice,
    };
  } else if (!minPrice && maxPrice) {
    query.where.price = {
      [Op.lt]: maxPrice,
    };
  }

  //* Query for all the spots
  const Spots = await Spot.findAll(query);

  for (let spot of Spots) {
    const { id } = spot;

    //* Images
    let imagesList = [];

    const imagesCurrSpot = await Image.findAll({
      where: { imageableType: 'Spot', imageableId: id },
      attributes: ['id', 'url', 'preview'],
    });

    imagesCurrSpot.forEach(image => {
      image = image.toJSON();
      imagesList.push(image);
    });



    spot.dataValues.spotImages = imagesList.sort((objA, objB) => {
      if (objA.preview && !objB.preview) {
        return -1; // objA is preview:true, should be placed first
      } else if (!objA.preview && objB.preview) {
        return 1; // objB is preview:true, should be placed first
      } else {
        return 0; // both have same preview value, keep their order
      }
    });

    //* Ratings
    const starRating = await Review.findAll({
      where: {
        spotId: id,
      },
    });

    const numReviews = starRating.length;
    let ratingTotal = 0;

    starRating.forEach(review => {
      if (review.stars) ratingTotal += review.stars;
    });

    spot.dataValues.spotReviews = starRating;

    let avgRating;

    ratingTotal > 0
      ? (avgRating = Math.round((ratingTotal / numReviews) * 100) / 100)
      : (avgRating = 0);
    spot.dataValues.reviewsTotal = numReviews;
    spot.dataValues.avgRating = avgRating;

    //* Booking
    const bookings = await Booking.findAll({
      where: {
        spotId: id,
      },
    });

    let bookingSpot = {};
    bookings.forEach((booking, index) => {
      bookingSpot[index] = booking;
    });

    spot.dataValues.spotBookings = bookingSpot;
    spot.dataValues.amenities = JSON.parse(spot.dataValues.amenities);
  }

  const response = {
    Spots,
  };
  // Send response to client
  if (!Object.entries(req.query).length) {
    res.json(response);
  } else {
    response.page = page;
    response.size = size;
    res.json(response);
  }
});

/**********************************************************************************/
//! Get all spots for the current user

router.get('/current', restoreUser, requireAuth, async (req, res) => {
  const currSpot = await Spot.findAll({
    where: { ownerId: req.user.id },
  });

  if (!currSpot.length) {
    return res.status(404).json({
      message: 'No spots can be found for the current user',
      statusCode: 404,
    });
  }

  for (let spot of currSpot) {
    const { id } = spot;

    //* Images
    let imagesList = [];

    const imagesCurrSpot = await Image.findAll({
      where: { imageableType: 'Spot', imageableId: id },
      attributes: ['id', 'url', 'preview'],
    });

    imagesCurrSpot.forEach(image => {
      image = image.toJSON();
      imagesList.push(image);
    });

    spot.dataValues.spotImages = imagesList.sort((objA, objB) => {
      if (objA.preview && !objB.preview) {
        return -1; // objA is preview:true, should be placed first
      } else if (!objA.preview && objB.preview) {
        return 1; // objB is preview:true, should be placed first
      } else {
        return 0; // both have same preview value, keep their order
      }
    });

    //* Ratings
    const starRating = await Review.findAll({
      where: {
        spotId: id,
      },
    });

    const numReviews = starRating.length;
    let ratingTotal = 0;

    starRating.forEach(review => {
      if (review.stars) ratingTotal += review.stars;
    });

    let avgRating;

    ratingTotal > 0
      ? (avgRating = Math.round((ratingTotal / numReviews) * 100) / 100)
      : (avgRating = 0);

    //* Booking
    const bookings = await Booking.findAll({
      where: {
        spotId: id,
      },
    });

    let bookingSpot = {};
    bookings.forEach((booking, index) => {
      bookingSpot[index] = booking;
    });

    spot.dataValues.spotBookings = bookingSpot;

    spot.dataValues.avgRating = avgRating;

    spot.dataValues.amenities = JSON.parse(spot.dataValues.amenities);
  }

  return res.json(currSpot);
});

/**************************************************************************************/
//! userProfile Detail

router.get(
  '/currentUser/current',
  restoreUser,
  requireAuth,
  async (req, res) => {
    const currSpot = await Spot.findAll({
      where: { ownerId: req.user.id },
    });

    const currReviews = await Review.findAll({
      where: { userId: req.user.id },
    });

    const currBookings = await Booking.findAll({
      where: { userId: req.user.id },
    });

    if (!currSpot.length) {
      return res.status(404).json({
        message: 'No spots can be found for the current user',
        statusCode: 404,
      });
    }

    return res.json({
      spots: currSpot,
      reviews: currReviews,
      bookings: currBookings,
    });
  }
);

/**********************************************************************************/
//! create a spot

router.post('/', requireAuth, validateSpot, async (req, res) => {
  const {
    address,
    city,
    state,
    country,
    description,
    type,
    lat,
    lng,
    title,
    amenities,
    bedroom,
    bed,
    bathroom,
    maxGuests,
    checkIn,
    checkOut,
    price,
  } = req.body;

  const newSpot = await Spot.create({
    ownerId: req.user.id,
    address: address,
    city: city,
    state: state,
    country: country,
    description: description,
    type: type,
    // lat: lat,
    // lng: lng,
    title: title,
    amenities: JSON.stringify(amenities),
    bedroom: bedroom,
    bed: bed,
    bathroom: bathroom,
    maxGuests: maxGuests,
    checkIn: checkIn,
    checkOut: checkOut,
    price: price,
  });

  return res.status(201).json({
    id: newSpot.id,
    ownerId: newSpot.ownerId,
    address: newSpot.address,
    city: newSpot.city,
    state: newSpot.state,
    country: newSpot.country,
    description: newSpot.description,
    type: newSpot.type,
    // lat: newSpot.lat,
    // lng: newSpot.lng,
    title: newSpot.title,
    amenities: JSON.parse(newSpot.amenities),
    bedroom: Number(newSpot.bedroom),
    bed: Number(newSpot.bed),
    bathroom: Number(newSpot.bathroom),
    maxGuests: Number(newSpot.maxGuests),
    checkIn: newSpot.checkIn,
    checkOut: newSpot.checkOut,
    price: Number(newSpot.price),
  });
});

/**********************************************************************************/
//! Get spot by a spot id

router.get('/:spotId', spotIdValidation, async (req, res) => {
  const currentSpot = await Spot.findOne({
    where: { id: req.params.spotId },
  });

  if (!currentSpot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  //* Images
  let imagesList = [];

  const imagesCurrSpot = await Image.findAll({
    where: { imageableType: 'Spot', imageableId: req.params.spotId },
    attributes: ['id', 'url', 'preview'],
  });

  imagesCurrSpot.forEach(image => {
    image = image.toJSON();
    imagesList.push(image);
  });

  currentSpot.dataValues.spotImages = imagesList.sort((objA, objB) => {
    if (objA.preview && !objB.preview) {
      return -1; // objA is preview:true, should be placed first
    } else if (!objA.preview && objB.preview) {
      return 1; // objB is preview:true, should be placed first
    } else {
      return 0; // both have same preview value, keep their order
    }
  });

  //* Booking
  const bookings = await Booking.findAll({
    where: {
      spotId: req.params.spotId,
    },
  });

  let bookingSpot = {};
  bookings.forEach((booking, index) => {
    bookingSpot[index] = booking;
  });

  currentSpot.dataValues.spotBookings = bookingSpot;

  //* Reviews
  let reviewsList = [];

  const reviewsCurrSpot = await Review.findAll({
    where: { spotId: currentSpot.id },
    attributes: ['id', 'userId', 'review', 'stars'],
  });

  reviewsCurrSpot.forEach(review => {
    review = review.toJSON();
    reviewsList.push(review);
  });

  currentSpot.dataValues.spotReviews = reviewsList;

  //* Ratings
  const currentReview = await Review.findAll({
    where: {
      spotId: req.params.spotId,
    },
  });

  const numReviews = currentReview.length;
  let ratingTotal = 0;

  currentReview.forEach(review => {
    if (review.stars) ratingTotal += review.stars;
  });

  let avgRating;

  ratingTotal > 0
    ? (avgRating = Math.round((ratingTotal / numReviews) * 100) / 100)
    : (avgRating = 0);

  currentSpot.dataValues.numReviews = numReviews;
  currentSpot.dataValues.avgRating = avgRating;

  currentSpot.dataValues.amenities = JSON.parse(
    currentSpot.dataValues.amenities
  );

  //* Owner
  const spotOwner = await User.findOne({
    where: { id: currentSpot.ownerId },
    attributes: ['id', 'name'],
  });

  currentSpot.dataValues.Owner = spotOwner;

  return res.json(currentSpot);
});

/**********************************************************************************/
//! Edit a spot

router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
  const {
    address,
    city,
    state,
    country,
    description,
    type,
    // lat,
    // lng,
    title,
    amenities,
    bedroom,
    bed,
    bathroom,
    maxGuests,
    checkIn,
    checkOut,
    price,
  } = req.body;

  const editedSpot = await Spot.findByPk(req.params.spotId);

  if (!editedSpot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  //* Images
  let imagesList = [];

  const imagesCurrSpot = await Image.findAll({
    where: { imageableType: 'Spot', imageableId: req.params.spotId },
    attributes: ['id', 'url', 'preview'],
  });

  imagesCurrSpot.forEach(image => {
    image = image.toJSON();
    imagesList.push(image);
  });

  editedSpot.dataValues.spotImages = imagesList.sort((objA, objB) => {
    if (objA.preview && !objB.preview) {
      return -1; // objA is preview:true, should be placed first
    } else if (!objA.preview && objB.preview) {
      return 1; // objB is preview:true, should be placed first
    } else {
      return 0; // both have same preview value, keep their order
    }
  });

  if (req.user.id !== editedSpot.ownerId) {
    return res.status(403).json({ message: 'Unauthorized', statusCode: '403' });
  }

  await editedSpot.update({
    address: address,
    city: city,
    state: state,
    country: country,
    description: description,
    type: type,
    // lat: lat,
    // lng: lng,
    title: title,
    amenities: JSON.stringify(amenities),
    bedroom: bedroom,
    bed: bed,
    bathroom: bathroom,
    maxGuests: maxGuests,
    checkIn: checkIn,
    checkOut: checkOut,
    price: price,
  });

  return res.json(editedSpot);
});

/**********************************************************************************/
//! Delete a spot

router.delete('/:spotId', requireAuth, async (req, res) => {
  const currentSpot = await Spot.findByPk(req.params.spotId);

  if (!currentSpot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  //* Owner's Authentication
  const spotOwner = currentSpot.ownerId;

  if (spotOwner === req.user.id) {
    await currentSpot.destroy();
    return res.json({ message: 'Successfully deleted', statusCode: 200 });
  } else {
    return res.status(403).json({
      message: 'Unauthorized',
      statusCode: 403,
    });
  }
});

/**********************************************************************************/
//! Create an Image/delete for a spotId

router.post('/:spotId/images', requireAuth, async (req, res) => {
  try {
    const currentSpot = await Spot.findOne({
      where: { id: req.params.spotId },
    });

    if (!currentSpot) {
      throw new Error("Spot couldn't be found");
    }

    if (currentSpot.ownerId !== req.user.id) {
      throw new Error(
        'Unauthorized - only owner can manage images for this spot'
      );
    }

    const spotImages = await Image.findAll({
      where: { imageableType: 'Spot', imageableId: currentSpot.id },
      attributes: ['url', 'id', 'preview'],
    });

    const filteredNewImages = req.body.filter(
      url => !spotImages.some(image => image.url === url)
    );
    // filter out images that already exist in both req.body and spotImages

    const removedImages = spotImages.filter(
      image => !req.body.includes(image.url)
    );
    // filter out images that are no longer in req.body

    // Delete images
    for (const image of removedImages) {
      await Image.destroy({ where: { id: image.id } });
    }

    // Create new images
    for (const url of filteredNewImages) {
      await Image.create({
        imageableId: currentSpot.id,
        imageableType: 'Spot',
        url: url,
        userId: req.user.id,
        preview: false,
      });
    }

    const updatedImages = await Image.findAll({
      where: { imageableType: 'Spot', imageableId: currentSpot.id },
      attributes: ['url', 'preview', 'id'],
    })

    const imagesData = updatedImages.map(image => image.dataValues);


    for (const image of imagesData) {

      if (image.url === req.body[0]) {
        await Image.update(
          { preview: true },
          { where: { id: image.id } }
        )
      } else {
        await Image.update({ preview: false },
          { where: { id: image.id } })
      }
    }



    return res.json({ message: 'Images updated successfully', statusCode: 200 });
  } catch (error) {
    return res.status(400).json({ message: error.message, statusCode: 400 });
  }
});

/**********************************************************************************/
//! Create a Review for a Spot based on the Spot's id

router.post(
  '/:spotId/reviews',
  requireAuth,
  reviewValidation,
  async (req, res) => {
    const spot = await Spot.findOne({
      where: { id: req.params.spotId },
    });

    if (spot.ownerId === req.user.id) {
      return res.status(403).json({
        message: "Unauthorized - you can't review your own property",
        statusCode: 403,
      });
    }

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404,
      });
    }

    const spotReviews = await Review.findAll({
      where: { spotId: req.params.spotId },
    });

    for (let spotReview of spotReviews) {
      if (spotReview.userId === req.user.id) {
        return res.status(403).json({
          message: 'User already has a review for this spot',
          statusCode: 403,
        });
      }
    }

    const { review, stars } = req.body;
    const newReview = await Review.create({
      userId: req.user.id,
      spotId: spot.id,
      review: review,
      stars: stars,
    });

    return res.status(201).json(newReview);
  }
);

/**********************************************************************************/
//! Create a Booking from a spotId

router.post(
  '/:spotId/bookings',
  requireAuth,
  bookingValidation,
  async (req, res) => {
    const bookingSpot = await Spot.findByPk(req.params.spotId);

    if (!bookingSpot) {
      return res
        .status(404)
        .json({ message: "Spot couldn't be found", statusCode: 404 });
    }

    if (bookingSpot.ownerId === req.user.id) {
      return res.status(403).json({
        message: "Unauthorized - you can't book your own property",
        statusCode: 403,
      });
    }

    const firstDate = Date.parse(req.body.startDate);
    const lastDate = Date.parse(req.body.endDate);

    if (firstDate > lastDate) {
      return res.status(400).json({
        message: 'Validation error',
        statusCode: 400,
        errors: {
          endDate: 'endDate cannot be on or before startDate',
        },
      });
    }

    const bookingCheck = await Booking.findAll({
      where: [
        { spotId: req.params.spotId },
        { startDate: { [Op.lt]: req.body.endDate } },
        { endDate: { [Op.gt]: req.body.startDate } },
      ],
    });

    if (bookingCheck.length > 0) {
      return res.status(403).json({
        message: 'Sorry, this spot is already booked for the specified dates',
        statusCode: 403,
        errors: {
          startDate: 'Start date conflicts with an existing booking',
          endDate: 'End date conflicts with an existing booking',
        },
      });
    }

    const newBooking = await Booking.create({
      userId: req.user.id,
      spotId: req.params.spotId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      guestsNum: req.body.guestsNum || 1,
      price: req.body.price,
      name: req.body.name,
      phone: req.body.phone,
    });

    const {
      id,
      spotId,
      userId,
      startDate,
      endDate,
      guestsNum,
      name,
      phone,
      price,
      updatedAt,
      createdAt,
    } = newBooking;

    return res.json({
      id,
      spotId,
      userId,
      startDate,
      endDate,
      guestsNum,
      price,
      name,
      phone,
      createdAt,
      updatedAt,
    });
  }
);

/**********************************************************************************/
//! Get all reviews by a spotId

router.get('/:spotId/reviews', async (req, res) => {
  const currentSpot = await Spot.findByPk(req.params.spotId, {
    include: [{ model: Review }],
  });

  if (!currentSpot) {
    return res
      .status(404)
      .json({ message: "Spot couldn't be found", statusCode: 404 });
  }

  //* Reviews
  const reviews = await Review.findAll({
    where: { spotId: currentSpot.id },
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'profileImg'],
      },
      {
        model: Image,
        required: false,
        as: 'ReviewImages',
        where: { imageableType: 'Review' },
        attributes: ['id', 'url'],
      },
    ],
  });

  if (!reviews.length) {
    return res.status(404).json({
      message: 'No reviews could be found for the current spot',
      statusCode: 404,
    });
  }

  return res.json({ Reviews: reviews });
});

/**********************************************************************************/
//! Get all Bookings for a Spot based on the Spot's id

router.get('/:spotId/bookings', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    return res
      .status(404)
      .json({ message: "Spot couldn't be found", statusCode: 404 });
  }

  let spotBookings;

  if (spot.ownerId !== req.user.id) {
    spotBookings = await Booking.findAll({
      where: { spotId: req.params.spotId },
      attributes: ['spotId', 'startDate', 'endDate'],
    });
  } else {
    spotBookings = await Booking.findAll({
      where: { spotId: req.params.spotId },
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              'username',
              'email',
              'hashedPassword',
              'createdAt',
              'updatedAt',
            ],
          },
        },
      ],
    });
  }

  if (!spotBookings.length) {
    return res.status(404).json({
      message: 'No bookings could be found for the current spot',
      statusCode: 404,
    });
  }

  return res.json({ Bookings: spotBookings });
});

module.exports = router;
