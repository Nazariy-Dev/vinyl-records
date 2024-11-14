import { Schema, model, models } from "mongoose"

const checkoutSessionSchema = new Schema({
  sessionId: { type: String, unique: true, required: true },
  fulfilled: { type: Boolean, default: () => Date.now() },
  fulfilledAt: { type: Date },
});

export default models && models.CheckoutSession || model('CheckoutSession', checkoutSessionSchema)
