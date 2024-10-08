const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// POST /api/points/purchase
exports.payForPoints = async (req, res) => {

    try {
        // Retrieve user details from the database
        const amountInDollars = 10;;

        // Create a Stripe payment intent
        // const paymentIntent = await stripe.paymentIntents.create({
        //     amount: amount * 100,
        //     currency: 'usd',
        //     metadata: {
        //         userId: user._id.toString(),
        //     },
        // });
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `${amountInDollars} dollars`
                        },
                        unit_amount: (amountInDollars * 100), // Amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://your-website.com/success', // URL to redirect after successful payment
            cancel_url: 'https://your-website.com/cancel', // URL to redirect if the user cancels payment
        })

        // Return the client secret to complete the payment on the client side
        res.send({ sessionUrl: session.url })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', status: false });
    }
}




