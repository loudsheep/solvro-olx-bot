import vine from "@vinejs/vine";

export const createSearchQueryValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    priceMin: vine.number().min(0),
    priceMax: vine.number().min(0),
    locationId: vine.number(),
  }),
);

export const updateSearchQueryValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
    priceMin: vine.number().min(0).optional(),
    priceMax: vine.number().min(0).optional(),
    locationId: vine.number().optional(),
  }),
);
