const express = require("express");

//? Validation
const {
    validateSpot,
    filterQueryValidator,
    reviewValidation,
    spotIdValidation,
    bookingValidation,
} = require("../../utils/validation");

//? Models
const { User, Spot, Review, Image, Booking } = require("../../db/models");

//? Authentication
const { requireAuth, restoreUser } = require("../../utils/auth");

const router = express.Router();
const { Op } = require("sequelize");

/**********************************************************************************/
//! Get all spots by query filters

router.get("/", filterQueryValidator, async (req, res) => {
    const { maxLat, minLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    const query = {
        where: {},
    };

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
            [Op.lt]: req.query.maxLat,
            [Op.gt]: req.query.minLat,
        };
    } else if (minLat && !maxLat) {
        query.where.lat = {
            [Op.gt]: req.query.minLat,
        };
    } else if (!minLat && maxLat) {
        query.where.lat = {
            [Op.lt]: req.query.maxLat,
        };
    }

    //* Longitude filters
    if (minLng && maxLng) {
        query.where.lng = {
            [Op.lt]: req.query.maxLng,
            [Op.gt]: req.query.minLng,
        };
    } else if (minLng && !maxLng) {
        query.where.lng = {
            [Op.gt]: req.query.minLng,
        };
    } else if (!minLng && maxLng) {
        query.where.lng = {
            [Op.lt]: req.query.maxLng,
        };
    }

    //* Price filters
    if (minPrice && maxPrice) {
        query.where.price = {
            [Op.lt]: req.query.maxPrice,
            [Op.gt]: req.query.minPrice,
        };
    } else if (minPrice && !maxPrice) {
        query.where.price = {
            [Op.gt]: req.query.minPrice,
        };
    } else if (!minPrice && maxPrice) {
        query.where.price = {
            [Op.lt]: req.query.maxPrice,
        };
    }

    //* Query for all the spots
    const Spots = await Spot.findAll(query);

    for (let spot of Spots) {
        const { id } = spot;

        let firstImg = {};
        firstImg.id = 0;
        firstImg.url = spot.previewImg;
        firstImg.preview = true;

        //* Images
        let imagesList = [firstImg];

        const imagesCurrSpot = await Image.findAll({
            where: { imageableType: "Spot", imageableId: id },
            attributes: ["id", "url", "preview"],
        });

        imagesCurrSpot.forEach(image => {
            image = image.toJSON();
            imagesList.push(image);
        });

        spot.dataValues.spotImages = imagesList;

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
        spot.dataValues.reviewsTotal = numReviews;
        spot.dataValues.avgRating = avgRating;
    }

    if (!Object.entries(req.query).length) {
        return res.json({
            Spots,
        });
    } else {
        return res.json({
            Spots,
            page: page,
            size: size,
        });
    }
});

/**********************************************************************************/
//! Get all spots for the current user

router.get("/current", restoreUser, requireAuth, async (req, res) => {
    const currSpot = await Spot.findAll({
        where: { ownerId: req.user.id },
    });

    if (!currSpot.length) {
        return res.status(404).json({
            message: "No spots can be found for the current user",
            statusCode: 404,
        });
    }

    for (let spot of currSpot) {
        const { id } = spot;

        let firstImg = {};
        firstImg.id = 0;
        firstImg.url = spot.previewImg;
        firstImg.preview = true;

        //* Images
        let imagesList = [firstImg];

        const imagesCurrSpot = await Image.findAll({
            where: { imageableType: "Spot", imageableId: id },
            attributes: ["id", "url", "preview"],
        });

        imagesCurrSpot.forEach(image => {
            image = image.toJSON();
            imagesList.push(image);
        });

        spot.dataValues.spotImages = imagesList;

        //* Reviews
        let reviewsList = [];

        const reviewsCurrSpot = await Review.findAll({
            where: { spotId: id },
            attributes: ["id", "userId", "review", "stars"],
        });

        reviewsCurrSpot.forEach(review => {
            review = review.toJSON();
            reviewsList.push(review);
        });

        spot.dataValues.spotReviews = reviewsList;

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

        spot.dataValues.avgRating = avgRating;
    }

    return res.json(currSpot);
});

/**********************************************************************************/
//! create a spot

router.post("/", requireAuth, validateSpot, async (req, res) => {
    const {
        address,
        city,
        state,
        country,
        type,
        petFriendly,
        lat,
        lng,
        name,
        amenities,
        bedroom,
        bed,
        bath,
        guests,
        price,
        previewImg,
    } = req.body;

    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address: address,
        city: city,
        state: state,
        country: country,
        type: type,
        petFriendly: petFriendly,
        lat: lat,
        lng: lng,
        name: name,
        amenities: amenities,
        bedroom: bedroom,
        bed: bed,
        bath: bath,
        guests: guests,
        price: price,
        previewImg: previewImg,
    });

    return res.status(201).json(newSpot);
});

/**********************************************************************************/
//! Get spot by a spot id

