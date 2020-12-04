module.exports = mongoose => {
    const boilersData = mongoose.model(
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
    return boilersData;
};