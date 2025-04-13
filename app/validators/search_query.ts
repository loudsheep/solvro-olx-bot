import vine from "@vinejs/vine";

export const searchQueryValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    priceMin: vine.number().min(0),
    priceMax: vine.number().min(0),
    locationId: vine.number(),
  }),
);
