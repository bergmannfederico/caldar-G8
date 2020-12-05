module.exports = mongoose => {
    const boilerData = mongoose.model(
        "boilers-data",
        mongoose.Schema(
            {
                id: Number,
                typeId: Number,
                maintenance_rate: String,
                hour_maintenance_cost: Number,
                hour_eventual_cost: Number,
            },
        )
    );
    return boilerData;
};