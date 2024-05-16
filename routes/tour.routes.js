
import express from 'express'
import { filterTours, getMonthlyPlan, getToursStats, getAllToursController, aliasTopTours, getTourByIdController, createTour, updateTourController, checkBody, deleteTour } from '../controllers/tour.controller.js'
const tourRouter = express.Router()
//A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.

tourRouter.route('/top-5-cheap')
    .get(aliasTopTours, getAllToursController)

tourRouter
    .route('/')
    .get(getAllToursController)
    .post(createTour)

tourRouter.route('/tour-stats').get(getToursStats)
tourRouter.route('/monthly-plan/:year').get(getMonthlyPlan)
tourRouter.route('/filter').get(filterTours)
tourRouter
    .route('/:id')
    .get(getTourByIdController)
    .put(updateTourController)
    .delete(deleteTour)

export { tourRouter }