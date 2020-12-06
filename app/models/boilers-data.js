module.exports = mongoose => {
    const boilerData = mongoose.model(
        "boilers-data",
        mongoose.Schema(
            {
                id: Number,
                typeId: Number,
                maintenance_rate: String,
                hour_maintenance_cost: String,
                hour_eventual_cost: String,
            },
        )
    );
    return boilerData;
};