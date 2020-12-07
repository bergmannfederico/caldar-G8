module.exports = mongoose => {

    const Customer = mongoose.model(
        "customer",
        mongoose.Schema({
            id: Number,
            customer: String,
            customerType: String,
            email: String,
            buildings: [],
            fiscal_address: String,
            phone: String,
        }, {
            timestamps: true
        }))
    return Customer
};