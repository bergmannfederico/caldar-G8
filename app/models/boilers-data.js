module.exports = mongoose => {
    const boilersData = mongoose.model(
        "boilers-datas",
        mongoose.Schema(
            {
                id: Number,
                typeId: Number,
                maintenance_rate: String,
                hour_maintenance_cost: String,
                hour_eventual_cost: String,
            }, {
                timestamps: true
            }
        )
    );
    return boilersData;
};