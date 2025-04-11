import vine from '@vinejs/vine'

export const searchQueryValidator = vine.compile(
    vine.object({
        name: vine.string().trim(),
        price_min: vine.number().min(0),
        price_max: vine.number().min(0),
        location_id: vine.number(),
    })
);