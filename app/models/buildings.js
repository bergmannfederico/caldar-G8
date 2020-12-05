module.exports = mongoose => {
    return mongoose.model(
        "building",
        mongoose.Schema(
            {
                id: Number,
                fullName: String,
                address: String,
                phone: String,
                boilerId: []
            },
            {timestamps: true}
        )
    );
};