module.exports = mongoose => {

    const Customer = mongoose.model(
        "customer",
        mongoose.Schema({
            id: Number,
            customerType: String,
            email: String,
            buildings: [],
            fiscal_address: String,
        }, {
            timestamps: true
        }))
    return Customer
};