import { getAllTours, getTourById, updateTour } from '../services/tour.service.js';
import { APIfeatures } from '../utils/apiFeatures.js'
import { Tour } from '../models/tour.model.js'

const checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {

        return res.status(404).json({
            status: "final",
            message: "Missing name or price"
        })
    }
    next();
}

const aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
};

const createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body)

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err

        })
    }
}


const getAllToursController = async (req, res) => {

    try {
        //execute the query
        const features = new APIfeatures(Tour.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        //console.log(features.query)
        const tours = await features.query

        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: { tours }
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }


}

const getTourByIdController = async (req, res) => {

    try {
        const tour = await Tour.findById(req.params.id)
        //Tour.findOne({_id:req.params.id})
        res.status(200).json({
            status: "success",
            data: { tour }
        });
    }
    catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }

}

const updateTourController = async (req, res) => {

    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: "success",
            data: { tour }

        });
    }
    catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }

}

const deleteTour = async (req, res) => {

    try {
        const tour = await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: "success",


        });
    }
    catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }

}
const getToursStats = async (req, res) => {
    try {
        const stats = await Tour.aggregate([
            {
                $match: { ratingsAverage: { $gte: 4.5 } }
            },
            {
                $group: {
                    //_id: null,
                    _id: { $toUpper: '$difficulty' },
                    num: { $sum: 1 },
                    numRatings: { $sum: '$ratingsQuantity' },
                    avgRating: { $avg: '$ratingsAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' },
                }
            },
            {
                $sort: {
                    avgPrice: 1 //ascending
                }
            }
        ])
        res.status(200).json({
            status: "success",
            data:
                stats
        });
    }
    catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }

}

const getMonthlyPlan = async (req, res) => {
    try {
        const year = req.params.year * 1;
        const plan = await Tour.aggregate([
            {
                $unwind: '$startDates',
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$startDates' },
                    numToursStarts: { $sum: 1 },
                    tours: { $push: '$name' }
                }
            },
            {
                $addFields: { month: '$_id' }
            },
            {
                $project: {
                    _id: 0
                }
            },
            {
                $sort: { numToursStarts: -1 }
            }
        ])

        res.status(200).json({
            status: "success",
            data: { plan }

        });
    }
    catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
}


export { getMonthlyPlan, getToursStats, getAllToursController, getTourByIdController, aliasTopTours, createTour, updateTourController, checkBody, deleteTour };