router.get("/:spotId", spotIdValidation, async (req, res) => {
    const currentSpot = await Spot.findOne({
        where: { id: req.params.spotId },
    });

    if (!currentSpot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404,
        });
    }

    let firstImg = {};
    firstImg.id = 0;
    firstImg.url = currentSpot.previewImg;
    firstImg.preview = true;

    //* Images
    let imagesList = [firstImg];

    const imagesCurrSpot = await Image.findAll({
        where: { imageableType: "Spot", imageableId: req.params.spotId },
        attributes: ["id", "url", "preview"],
    });

    imagesCurrSpot.forEach(image => {
        image = image.toJSON();
        imagesList.push(image);
    });

    currentSpot.dataValues.spotImages = imagesList;

    //* Reviews
    let reviewsList = [];

    const reviewsCurrSpot = await Review.findAll({
        where: { spotId: currentSpot.id },
        attributes: ["id", "userId", "review", "stars"],
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

    //* Owner
    const spotOwner = await User.findOne({
        where: { id: currentSpot.ownerId },
        attributes: ["id", "firstName", "lastName"],
    });

    currentSpot.dataValues.Owner = spotOwner;

    return res.json(currentSpot);
});

/**********************************************************************************/
//! Edit a spot

router.put("/:spotId", requireAuth, validateSpot, async (req, res) => {
    const {
        address,
        city,
        state,
        country,
        type,
        petFriendly,
        lat,
        lng,
        name,
        amenities,
        bedroom,
        bed,
        bath,
        guests,
        price,
        previewImg,
    } = req.body;

    const editedSpot = await Spot.findByPk(req.params.spotId);

    if (!editedSpot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404,
        });
    }

    let firstImg = {};
    firstImg.id = 0;
    firstImg.url = editedSpot.previewImg;
    firstImg.preview = true;

    //* Images
    let imagesList = [firstImg];

    const imagesCurrSpot = await Image.findAll({
        where: { imageableType: "Spot", imageableId: req.params.spotId },
        attributes: ["id", "url", "preview"],
    });

    imagesCurrSpot.forEach(image => {
        image = image.toJSON();
        reviewsList.push(image);
    });

    editedSpot.dataValues.spotImages = imagesList;

    if (req.user.id !== editedSpot.ownerId) {
        return res
            .status(403)
            .json({ message: "Unauthorized", statusCode: "403" });
    }

    await editedSpot.update({
        address: address,
        city: city,
        state: state,
        country: country,
        type: type,
        petFriendly: petFriendly,
        lat: lat,
        lng: lng,
        name: name,
        amenities: amenities,
        bedroom: bedroom,
        bed: bed,
        bath: bath,
        guests: guests,
        price: price,
        previewImg: previewImg,
    });

    return res.json(editedSpot);
});

/**********************************************************************************/
//! Delete a spot

router.delete("/:spotId", requireAuth, async (req, res) => {
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
        return res.json({ message: "Successfully deleted", statusCode: 200 });
    } else {
        return res.status(403).json({
            message: "Unauthorized",
            statusCode: 403,
        });
    }
});

/**********************************************************************************/
//! Create an Image for a spotId

router.post("/:spotId/images", requireAuth, async (req, res) => {
    const currentSpot = await Spot.findOne({
        where: { id: req.params.spotId },
    });

    if (!currentSpot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404,
        });
    }
    if (currentSpot.dataValues.ownerId !== req.user.id) {
        return res.status(403).json({
            message: "Unauthorized",
            statusCode: 403,
        });
    }

    //* new Image
    let newImage = await Image.create({
        imageableId: currentSpot.id,
        imageableType: "Spot",
        url: req.body.url,
        userId: req.user.id,
        preview: false,
    });

    newImage = newImage.toJSON();
    const { id, url, preview } = newImage;

    return res.json({ id, url, preview });
});

/**********************************************************************************/
//! Create a Review for a Spot based on the Spot's id

router.post(
    "/:spotId/reviews",
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
                    message: "User already has a review for this spot",
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
    "/:spotId/bookings",
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
                message: "Validation error",
                statusCode: 400,
                errors: {
                    endDate: "endDate cannot be on or before startDate",
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
                message:
                    "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking",
                },
            });
        }

        const newBooking = await Booking.create({
            userId: req.user.id,
            spotId: req.params.spotId,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            guestsNum: req.body.guestsNum || 2,
        });

        const { id, spotId, userId, startDate, endDate, updatedAt, createdAt } =
            newBooking;

        return res.json({
            id,
            spotId,
            userId,
            startDate,
            endDate,
            createdAt,
            updatedAt,
        });
    }
);

/**********************************************************************************/
//! Get all reviews by a spotId

router.get("/:spotId/reviews", async (req, res) => {
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
                attributes: ["id", "firstName", "lastName"],
            },
            {
                model: Image,
                required: false,
                as: "ReviewImages",
                where: { imageableType: "Review" },
                attributes: ["id", "url"],
            },
        ],
    });

    if (!reviews.length) {
        return res.status(404).json({
            message: "No reviews could be found for the current spot",
            statusCode: 404,
        });
    }

    return res.json({ Reviews: reviews });
});

/**********************************************************************************/
//! Get all Bookings for a Spot based on the Spot's id

router.get("/:spotId/bookings", requireAuth, async (req, res) => {
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
            attributes: ["spotId", "startDate", "endDate"],
        });
    } else {
        spotBookings = await Booking.findAll({
            where: { spotId: req.params.spotId },
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: [
                            "username",
                            "email",
                            "hashedPassword",
                            "createdAt",
                            "updatedAt",
                        ],
                    },
                },
            ],
        });
    }

    if (!spotBookings.length) {
        return res.status(404).json({
            message: "No bookings could be found for the current spot",
            statusCode: 404,
        });
    }

    return res.json({ Bookings: spotBookings });
});

module.exports = router;
