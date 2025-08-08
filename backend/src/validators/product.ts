import { Joi, celebrate } from 'celebrate'

export const validateCreateProduct = celebrate({
    body: Joi.object().keys({
        title: Joi.string().min(2).max(30).required(),
        description: Joi.string().max(500),
        category: Joi.string().required(),
        price: Joi.number().min(0),
        image: Joi.object({
            fileName: Joi.string().required(),
            originalName: Joi.string(),
        }).required(),
    }),
})
