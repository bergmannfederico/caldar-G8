module.exports = mongoose => {

    const Customer = mongoose.model(
        "customer",
        mongoose.Schema({
            id: Number,
            customerType: String,
            email: String,
            buildings: [],
            fiscalAddress: String,
        }, {
            timestamps: true
        }))
    return Customer
};